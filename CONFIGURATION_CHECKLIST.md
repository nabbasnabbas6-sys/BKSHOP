# ✅ Checklist de Configuration - BK Shop

## 🔐 Configuration Firebase

### Étape 1: Créer un projet Firebase
- [ ] Aller sur https://console.firebase.google.com/
- [ ] Cliquer sur "Ajouter un projet"
- [ ] Donner un nom à votre projet (ex: "BK Shop")
- [ ] Accepter les conditions et créer

### Étape 2: Configurer l'authentification

**Frontend Firebase SDK:**
- [ ] Aller sur "Authentification" dans le menu gauche
- [ ] Cliquer sur "Démarrer"
- [ ] Activer "Email/Mot de passe"
- [ ] Activer "Google" (optionnel mais recommandé)
- [ ] Aller sur "Paramètres du projet" (⚙️)
- [ ] Cliquer sur "Votre application"
- [ ] Sélectionner le type "Web" (</> symbole)
- [ ] Copier la configuration Firebase
- [ ] Coller dans `userfrontend/.env`:

```env
VITE_FIREBASE_API_KEY=votre_api_key
VITE_FIREBASE_AUTH_DOMAIN=votre_auth_domain
VITE_FIREBASE_PROJECT_ID=votre_project_id
VITE_FIREBASE_STORAGE_BUCKET=votre_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_messaging_sender_id
VITE_FIREBASE_APP_ID=votre_app_id
```

**Backend Firebase Admin:**
- [ ] Aller sur "Paramètres du projet" (⚙️)
- [ ] Aller sur l'onglet "Comptes de Service"
- [ ] Cliquer sur "Générer nouvelle clé privée"
- [ ] Sauvegarder le fichier JSON
- [ ] Extraire les valeurs et coller dans `backend/.env`:

```env
FIREBASE_PROJECT_ID=votre_project_id
FIREBASE_PRIVATE_KEY=votre_private_key
FIREBASE_CLIENT_EMAIL=votre_client_email
```

### Étape 3: Configurer Firestore
- [ ] Aller sur "Firestore Database" dans le menu gauche
- [ ] Cliquer sur "Créer une base de données"
- [ ] Sélectionner "Démarrer en mode test"
- [ ] Choisir la région (ex: "europe-west1")
- [ ] Cliquer sur "Créer"

**Règles Firestore:**
- [ ] Aller sur l'onglet "Règles"
- [ ] Remplacer par:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

- [ ] Cliquer sur "Publier"

---

## 🔑 Configuration Google OAuth (Optionnel mais Recommandé)

### Étape 1: Créer un projet Google Cloud
- [ ] Aller sur https://console.cloud.google.com/
- [ ] Cliquer sur le sélecteur de projet en haut
- [ ] Cliquer sur "Nouveau projet"
- [ ] Donner un nom et attendre la création

### Étape 2: Activer les APIs
- [ ] Dans le menu gauche, aller sur "APIs et services"
- [ ] Cliquer sur "Activer les APIs et les services"
- [ ] Chercher "Google+ API"
- [ ] Cliquer dessus et appuyer sur "Activer"

### Étape 3: Créer les identifiants
- [ ] Aller sur "Identifiants" dans le menu gauche
- [ ] Cliquer sur "Créer des identifiants"
- [ ] Choisir "ID client OAuth 2.0"
- [ ] Choisir "Application Web"
- [ ] Dans "Origines JavaScript autorisées", ajouter:
  - [ ] http://localhost:5173
  - [ ] http://localhost:5173/
- [ ] Dans "URI de redirection autorisés", ajouter:
  - [ ] http://localhost:5173/
  - [ ] http://localhost:5173/login
  - [ ] http://localhost:5173/signup
- [ ] Cliquer sur "Créer"
- [ ] Copier l'ID client (ne pas fermer la fenêtre)

### Étape 4: Configurer Firebase pour Google OAuth
- [ ] Retourner sur https://console.firebase.google.com/
- [ ] Aller sur "Authentification" > "Méthode de connexion"
- [ ] Cliquer sur "Google"
- [ ] Activer le toggle
- [ ] Coller l'ID client Google dans le champ "ID client Web"
- [ ] Remplir le champ "Secret client" (si demandé)
- [ ] Cliquer sur "Enregistrer"

