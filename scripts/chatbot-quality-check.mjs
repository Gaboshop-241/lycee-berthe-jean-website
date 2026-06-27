const baseUrl = process.env.CHATBOT_TEST_URL || "http://127.0.0.1:3017";

const cases = [
  {
    message: "Bonjour",
    siteLocale: "en",
    expectedLocale: "fr",
    expectedIntent: "greeting",
    actions: [],
  },
  {
    message: "Je veux inscrire mon enfant",
    siteLocale: "en",
    expectedLocale: "fr",
    expectedIntent: "admissions",
    actions: ["admissions", "preinscription"],
  },
  {
    message: "Quels sont les documents à fournir ?",
    siteLocale: "en",
    expectedLocale: "fr",
    expectedIntent: "documents",
    actions: ["admissions", "contact-page"],
  },
  {
    message: "Quels sont les frais de scolarité ?",
    siteLocale: "en",
    expectedLocale: "fr",
    expectedIntent: "fees",
    actions: ["admissions", "contact-page"],
  },
  {
    message: "Où se trouve le lycée ?",
    siteLocale: "en",
    expectedLocale: "fr",
    expectedIntent: "location",
    actions: ["maps", "contact-page"],
  },
  {
    message: "Quels programmes proposez-vous ?",
    siteLocale: "en",
    expectedLocale: "fr",
    expectedIntent: "programs",
    actions: ["programs", "admissions"],
  },
  {
    message: "Do you accept international students?",
    siteLocale: "fr",
    expectedLocale: "en",
    expectedIntent: "international",
    actions: ["admissions", "contact-page"],
  },
  {
    message: "How can I apply?",
    siteLocale: "fr",
    expectedLocale: "en",
    expectedIntent: "admissions",
    actions: ["admissions", "preinscription"],
  },
  {
    message: "gklsdfjglskdf?",
    siteLocale: "fr",
    expectedLocale: "fr",
    expectedIntent: "confusing",
    actions: [],
  },
  {
    message: "Qui est le président du Gabon ?",
    siteLocale: "en",
    expectedLocale: "fr",
    expectedIntent: "offTopic",
    actions: ["programs", "admissions"],
  },
  {
    message: "Peux-tu me raconter une blague ?",
    siteLocale: "en",
    expectedLocale: "fr",
    expectedIntent: "offTopic",
    actions: ["programs", "admissions"],
  },
  {
    message: "Donne-moi le contact de l'école",
    siteLocale: "en",
    expectedLocale: "fr",
    expectedIntent: "contact",
    actions: ["contact-page", "call-school", "email-school"],
  },
  {
    message: "Est-ce que je peux visiter l'établissement ?",
    siteLocale: "en",
    expectedLocale: "fr",
    expectedIntent: "visit",
    actions: ["visit-contact", "call-school", "maps"],
  },
  {
    message: "Est-ce que vous avez le collège et le lycée ?",
    siteLocale: "en",
    expectedLocale: "fr",
    expectedIntent: "programs",
    actions: ["programs", "admissions"],
  },
  {
    message: "Quels sont les avantages de votre école ?",
    siteLocale: "en",
    expectedLocale: "fr",
    expectedIntent: "benefits",
    actions: ["programs", "school-life", "admissions"],
  },
];

function hasVisibleMarkdown(value) {
  return /(^|\n)\s*#{1,6}\s|\*\*|```|(^|\n)\s*\*\s/.test(value);
}

async function runCase(testCase) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 32_000);

  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        locale: testCase.siteLocale,
        messages: [{ role: "user", content: testCase.message }],
      }),
      signal: controller.signal,
    });
    const body = await response.json();
    const actionIds = Array.isArray(body.actions)
      ? body.actions.map((action) => action.id)
      : [];
    const failures = [];

    if (!response.ok) failures.push(`HTTP ${response.status}`);
    if (body.locale !== testCase.expectedLocale) {
      failures.push(`langue ${body.locale ?? "absente"}`);
    }
    if (body.intent !== testCase.expectedIntent) {
      failures.push(`intention ${body.intent ?? "absente"}`);
    }
    if (typeof body.message !== "string" || body.message.trim().length < 12) {
      failures.push("réponse vide ou trop courte");
    }
    if (typeof body.message === "string" && body.message.length > 1_700) {
      failures.push("réponse trop longue");
    }
    if (typeof body.message === "string" && hasVisibleMarkdown(body.message)) {
      failures.push("Markdown visible");
    }
    if (actionIds.length > 4) failures.push("plus de quatre actions");

    for (const expectedAction of testCase.actions) {
      if (!actionIds.includes(expectedAction)) {
        failures.push(`action manquante ${expectedAction}`);
      }
    }

    return {
      message: testCase.message,
      locale: body.locale,
      intent: body.intent,
      source: body.source,
      actions: actionIds.join(", ") || "-",
      status: failures.length === 0 ? "OK" : failures.join("; "),
    };
  } catch (error) {
    return {
      message: testCase.message,
      locale: "-",
      intent: "-",
      source: "-",
      actions: "-",
      status: error instanceof Error ? error.message : "échec inconnu",
    };
  } finally {
    clearTimeout(timeout);
  }
}

const results = [];

for (let index = 0; index < cases.length; index += 3) {
  const batch = cases.slice(index, index + 3);
  results.push(...(await Promise.all(batch.map(runCase))));
}

console.table(results);

const failed = results.filter((result) => result.status !== "OK");

if (failed.length > 0) {
  console.error(`${failed.length} scénario(s) en échec sur ${results.length}.`);
  process.exit(1);
}

const sources = results.reduce((counts, result) => {
  counts[result.source] = (counts[result.source] || 0) + 1;
  return counts;
}, {});

console.log(`15 scénarios validés. Sources : ${JSON.stringify(sources)}.`);
