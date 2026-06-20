import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/app/i18n-config";

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

const systemPromptEn = `You are the official assistant for Lycée Privé International Berthe & Jean, located in Essassa, Gabon.
You answer in English with a professional, warm and clear tone. You help parents, students and visitors find information about the school, admissions, pre-registration, programs, school life, news, opening hours, contacts and administrative procedures.
You must not invent sensitive or unconfirmed information. If exact information is not available, invite the user to contact the school administration.
You must not talk about UIL or the university unless the user explicitly asks for clarification. Always stay focused on Berthe & Jean school.

Reliable information to use:
- Name: Lycée Privé International Berthe & Jean.
- Location: Essassa, Gabon, National Road 1, PK 23 Essassa, Ntoum.
- Motto: Savoir-être - Savoir-faire.
- Levels: lower secondary and upper secondary.
- Programs: lower secondary, upper secondary, BEPC and Baccalauréat preparation.
- Baccalauréat streams shown on the site: A1, B, C and D.
- Admissions: request or pre-registration, submission of required documents, file review, validation, final registration.
- Possible required documents: birth certificate, school reports, passport photos, medical certificate or medical file if requested, school certificate or transfer/radiation certificate if applicable, parent or guardian ID.
- School life: sports, clubs, culture, support, discipline, rigor, innovation and guidance.
- Contact: Essassa, Gabon; National Road 1, PK 23 Essassa, Ntoum; contact@bertheetjean.ga; +241 66 76 32 89.
- Opening hours: Monday to Friday from 7:30 AM to 5:00 PM; Saturday from 9:00 AM to 12:00 PM.
- Useful pages: /admissions, /preinscription, /programmes, /vie-scolaire, /actualites, /contact.

Expected behavior:
- If the user asks how to apply, explain: 1. Fill in the pre-registration form. 2. Submit the requested documents. 3. File review. 4. Confirmation. 5. Final registration.
- If the user asks for documents, list the documents and recommend confirming with the administration.
- If the user asks about programs, summarize lower secondary, upper secondary and exam preparation.
- If the user asks for contact information, provide the address, phone, email and /contact page.
- If the user asks about pre-registration, suggest /preinscription.
- Keep answers short, structured and useful.
- Write in plain text, without heavy Markdown, and keep internal links direct, such as /preinscription.`;

const languagePatterns = {
  fr: {
    words: new Set([
      "bonjour",
      "salut",
      "merci",
      "comment",
      "inscrire",
      "inscription",
      "preinscription",
      "documents",
      "fournir",
      "lycee",
      "eleve",
      "enfant",
      "classe",
      "niveau",
      "horaires",
      "adresse",
      "telephone",
      "contact",
      "frais",
      "programme",
      "programmes",
      "scolaire",
      "actualites",
      "quels",
      "quelle",
      "quoi",
      "ou",
      "rendez",
      "vous",
    ]),
    phrases: [
      "comment m'inscrire",
      "comment inscrire",
      "quels documents",
      "quelle classe",
      "y a-t-il",
      "est-ce",
      "je veux",
      "mon enfant",
    ],
  },
  en: {
    words: new Set([
      "hello",
      "hi",
      "thanks",
      "thank",
      "how",
      "apply",
      "admission",
      "admissions",
      "registration",
      "documents",
      "required",
      "school",
      "student",
      "child",
      "grade",
      "class",
      "hours",
      "address",
      "phone",
      "contact",
      "fees",
      "program",
      "programs",
      "news",
      "where",
      "what",
      "when",
      "appointment",
      "please",
    ]),
    phrases: [
      "how do i",
      "how can i",
      "what documents",
      "are there",
      "i want",
      "my child",
      "school fees",
    ],
  },
} as const;

function normalizeForLanguageDetection(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’]/g, "'");
}

