# Lycée Privé International Berthe & Jean

Site officiel et plateforme de gestion scolaire du Lycée Privé International Berthe & Jean, situé à Essassa au Gabon. Le projet conserve le site vitrine existant et ajoute progressivement un espace sécurisé pour l'administration scolaire.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4 via `globals.css`
- Vercel Analytics et Speed Insights
- OpenRouter pour l'Assistant Berthe & Jean
- Supabase Auth et PostgreSQL pour l'espace de gestion scolaire

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrir ensuite `http://localhost:3000`.

Commandes de contrôle :

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
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Variables utilisées :

- `OPENROUTER_API_KEY` : clé serveur OpenRouter, obligatoire pour `/api/chat`.
- `OPENROUTER_MODEL` : modèle OpenRouter optionnel.
- `NEXT_PUBLIC_SITE_URL` : URL publique du site, utilisée pour le SEO et les appels serveur.
- `NEXT_PUBLIC_SUPABASE_URL` : URL publique du projet Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : clé anonyme Supabase, utilisable côté client/serveur.
- `SUPABASE_SERVICE_ROLE_KEY` : clé serveur uniquement. Ne jamais l'exposer côté client. Elle est prévue pour les futures opérations administratives serveur.

Important : les clés privées ne doivent jamais être commitées, ni placées dans le frontend.

## Structure principale

- `src/app/page.tsx` : page d'accueil.
- `src/app/*/page.tsx` : pages À propos, Programmes, Admissions, Vie scolaire, Actualités, FAQ et Contact.
- `src/app/api/chat/route.ts` : route serveur OpenRouter.
- `src/app/api/auth/*/route.ts` : routes serveur de connexion, déconnexion et mot de passe oublié.
- `src/app/gestion/connexion/page.tsx` : connexion à l'espace de gestion.
- `src/app/gestion/page.tsx` : dashboard sécurisé.
- `src/app/gestion/[module]/page.tsx` : modules de gestion par rôle.
- `src/components/school-admin` : composants du dashboard scolaire.
- `src/lib/school` : types, permissions, auth Supabase REST et données de démonstration UI.
- `supabase/schema.sql` : schéma PostgreSQL, relations, triggers et politiques RLS.
- `supabase/seed-demo.sql` : données de test optionnelles.
- `public/assets` : logos, photos, documents et images du lycée.

## Espace de gestion scolaire

La Phase 1 ajoute :

- Authentification par email/mot de passe via Supabase Auth.
- Déconnexion et demande de réinitialisation de mot de passe.
- Protection de `/gestion/*` par `src/proxy.ts` et validation serveur dans les pages privées.
- Rôles : `admin`, `direction`, `teacher`, `student`, `parent`, `accountant`.
- Dashboard responsive avec sidebar, statistiques, annonces, activité récente et données de démonstration.
- Menus filtrés selon le rôle.
- Placeholders propres pour les modules des phases suivantes afin d'éviter les pages cassées.

Les modules CRUD complets restent à développer dans les phases 2 à 6 :

- Phase 2 : élèves, parents, enseignants, classes, matières.
- Phase 3 : notes, présences, emplois du temps.
- Phase 4 : devoirs, documents, annonces.
- Phase 5 : frais scolaires, paiements, reçus, bulletins.
- Phase 6 : optimisation, sécurité fine, responsive avancé et tests métier.

## Configuration Supabase

1. Créer un projet Supabase.
2. Copier `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans `.env.local`.
3. Ajouter les mêmes variables dans Vercel.
4. Dans Supabase SQL Editor, exécuter `supabase/schema.sql`.
5. Créer le premier utilisateur dans Supabase Auth.
6. Le trigger crée un profil `users_profiles` en statut `pending`.
7. Promouvoir ce premier compte en administrateur :

```sql
update public.users_profiles
set role = 'admin',
    status = 'active',
    full_name = 'Administrateur Berthe & Jean'
where email = 'adresse-admin@example.com';
```

8. Tester la connexion sur `/gestion/connexion`.

Pour tester l'interface avec des données fictives, exécuter ensuite `supabase/seed-demo.sql` sur un projet local ou staging. Ne pas lancer ce seed en production sans accord explicite.

## Sécurité

- Les cookies d'authentification sont HTTP-only, `sameSite=lax`, et `secure` en production.
- Le proxy redirige les visiteurs non connectés hors de `/gestion/*`.
- Les pages privées valident aussi la session côté serveur.
- Le schéma Supabase active Row Level Security sur les tables.
- Les politiques RLS actuelles sont une base de Phase 1. Les règles parent/élève doivent être affinées quand les comptes auth seront reliés aux fiches élèves et parents.

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
- Gestion : `/gestion/connexion`, redirection de `/gestion`, sidebar, dashboard, modules par rôle.
- Accessibilité : navigation clavier, focus visible, `prefers-reduced-motion`.
- Chatbot : ouverture, fermeture, réponses, liens internes, historique localStorage.

Pages minimales à tester :

- `/`
- `/a-propos`
- `/programmes`
- `/admissions`
- `/vie-scolaire`
- `/actualites`
- `/contact`
- `/faq`
- `/gestion/connexion`
- `/gestion`

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
