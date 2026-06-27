<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may
differ from training data. Read the relevant guide in
`node_modules/next/dist/docs/` before writing code and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Projet

Ce dépôt contient le site public et le système de gestion scolaire du Lycée
Privé International Berthe & Jean, situé à Essassa au Gabon.

Le site public informe les familles sur le lycée, les programmes, les
admissions, la vie scolaire, les actualités et les contacts. L'espace
`/gestion` centralise progressivement les données administratives,
pédagogiques et financières autorisées.

Publics concernés :

- administration et direction ;
- secrétariat et comptabilité ;
- enseignants et personnel autorisé ;
- élèves et parents.

# Technologies

- Next.js 16 App Router et React 19 ;
- TypeScript ;
- Tailwind CSS v4 et styles globaux dans `src/app/globals.css` ;
- Supabase Auth, PostgreSQL, RLS et futur Supabase Storage ;
- Vercel pour l'hébergement, Analytics et Speed Insights ;
- OpenRouter côté serveur pour l'assistant du lycée ;
- Lucide React pour les icônes.

# Commandes

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

Avant toute livraison, exécuter au minimum `npm run lint` et `npm run build`.

# Design

- Respecter le vert foncé, le blanc/crème et les accents dorés.
- Conserver une interface premium, sobre et adaptée à un lycée privé.
- Utiliser des cartes compactes, des ombres légères et des rayons modérés.
- Garder toute l'interface de gestion en français.
- Vérifier ordinateur, tablette et mobile.
- Préserver les animations existantes et `prefers-reduced-motion`.
- Ne pas transformer le dashboard en page marketing.

# Sécurité

- Ne jamais exposer de clé privée dans le frontend ou dans Git.
- Utiliser `.env.local` et documenter uniquement les noms dans `.env.example`.
- Valider les sessions dans les Server Components, Server Actions et Route
  Handlers. Le proxy n'est qu'une première barrière.
- Contrôler les permissions côté serveur avant chaque mutation.
- Utiliser les politiques Supabase RLS pour limiter les lignes visibles.
- Un parent ne doit voir que ses enfants et un élève uniquement son dossier.
- Un enseignant ne doit modifier que ses classes, matières, notes et présences.
- La comptabilité ne doit jamais modifier les notes.
- Journaliser les opérations sensibles dans `audit_logs`.
- Ne jamais stocker de vraies données d'élèves ou de parents dans le code.
- Ne pas activer un paiement réel sans validation explicite et audit dédié.

# Rôles

Les rôles préparés sont :

- `super_admin` : configuration globale, comptes et sécurité ;
- `admin` : administration quotidienne complète ;
- `direction` : supervision et gestion scolaire ;
- `secretary` : dossiers administratifs autorisés ;
- `teacher` : classes, notes, présences et devoirs autorisés ;
- `student` : consultation de ses propres informations ;
- `parent` : consultation de ses enfants uniquement ;
- `accountant` : frais, paiements, factures et reçus ;
- `staff` : accès limité aux annonces et documents autorisés.

Toute modification des rôles doit être répercutée dans :

- `src/lib/school/types.ts` ;
- `src/lib/school/permissions.ts` ;
- `src/lib/school/auth.ts` ;
- `supabase/schema.sql`.

# Conventions de code

- Préférer les Server Components pour les lectures et les Server Actions pour
  les mutations internes.
- Garder les composants interactifs en Client Components aussi bas que
  possible dans l'arbre.
- Initialiser les clients externes de manière paresseuse, jamais au niveau du
  module si une variable d'environnement est requise.
- Réutiliser les composants et classes `school-*` déjà présents.
- Employer des noms explicites et des types stricts.
- Éviter le code dupliqué et les abstractions sans bénéfice réel.
- Ajouter des commentaires uniquement pour les blocs non évidents.
- Ne pas utiliser `dangerouslySetInnerHTML` pour du contenu utilisateur.

# Données

- Les données de l'interface de gestion viennent de Supabase.
- `supabase/seed-demo.sql` est réservé au développement ou au staging.
- Ne jamais lancer le seed de démonstration en production sans accord.
- Les relations doivent utiliser des clés étrangères et des index adaptés.
- Les fichiers scolaires doivent aller dans un bucket Supabase Storage privé.
- Les exports doivent être générés côté serveur et leur accès doit être
  contrôlé.

# Modules

Modules fonctionnels ou en cours :

- dashboard ;
- élèves ;
- parents ;
- enseignants ;
- classes ;
- matières.

Modules préparés dans la navigation et le schéma :

- notes ;
- présences ;
- emploi du temps ;
- devoirs ;
- annonces ;
- documents ;
- frais scolaires ;
- paiements et factures ;
- rapports et exports ;
- paramètres, notifications et audit.

# Maintenance

- Ne pas casser le site public ni supprimer une page existante sans raison.
- Lire les fichiers concernés avant toute modification.
- Préserver les changements utilisateur non liés.
- Mettre à jour `.env.example`, `README.md` et le schéma quand une nouvelle
  intégration est ajoutée.
- Tester les accès avec au moins un rôle autorisé et un rôle refusé.
- Vérifier les états vide, chargement, erreur et succès.
- Après modification du schéma, fournir les instructions de migration
  Supabase. Le déploiement Vercel n'exécute pas automatiquement le SQL.
- À la fin, expliquer les fichiers modifiés, les tests lancés et les actions
  manuelles restantes.