---

## 🚀 Configuration Locale

### Étape 1: Configurer les variables d'environnement

**Frontend** - `userfrontend/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=<à remplir>
VITE_FIREBASE_AUTH_DOMAIN=<à remplir>
VITE_FIREBASE_PROJECT_ID=<à remplir>
VITE_FIREBASE_STORAGE_BUCKET=<à remplir>
VITE_FIREBASE_MESSAGING_SENDER_ID=<à remplir>
VITE_FIREBASE_APP_ID=<à remplir>
```

**Backend** - `backend/.env`:
```env
PORT=5000
FIREBASE_PROJECT_ID=<à remplir>
FIREBASE_PRIVATE_KEY=<à remplir>
FIREBASE_CLIENT_EMAIL=<à remplir>
CORS_ORIGIN=http://localhost:5173
```

### Étape 2: Installer les dépendances
- [ ] Frontend: `cd userfrontend && npm install`
- [ ] Backend: `cd backend && npm install`

### Étape 3: Démarrer les serveurs

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

- [ ] Vérifier que le serveur écoute sur le port 5000

**Terminal 2 - Frontend:**
```bash
cd userfrontend
npm run dev
```

- [ ] Vérifier que le serveur écoute sur le port 5173

---

## ✅ Tests de Vérification

### Test 1: Vérifier le backend
- [ ] Ouvrir http://localhost:5000/api/health
- [ ] Vérifier que vous voyez `{"status":"OK"}`

### Test 2: Créer un compte
- [ ] Aller sur http://localhost:5173/signup
- [ ] Remplir le formulaire avec des données de test
- [ ] Cliquer sur "S'inscrire"
- [ ] Vérifier que vous êtes redirigé vers la page d'accueil
- [ ] Vérifier que votre nom s'affiche

### Test 3: Déconnexion et reconnexion
- [ ] Cliquer sur l'avatar en haut à droite
- [ ] Cliquer sur "Déconnexion"
- [ ] Vérifier que vous êtes redirigé vers la page de connexion
- [ ] Cliquer sur "Connectez-vous"
- [ ] Entrer votre email et mot de passe
- [ ] Vérifier que vous êtes reconnecté

### Test 4: Connexion Google (si configurée)
- [ ] Aller sur http://localhost:5173/signup
- [ ] Cliquer sur "S'inscrire avec Google"
- [ ] Sélectionner un compte Google
- [ ] Vérifier que vous êtes connecté avec votre profil Google

---

## 🐛 Dépannage

### "CORS Error"
- [ ] Vérifier que `CORS_ORIGIN` dans `backend/.env` est `http://localhost:5173`
- [ ] Redémarrer le backend

### "Firebase Unauthorized"
- [ ] Vérifier les variables dans `userfrontend/.env`
- [ ] Vérifier que Firebase a activé Email/Mot de passe

### "Google Auth Error"
- [ ] Vérifier les origines JavaScript dans Google Cloud Console
- [ ] Vérifier que l'ID client est dans Firebase

### "Cannot find module firebase"
```bash
cd userfrontend
npm install firebase
```

### "Port déjà utilisé"
```bash
# Tuer le processus qui utilise le port
lsof -i :5000  # Backend
lsof -i :5173  # Frontend
kill -9 <PID>
```

---

## 📝 Notes Importantes

- ✅ Ne jamais commiter `.env` - ajouter à `.gitignore`
- ✅ Ne jamais partager votre clé privée Firebase
- ✅ Les règles Firestore en mode "test" sont ouvertes - à sécuriser en production
- ✅ Mettre à jour `CORS_ORIGIN` en production
- ✅ Utiliser des variables d'environnement sensibles

---

## ✨ Une fois tout configuré

- [ ] Vous êtes prêt à développer votre e-commerce!
- [ ] Consultez `QUICK_START.md` pour les étapes suivantes
- [ ] Consultez `README.md` pour la documentation complète
- [ ] Consultez `backend/API_DOCS.md` pour l'API

---

**Félicitations! 🎉 Votre BK Shop est maintenant prêt!**
