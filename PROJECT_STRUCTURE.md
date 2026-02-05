# 📂 Structure Complète du Projet BK Shop

```
BK_Shop/
│
├── 📄 README.md                      # Documentation principale du projet
├── 📄 QUICK_START.md                 # Guide de démarrage rapide (3 étapes)
├── 📄 SETUP_SUMMARY.md               # Résumé de la configuration complète
├── 📄 CONFIGURATION_CHECKLIST.md     # Checklist pour configurer Firebase & Google OAuth
├── 📄 API_TEST_EXAMPLES.md           # Exemples de requêtes cURL/Postman
├── 📄 .gitignore                     # Fichiers à ignorer dans git
├── 📄 start.sh                       # Script de démarrage (Linux/Mac)
├── 📄 start.ps1                      # Script de démarrage (Windows)
│
├── 📁 userfrontend/                  # 🎨 Frontend React + Vite
│   ├── 📄 package.json               # Dépendances & scripts
│   ├── 📄 vite.config.ts             # Configuration Vite
│   ├── 📄 tsconfig.json              # Configuration TypeScript
│   ├── 📄 tailwind.config.js          # Configuration Tailwind CSS
│   ├── 📄 postcss.config.js           # Configuration PostCSS
│   ├── 📄 .env                       # Variables d'environnement
│   ├── 📄 index.html                 # HTML d'entrée
│   │
│   └── 📁 src/
│       ├── 📄 main.tsx               # Point d'entrée React
│       ├── 📄 App.tsx                # Composant root + Routes
│       ├── 📄 index.css              # Styles Tailwind + reset
│       ├── 📄 firebase.js            # Configuration Firebase
│       │
│       ├── 📁 pages/                 # Pages (routes)
│       │   ├── 📄 SignUp.jsx         # Page d'inscription
│       │   ├── 📄 Login.jsx          # Page de connexion
│       │   └── 📄 Home.jsx           # Page d'accueil (protégée)
│       │
│       ├── 📁 components/            # Composants réutilisables
│       │   └── 📄 ProtectedRoute.jsx # Composant de route protégée
│       │
│       ├── 📁 store/                 # État global (Zustand)
│       │   └── 📄 authStore.js       # Store d'authentification
│       │
│       ├── 📁 hooks/                 # Hooks personnalisés
│       │   └── 📄 useAuth.js         # Hooks d'authentification
│       │
│       ├── 📁 services/              # Services API
│       │   └── 📄 authApi.js         # Appels API d'authentification
│       │
│       ├── 📁 utils/                 # Utilitaires
│       │   └── 📄 validation.js      # Fonctions de validation
│       │
│       └── 📁 assets/                # Images, icônes, etc.
│
├── 📁 backend/                       # 🚀 Backend Node.js + Express
│   ├── 📄 package.json               # Dépendances & scripts
│   ├── 📄 server.js                  # Serveur Express principal
│   ├── 📄 firebase.js                # Configuration Firebase Admin
│   ├── 📄 .env                       # Variables d'environnement
│   ├── 📄 .gitignore                 # Fichiers à ignorer
│   ├── 📄 API_DOCS.md                # Documentation de l'API
│   │
│   └── Routes d'authentification:
│       ├── POST /api/auth/signup     # Créer un compte
│       ├── POST /api/auth/login      # Se connecter
│       ├── POST /api/auth/google     # Connexion Google
│       ├── GET  /api/auth/user/:uid  # Récupérer l'utilisateur
│       └── GET  /api/health          # Vérification de santé
│
└── 📁 adminfronten/                  # 👨‍💼 Admin Panel (à développer)
    └── (Structure à définir)
```

---

## 📊 Architecture Globale

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (React)                  │
│         http://localhost:5173                      │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │            React Router (Routes)             │  │
│  │  - SignUp  ─┐                                │  │
│  │  - Login   ─┤─► ProtectedRoute              │  │
│  │  - Home    ─┘                                │  │
│  └──────────────────────────────────────────────┘  │
│                      ▼                              │
│  ┌──────────────────────────────────────────────┐  │
│  │       Zustand Auth Store (State)             │  │
│  │  - user, token, loading, error               │  │
│  │  - signUp, signIn, signInWithGoogle          │  │
│  │  - Persistence avec localStorage             │  │
│  └──────────────────────────────────────────────┘  │
│                      ▼                              │
│  ┌──────────────────────────────────────────────┐  │
│  │         Firebase Client SDK                  │  │
│  │  - Authentication                            │  │
│  │  - Google OAuth Provider                     │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                     ▼ (HTTP)
         ┌─────────────────────────┐
         │   Backend API Server    │
         │ http://localhost:5000   │
         └─────────────────────────┘
                     ▼
