# 🐱 Guide d'installation - Pas touche aux Minouches

## 📋 Ce que tu vas obtenir

✅ **Un site 100% GRATUIT** hébergé sur Netlify  
✅ **Une interface d'administration** pour ajouter des chats facilement  
✅ **Stockage d'images illimité** sur Cloudinary  
✅ **Pas de base de données** à gérer  
✅ **Site toujours actif** (pas de mise en veille comme Render)

---

## 🚀 ÉTAPE 1 : Créer un compte GitHub (si tu n'en as pas)

1. Va sur https://github.com
2. Clique sur "Sign up" (S'inscrire)
3. Crée ton compte avec ton email
4. Vérifie ton email

---

## 📦 ÉTAPE 2 : Créer le dépôt GitHub

1. **Sur GitHub, clique sur le "+" en haut à droite**
2. **Clique sur "New repository"**
3. **Remplis les informations :**
   - Repository name : `pas-touche-aux-minouches`
   - Description : `Site de l'association Pas touche aux Minouches`
   - Public (laisse coché)
   - ❌ NE COCHE PAS "Add a README file"
   - Clique sur "Create repository"

4. **Upload tous les fichiers du dossier que je t'ai donné :**
   - Sur la page du repo, clique sur "uploading an existing file"
   - Glisse-dépose TOUS les fichiers et dossiers
   - Écris un message : "Premier commit"
   - Clique sur "Commit changes"

---

## ☁️ ÉTAPE 3 : Créer un compte Cloudinary (pour les images)

1. Va sur https://cloudinary.com/users/register_free
2. Inscris-toi avec ton email
3. **IMPORTANT : Note ces 3 informations (tu les trouveras sur le dashboard) :**
   - `Cloud name` (exemple : `dpzxbgqre`)
   - `API Key` (exemple : `123456789012345`)
   - `API Secret` (garde-le secret !)

---

## 🌐 ÉTAPE 4 : Créer un compte Netlify et déployer

1. Va sur https://www.netlify.com
2. Clique sur "Sign up" → Choisis "Sign up with GitHub"
3. Autorise Netlify à accéder à GitHub
4. Une fois connecté, clique sur "Add new site" → "Import an existing project"
5. Clique sur "Deploy with GitHub"
6. Cherche et clique sur ton repo `pas-touche-aux-minouches`
7. **Configuration du build :**
   - Build command : `node generate-json.js`
   - Publish directory : `.` (un simple point)
8. Clique sur "Deploy site"

⏳ Attends 1-2 minutes que le site se déploie...

---

## 🔧 ÉTAPE 5 : Configurer Cloudinary dans l'admin

1. **Sur Netlify, va dans ton site → "Site configuration" → "Identity"**
2. Clique sur "Enable Identity"
3. Dans "Registration", choisis "Invite only"
4. Clique sur "Services" → "Enable Git Gateway"

5. **Maintenant, édite le fichier `admin/config.yml` sur GitHub :**
   - Va sur ton repo GitHub
   - Clique sur le dossier `admin`
   - Clique sur `config.yml`
   - Clique sur l'icône crayon (Edit)
   - Remplace :
     ```yaml
     cloud_name: TON_CLOUD_NAME  # Mets ton Cloud name ici
     api_key: TON_API_KEY        # Mets ta API Key ici
     ```
   - Mets tes vraies valeurs de Cloudinary
   - Clique sur "Commit changes"

---

## 👤 ÉTAPE 6 : Créer ton compte admin

1. **Sur Netlify, va dans "Identity" → "Invite users"**
2. Entre ton email (celui de l'asso)
3. Tu recevras un email d'invitation
4. Clique sur le lien dans l'email
5. Crée ton mot de passe

---

## 🎉 ÉTAPE 7 : Utiliser l'interface d'administration

1. **Va sur ton site : `https://TON-SITE.netlify.app/admin/`**
2. Connecte-toi avec ton email et mot de passe
3. **Pour ajouter un chat :**
   - Clique sur "Chats adultes" ou "Chatons"
   - Clique sur "New Chats adultes" (ou "New Chatons")
   - Remplis les informations :
     - Nom
     - Photo (clique pour uploader)
     - Âge
     - Sexe
     - Description
     - Est adopté ? (laisse décoché)
   - Clique sur "Publish" → "Publish now"

4. **Le site se met à jour automatiquement en 1-2 minutes !**

---

## 📝 ÉTAPE 8 : Personnaliser les liens de dons

1. **Sur GitHub, édite le fichier `index.html` :**
2. Cherche `TON_LIEN_HELLOASSO` et remplace par ton vrai lien HelloAsso
3. Cherche `TON_LIEN_AUTRE` et remplace par ton vrai lien Teaming
4. Cherche `TON_LIEN_FACEBOOK` et remplace par ton lien Facebook
5. Cherche `TON_LIEN_INSTAGRAM` et remplace par ton lien Instagram
6. Commit les changements

---

## 🎯 C'EST TOUT ! Ton site est maintenant :

✅ Hébergé GRATUITEMENT sur Netlify  
✅ Toujours actif (pas de mise en veille)  
✅ Avec une interface admin pour ajouter des chats  
✅ Avec stockage d'images sur Cloudinary  
✅ Automatiquement mis à jour quand tu ajoutes un chat  

---

## 💡 Pour ajouter un chat au quotidien :

1. Va sur `https://TON-SITE.netlify.app/admin/`
2. Connecte-toi
3. Ajoute ton chat
4. Clique sur "Publish"
5. ✨ Ton chat apparaît sur le site en 1-2 minutes !

---

## 🆘 Besoin d'aide ?

- **Ton site** : `https://TON-SITE.netlify.app`
- **Ton admin** : `https://TON-SITE.netlify.app/admin/`
- **Dashboard Netlify** : https://app.netlify.com
- **Dashboard Cloudinary** : https://cloudinary.com/console

---

## 📊 Coûts :

- GitHub : **GRATUIT** ✅
- Netlify : **GRATUIT** (100 GB/mois de bande passante) ✅
- Cloudinary : **GRATUIT** (25 crédits/mois) ✅

**TOTAL : 0€/mois** 🎉