function detectResponseLocale(message: string, fallbackLocale: Locale): Locale {
  const normalized = normalizeForLanguageDetection(message);
  const words = normalized.match(/[a-z']+/g) ?? [];

  if (normalized.trim().length < 4) {
    return fallbackLocale;
  }

  let frenchScore = /[àâçéèêëîïôûùüÿœ]/i.test(message) ? 2 : 0;
  let englishScore = 0;

  for (const word of words) {
    if (languagePatterns.fr.words.has(word)) {
      frenchScore += 1;
    }

    if (languagePatterns.en.words.has(word)) {
      englishScore += 1;
    }
  }

  for (const phrase of languagePatterns.fr.phrases) {
    if (normalized.includes(phrase)) {
      frenchScore += 2;
    }
  }

  for (const phrase of languagePatterns.en.phrases) {
    if (normalized.includes(phrase)) {
      englishScore += 2;
    }
  }

  if (Math.abs(frenchScore - englishScore) <= 1) {
    return fallbackLocale;
  }

  return frenchScore > englishScore ? "fr" : "en";
}

function getLatestUserMessage(messages: IncomingMessage[]) {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === "user") {
      return messages[index].content;
    }
  }

  return "";
}

function getStyleInstruction(locale: Locale) {
  if (locale === "en") {
    return `Detected response language: English.
Write like a real front-desk assistant at the school: warm, natural, concise and reassuring.
Do not use visible Markdown, asterisks, bold markers, ### headings, tables or code blocks.
Avoid robotic openings such as "Sure, here is..." in every answer.
Use short paragraphs. If a list helps, use simple dash bullets only, not numbered lists.
If information is not confirmed, say so naturally and give a useful next step, such as contacting the administration or visiting /contact.`;
  }

  return `Langue de reponse detectee : francais.
Reponds comme un vrai assistant d'accueil du lycee : chaleureux, naturel, concis et rassurant.
N'utilise pas de Markdown visible, pas d'asterisques, pas de titres ###, pas de tableau et pas de bloc de code.
Evite les debuts robotiques comme "Bien sur, voici..." a chaque reponse.
Utilise de courts paragraphes. Si une liste aide vraiment, utilise uniquement des tirets simples, pas de liste numerotee.
Si une information n'est pas confirmee, dis-le naturellement et propose une suite utile, comme contacter l'administration ou consulter /contact.`;
}

function sanitizeAssistantReply(content: string) {
  return content
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s*\*\s+/gm, "- ")
    .replace(/^\s*\d+[.)]\s+/gm, "- ")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`{1,3}/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

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

function callOpenRouter({
  apiKey,
  locale,
  messages,
  model,
  siteUrl,
}: {
  apiKey: string;
  locale: Locale;
  messages: IncomingMessage[];
  model: string;
  siteUrl: string;
}) {
  return fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl,
      "X-Title": "Lycee Prive International Berthe & Jean",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: `${locale === "en" ? systemPromptEn : systemPrompt}\n\n${getStyleInstruction(locale)}`,
        },
        ...messages,
      ],
      temperature: 0.42,
      max_tokens: 420,
    }),
    signal: AbortSignal.timeout(30_000),
  });
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
  const incomingLocale = (payload as { locale?: unknown })?.locale;
  const locale =
    typeof incomingLocale === "string" && isLocale(incomingLocale)
      ? incomingLocale
      : defaultLocale;
  const hasUserMessage = messages.some((message) => message.role === "user");
  const responseLocale = detectResponseLocale(getLatestUserMessage(messages), locale);

  if (!hasUserMessage) {
    return NextResponse.json({ error: "Message vide." }, { status: 400 });
  }

  try {
    const siteUrl = getSiteUrl(request);
    const preferredModel = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
    let response = await callOpenRouter({
      apiKey,
      locale: responseLocale,
      messages,
      model: preferredModel,
      siteUrl,
    });

    if (!response.ok && preferredModel !== DEFAULT_MODEL) {
      response = await callOpenRouter({
        apiKey,
        locale: responseLocale,
        messages,
        model: DEFAULT_MODEL,
        siteUrl,
      });
    }

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

    return NextResponse.json({ message: sanitizeAssistantReply(message) });
  } catch {
    return NextResponse.json(
      { error: "Erreur réseau." },
      { status: 502 },
    );
  }
}
