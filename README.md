# 🎬 Clay Diaporama

**➡️ Site en ligne : https://jordanscience.github.io/diaporama-tv/**

Un site ultra-simple pour faire défiler **vos photos et vidéos en plein écran sur votre télé**, en boucle, pendant 24 h (ou plus).

- Connexion par e-mail + mot de passe
- Upload de photos et vidéos (glisser-déposer)
- **Choix des médias à diffuser, de leur ordre (↑ ↓) et de la durée de chaque photo**
- Un seul gros bouton **▶ LECTURE** → diaporama plein écran en boucle
- 100 % gratuit (Supabase pour le stockage + hébergement statique gratuit)

### Composer le diaporama

Une fois connecté, la page de gestion a deux parties :

- **🎞️ Dans le diaporama** : la liste ordonnée des médias qui défilent. Boutons ↑ ↓ pour changer l'ordre, champ « s » pour régler la durée d'une photo (vide = durée par défaut), ✕ pour la retirer.
- **📁 Ma bibliothèque** : tous vos fichiers envoyés. Bouton **＋ Ajouter** pour en mettre un dans le diaporama, ✕ pour le supprimer définitivement.

Tout est **enregistré automatiquement** (dans un fichier `playlist.json` sur Supabase) et **partagé avec la télé** : configurez depuis le PC, la télé lira exactement cette sélection. Si vous ne sélectionnez rien, le diaporama lit **toute** la bibliothèque.

---

## Étape 1 — Créer le stockage gratuit (Supabase, ~5 minutes)

1. Allez sur **https://supabase.com** et créez un compte gratuit, puis un nouveau projet (nom libre, ex. `diaporama`).
2. **Créer votre utilisateur** (identifiant du site) :
   - Menu **Authentication** → onglet **Users** → **Add user** → **Create new user**
   - Entrez votre e-mail et un mot de passe → cochez **Auto Confirm User** → créez.
   - (Personne d'autre ne pourra s'inscrire : il n'y a pas de formulaire d'inscription sur le site.)
3. **Créer le bucket de stockage** :
   - Menu **Storage** → **New bucket** → nom : `media` → laissez-le **privé** (Public bucket décoché) → créez.
4. **Autoriser votre compte à lire/écrire dans le bucket** :
   - Menu **SQL Editor** → **New query** → collez ceci puis **Run** :

   ```sql
   create policy "acces media authentifie"
   on storage.objects for all to authenticated
   using (bucket_id = 'media')
   with check (bucket_id = 'media');
   ```

5. **Récupérer les clés** :
   - Menu **Settings** (roue dentée) → **API**
   - Copiez **Project URL** (ex. `https://abcdefgh.supabase.co`)
   - Copiez la clé **anon / public**

## Étape 2 — Configurer le site

Ouvrez le fichier **`config.js`** et remplacez les deux valeurs :

```js
supabaseUrl: "https://abcdefgh.supabase.co",   // votre Project URL
supabaseAnonKey: "eyJhbGciOi...",              // votre clé anon
```

C'est tout. (Vous pouvez aussi y régler la durée d'affichage des photos.)

## Étape 3 — Mettre le site en ligne (gratuit)

Le site est composé de 2 fichiers statiques (`index.html` + `config.js`). N'importe quel hébergeur statique gratuit convient :

**Option A — Netlify (le plus simple)**
1. Créez un compte gratuit sur **https://app.netlify.com**
2. Allez sur **https://app.netlify.com/drop**
3. Glissez-déposez le dossier `Site Clay` entier → votre site est en ligne avec une adresse du type `https://votre-site.netlify.app`

**Option B — GitHub Pages** : créez un dépôt, poussez les fichiers, activez Pages dans les réglages.

**Option C — Vercel** : compte gratuit, glissez le dossier sur vercel.com/new.

## Étape 4 — Sur la télé

1. Ouvrez le **navigateur de la télé** et allez sur l'adresse de votre site.
2. Connectez-vous (la session reste enregistrée : à faire une seule fois).
3. Appuyez sur **▶ LECTURE** → le diaporama passe en plein écran et boucle indéfiniment.

**Télécommande :** OK / flèche droite = média suivant · Retour / Échap = quitter.

### ⚠️ Conseils pour une lecture de 24 h

- **Désactivez la mise en veille de la télé** (réglages TV → économie d'énergie / veille automatique). Le site demande au navigateur de rester allumé (Wake Lock), mais la veille de la télé elle-même a le dernier mot.
- **Formats vidéo** : utilisez du **MP4 (H.264)**, le format le mieux lu par les navigateurs de télé. Les `.mov` d'iPhone peuvent ne pas fonctionner → convertissez-les en MP4.
- **Taille des fichiers** : le plan gratuit Supabase offre **1 Go de stockage** et **5 Go de transfert/mois**. Le site met les fichiers en cache pendant la lecture pour ne pas les re-télécharger à chaque boucle, mais restez raisonnable sur le poids des vidéos (idéalement < 100 Mo chacune).
- Le son des vidéos est **coupé par défaut** (les navigateurs de télé l'exigent souvent) : cochez « Son des vidéos » avant de lancer la lecture si vous le voulez.

## Tester sur l'ordinateur avant

Ouvrez simplement `index.html` dans votre navigateur (double-clic), ou lancez un petit serveur local :

```
npx serve "C:\Users\jorda\work\Site Clay"
```
