# Lycée Privé International Berthe & Jean

Site vitrine officiel du Lycée Privé International Berthe & Jean, situé à Essassa au Gabon. Le site présente l'établissement, ses programmes, les admissions, la vie scolaire, les actualités, les informations de contact et un assistant conversationnel connecté à OpenRouter côté serveur.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4 via `globals.css`
- Vercel Analytics et Speed Insights
- OpenRouter pour l'Assistant Berthe & Jean

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir ensuite `http://localhost:3000`.

## Commandes utiles

```bash
npm run lint
npm run build
```

Le build Next.js sert aussi de contrôle TypeScript.

## Variables d'environnement

Créer un fichier `.env.local` à partir de `.env.example`.

```bash
OPENROUTER_API_KEY=
OPENROUTER_MODEL=
```

Variables utilisées :

- `OPENROUTER_API_KEY` : clé serveur OpenRouter, obligatoire pour `/api/chat`.
- `OPENROUTER_MODEL` : modèle OpenRouter optionnel. Si absent, le site utilise le modèle par défaut défini dans l'API.
- `NEXT_PUBLIC_SITE_URL` : optionnel, utilisé comme URL de référence dans les appels OpenRouter si défini.

Important : la clé OpenRouter ne doit jamais être exposée côté client.

## Structure du projet

- `src/app/page.tsx` : page d'accueil.
- `src/app/*/page.tsx` : pages À propos, Programmes, Admissions, Vie scolaire, Actualités et Contact.
- `src/app/site-data.ts` : contenus partagés du site.
- `src/app/site-components.tsx` : composants communs de layout, héros, cartes, CTA et footer.
- `src/components/Chatbot.tsx` : assistant flottant du lycée.
- `src/components/ActualitesInteractive.tsx` : filtres, galerie et newsletter de la page Actualités.
- `public/assets` : logos, photos, documents et images du lycée.

## Design et animations

Le site utilise une identité blanc, vert foncé et doré. Les animations sont CSS-first pour rester légères :

- révélations douces des héros et sections éditoriales ;
- apparition en cascade des cartes ;
- hover propre sur cartes, boutons et liens ;
- respect de `prefers-reduced-motion` ;
- durées plus courtes sur mobile pour préserver la fluidité.

Ne pas ajouter de bibliothèque d'animation lourde sans nécessité claire.

## QA avant publication

Vérifications recommandées avant commit :

```bash
npm run lint
npm run build
```

Parcours visuels à vérifier :

- Desktop 1366x768 : accueil, héros, navigation, cartes, galerie, actualités, contact.
- Mobile 390x844 : aucun débordement horizontal, textes lisibles, menu mobile, chatbot.
- Accessibilité : navigation clavier, focus visible, `prefers-reduced-motion`.
- Chatbot : ouverture, fermeture, réponses rapides, liens internes, historique localStorage.

Pages minimales à tester :

- `/`
- `/a-propos`
- `/programmes`
- `/admissions`
- `/vie-scolaire`
- `/actualites`
- `/contact`

## Déploiement Vercel

Déploiement production :

```bash
vercel deploy --prod --yes
```

Contrôles après déploiement :

```bash
vercel inspect <deployment-url>
vercel logs --since 20m --level error
```

Vérifier aussi que les pages principales répondent en HTTP 200 sur l'alias de production.
