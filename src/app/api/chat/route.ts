import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type IncomingMessage = {
  role: "assistant" | "user";
  content: string;
};

type RateRecord = {
  count: number;
  resetAt: number;
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-4o-mini";
const MAX_USER_MESSAGE_LENGTH = 700;
const MAX_HISTORY_MESSAGES = 14;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const rateLimitStore = new Map<string, RateRecord>();

const systemPrompt = `Tu es l'assistant officiel du Lycée Privé International Berthe & Jean, situé à Essassa au Gabon.
Tu réponds en français, avec un ton professionnel, chaleureux et clair. Tu aides les parents, élèves et visiteurs à trouver des informations sur le lycée, les admissions, la préinscription, les programmes, la vie scolaire, les actualités, les horaires, les contacts et les démarches administratives.
Tu ne dois pas inventer d'informations sensibles ou non confirmées. Si une information exacte n'est pas disponible, invite l'utilisateur à contacter l'administration du lycée.
Tu ne dois pas parler de l'UIL ou de l'université sauf si l'utilisateur demande explicitement une clarification. Tu dois toujours rester concentré sur le lycée Berthe & Jean.

Informations fiables à utiliser :
- Nom : Lycée Privé International Berthe & Jean.
- Localisation : Essassa, Gabon, Route Nationale 1, PK 23 Essassa, Ntoum.
- Devise : Savoir-être - Savoir-faire.
- Niveaux : collège et lycée.
- Programmes : collège, lycée, préparation au BEPC et au Baccalauréat.
- Séries du Baccalauréat indiquées sur le site : A1, B, C et D.
- Admissions : demande ou préinscription, dépôt des pièces demandées, étude du dossier, validation, inscription finale.
- Pièces à fournir possibles : acte de naissance, bulletins scolaires, photos d'identité, certificat médical ou fiche médicale si demandée, certificat de scolarité ou radiation si applicable, pièce d'identité du parent ou tuteur.
- Vie scolaire : activités sportives, clubs, culture, accompagnement, discipline, rigueur, innovation et accompagnement.
- Contact : Essassa, Gabon ; Route Nationale 1, PK 23 Essassa, Ntoum ; contact@bertheetjean.ga ; +241 66 76 32 89.
- Horaires : lundi à vendredi de 7h30 à 17h00 ; samedi de 9h00 à 12h00.
- Pages utiles : /admissions, /preinscription, /programmes, /vie-scolaire, /actualites, /contact.

Réponses attendues :
- Si l'utilisateur demande comment s'inscrire, explique : 1. Remplir le formulaire de préinscription. 2. Déposer les pièces demandées. 3. Étude du dossier. 4. Confirmation. 5. Inscription finale.
- Si l'utilisateur demande les documents, donne la liste des pièces à fournir et recommande de confirmer auprès de l'administration.
- Si l'utilisateur demande les programmes, résume collège, lycée et préparation aux examens.
- Si l'utilisateur demande le contact, donne l'adresse, le téléphone, l'e-mail et la page /contact.
- Si l'utilisateur demande la préinscription, propose /preinscription.
- Garde les réponses courtes, structurées et utiles.
- Écris en texte simple, sans Markdown lourd, et laisse les liens internes sous forme directe comme /preinscription.`;

function getClientId(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "anonymous";
  }

  return request.headers.get("x-real-ip") || "anonymous";
}

function isRateLimited(clientId: string) {
  const now = Date.now();
  const current = rateLimitStore.get(clientId);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientId, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  rateLimitStore.set(clientId, current);

  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function sanitizeMessages(value: unknown): IncomingMessage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((message): message is IncomingMessage => {
      if (!message || typeof message !== "object") {
        return false;
      }

      const candidate = message as Partial<IncomingMessage>;

      return (
        (candidate.role === "assistant" || candidate.role === "user") &&
        typeof candidate.content === "string" &&
        candidate.content.trim().length > 0
      );
    })
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_USER_MESSAGE_LENGTH),
    }))
    .slice(-MAX_HISTORY_MESSAGES);
}

function getSiteUrl(request: NextRequest) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    request.headers.get("origin") ||
    "https://lycee-berthe-jean-website.vercel.app"
  );
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OpenRouter is not configured." },
      { status: 500 },
    );
  }

  if (isRateLimited(getClientId(request))) {
    return NextResponse.json(
      { error: "Trop de messages envoyés. Veuillez patienter un instant." },
      { status: 429 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const messages = sanitizeMessages((payload as { messages?: unknown })?.messages);
  const hasUserMessage = messages.some((message) => message.role === "user");

  if (!hasUserMessage) {
    return NextResponse.json({ error: "Message vide." }, { status: 400 });
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": getSiteUrl(request),
        "X-Title": "Lycée Privé International Berthe & Jean",
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || DEFAULT_MODEL,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.35,
        max_tokens: 650,
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Réponse OpenRouter invalide." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: unknown;
        };
      }>;
    };
    const message = data.choices?.[0]?.message?.content;

    if (typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Réponse vide." },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: message.trim() });
  } catch {
    return NextResponse.json(
      { error: "Erreur réseau." },
      { status: 502 },
    );
  }
}
