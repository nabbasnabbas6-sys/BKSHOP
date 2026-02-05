# 🛍️ BK Shop - E-commerce Platform

## 📋 Configuration de l'Authentification

Bienvenue dans votre site e-commerce BK Shop ! Ce projet est configuré avec une authentification complète incluant l'inscription par formulaire et la connexion Google.

### 🔧 Configuration nécessaire

#### 1. **Configuration Firebase**

**Frontend** - Mettez à jour `userfrontend/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=votre_clé_api
VITE_FIREBASE_AUTH_DOMAIN=votre_projet.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=votre_id_projet
VITE_FIREBASE_STORAGE_BUCKET=votre_projet.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=votre_id_sender
VITE_FIREBASE_APP_ID=votre_app_id
```

Obtenez ces informations depuis [Firebase Console](https://console.firebase.google.com/).

**Backend** - Mettez à jour `backend/.env`:
```env
PORT=5000
FIREBASE_PROJECT_ID=votre_id_projet
FIREBASE_PRIVATE_KEY=votre_clé_privée
FIREBASE_CLIENT_EMAIL=votre_email_service
CORS_ORIGIN=http://localhost:5173
```

Téléchargez le fichier JSON de clés depuis Firebase > Paramètres du Projet > Comptes de Service.

#### 2. **Configuration Google OAuth (optionnel)**

Pour activer la connexion Google:
1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet
3. Activez Google+ API
4. Créez des identifiants OAuth 2.0 (Web)
5. Ajoutez les URI autorisés:
   - `http://localhost:5173`
   - `http://localhost:5173/login`
   - `http://localhost:5173/signup`

### 🚀 Démarrage du projet

**Frontend:**
```bash
cd userfrontend
npm run dev
```

**Backend:**
```bash
cd backend
npm run dev
```

### 📁 Structure du Projet

```
BK_Shop/
├── userfrontend/          # Frontend React + Vite + Tailwind
│   ├── src/
│   │   ├── pages/         # Pages (SignUp, Login, Home)
│   │   ├── components/    # Composants (ProtectedRoute)
│   │   ├── store/         # Zustand store (authStore)
│   │   ├── firebase.js    # Config Firebase
│   │   └── App.tsx        # Routes principales
│   └── .env               # Variables d'environnement
│
├── backend/               # Backend Node.js + Express
│   ├── server.js          # Serveur principal
│   ├── firebase.js        # Config Firebase Admin
│   └── .env               # Variables d'environnement
│
└── adminfronten/          # Admin panel (à développer)
```

### 🎨 Technologies utilisées

**Frontend:**
- ⚛️ React 19
- ⚡ Vite
- 🎨 Tailwind CSS
- 🎭 DaisyUI
- 📦 Zustand (state management)
- 🔐 Firebase Auth

**Backend:**
- 🟩 Node.js
- 🚀 Express.js
- 🔥 Firebase Admin SDK
- 📦 Cors, Dotenv

### 🔐 Fonctionnalités d'Authentification

✅ **Inscription par email/mot de passe**
- Validation du formulaire
- Création d'utilisateur Firebase
- Sauvegarde des données utilisateur

✅ **Connexion par email/mot de passe**
- Authentification sécurisée
- Gestion d'erreurs

✅ **Connexion Google**
- OAuth 2.0 intégré
- Création automatique du profil

✅ **Persistance de session**
- Zustand avec localStorage
- Récupération automatique de l'état à l'actualisation

✅ **Routes protégées**
- ProtectedRoute pour les pages authentifiées
- Redirection automatique si non connecté

### 📝 Prochaines étapes

1. ✅ Configuration Firebase
2. ✅ Configuration Google OAuth
3. 🔄 Ajouter les produits et panier
4. 🔄 Intégrer les paiements
5. 🔄 Admin panel

### 🐛 Résolution des problèmes

**Erreur: "Cannot find module 'firebase'"**
```bash
npm install firebase
```

**Erreur CORS**
Vérifiez que `CORS_ORIGIN` dans `backend/.env` correspond à votre URL frontend.

**La connexion Google ne fonctionne pas**
Vérifiez que les URI autorisés sont correctement configurés dans Google Cloud Console.

---

✨ Bon développement ! N'hésitez pas à nous contacter pour des questions.