┌─────────────────────────────────────────────────────┐
│              BACKEND (Node + Express)               │
│         http://localhost:5000                      │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │       Authentication Routes                  │  │
│  │  - POST   /api/auth/signup                   │  │
│  │  - POST   /api/auth/login                    │  │
│  │  - POST   /api/auth/google                   │  │
│  │  - GET    /api/auth/user/:uid                │  │
│  │  - GET    /api/health                        │  │
│  └──────────────────────────────────────────────┘  │
│                      ▼                              │
│  ┌──────────────────────────────────────────────┐  │
│  │     Firebase Admin SDK                       │  │
│  │  - Authentification                          │  │
│  │  - Firestore Database                        │  │
│  │  - Token verification                        │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                     ▼ (Cloud)
         ┌─────────────────────────┐
         │    FIREBASE SERVICES    │
         │ (Cloud Authentication & │
         │ Firestore Database)     │
         └─────────────────────────┘
```

---

## 🔄 Flux d'Authentification

### Inscription (Sign Up)
```
User fills form
      ▼
Submit to /signup
      ▼
Backend creates Firebase user
      ▼
Backend saves to Firestore
      ▼
Backend returns custom token
      ▼
Frontend stores token + user in Zustand
      ▼
Redirect to Home page
```

### Connexion (Login)
```
User enters email
      ▼
Submit to /login
      ▼
Backend creates custom token
      ▼
Frontend uses token for session
      ▼
Redirect to Home page
```

### Connexion Google
```
User clicks "Sign in with Google"
      ▼
Firebase Google popup
      ▼
Frontend gets idToken
      ▼
Send idToken to /auth/google
      ▼
Backend verifies with Firebase
      ▼
Backend creates/retrieves user
      ▼
Backend returns custom token
      ▼
Frontend stores session
      ▼
Redirect to Home page
```

---

## 🎯 Dossiers Clés

### `/userfrontend/src/pages/`
- **Objectif:** Pages principales de l'application
- **Contient:** SignUp, Login, Home
- **Accès:** Via React Router

### `/userfrontend/src/store/`
- **Objectif:** Gestion d'état global avec Zustand
- **Contient:** authStore (authentification)
- **Utilisation:** useAuthStore() dans les composants

### `/userfrontend/src/hooks/`
- **Objectif:** Hooks personnalisés réutilisables
- **Contient:** useAuth, useRequireAuth, useLogout
- **Utilisation:** Dans les composants pour accéder à l'authentification

### `/userfrontend/src/services/`
- **Objectif:** Couche d'abstraction pour les appels API
- **Contient:** authApi (Sign up, Login, Google, etc.)
- **Utilisation:** Dans le store Zustand

### `/userfrontend/src/utils/`
- **Objectif:** Fonctions utilitaires
- **Contient:** validation.js (email, password, etc.)
- **Utilisation:** Dans les formulaires et hooks

### `/backend/`
- **Objectif:** Serveur API principal
- **Contient:** Routes d'authentification, Firebase Admin
- **Routes:** /api/auth/*, /api/health

---

## 💾 Fichiers de Configuration

| Fichier | Objectif | Environnement |
|---------|----------|---|
| `.env` | Variables d'environnement | Tous |
| `vite.config.ts` | Configuration Vite | Frontend |
| `tsconfig.json` | Configuration TypeScript | Frontend |
| `tailwind.config.js` | Configuration Tailwind | Frontend |
| `postcss.config.js` | Configuration PostCSS | Frontend |
| `package.json` | Dépendances & scripts | Tous |

---

## 🔐 Fichiers Sensibles

⚠️ **NE PAS COMMITER:**
- `.env` (contient des clés sensibles)
- `serviceAccountKey.json` (clé Firebase privée)
- `node_modules/`

✅ **COMMITER:**
- `.env.example` (template)
- Code source
- Configuration publique
- Documentation

---

## 📦 Dépendances Principales

### Frontend
- **React 19** - Framework UI
- **Vite** - Build tool
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **DaisyUI** - Composants UI
- **Zustand** - State management
- **Firebase** - Authentification
- **React Router** - Routage

### Backend
- **Node.js** - Runtime
- **Express** - Framework HTTP
- **Firebase Admin** - Admin SDK
- **CORS** - Sécurité cross-origin
- **Dotenv** - Variables d'environnement
- **Nodemon** - Développement

---

## 🎨 Design System

**Tailwind CSS + DaisyUI:**
- Colors: Système de couleurs DaisyUI
- Typography: Tailwind defaults
- Spacing: Scale Tailwind (4px base)
- Components: DaisyUI (btn, form, alert, etc.)

---

## 📱 Points d'Accès

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend | http://localhost:5000 | 5000 |
| Firebase | Console.firebase.google.com | - |
| Google Cloud | console.cloud.google.com | - |

---

✨ Votre projet BK Shop est complètement structuré et prêt pour le développement!
