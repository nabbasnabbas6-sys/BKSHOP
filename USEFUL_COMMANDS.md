# 💻 Commandes Utiles

## 🚀 Démarrage Rapide

### Windows (PowerShell)
```powershell
# Démarrer frontend + backend en une commande
powershell -ExecutionPolicy Bypass -File start.ps1

# Ou manuellement:

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd userfrontend
npm run dev
```

### Mac/Linux (Bash)
```bash
# Démarrer le script
chmod +x start.sh
./start.sh

# Ou manuellement:

# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd userfrontend
npm run dev
```

---

## 🔧 Commandes Disponibles

### Frontend
```bash
cd userfrontend

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la build de production
npm run preview

# Linter le code
npm run lint

# Installer une nouvelle dépendance
npm install package-name

# Mettre à jour les dépendances
npm update
```

### Backend
```bash
cd backend

# Démarrer avec nodemon (développement)
npm run dev

# Démarrer en production
npm start

# Installer une nouvelle dépendance
npm install package-name

# Vérifier les dépendances obsolètes
npm outdated
```

---

## 🧪 Tester l'API

### Vérifier que le backend est en vie
```bash
curl http://localhost:5000/api/health
```

### Inscription
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "displayName": "Test User"
  }'
```

### Connexion
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Récupérer un utilisateur
```bash
curl http://localhost:5000/api/auth/user/USER_ID
```

---

## 🐛 Dépannage

### Le port est déjà utilisé

#### Windows (PowerShell)
```powershell
# Trouver le processus qui utilise le port
Get-NetTCPConnection -LocalPort 5000

# Tuer le processus
Stop-Process -Id PID -Force
```

#### Mac/Linux
```bash
# Trouver le processus
lsof -i :5000
lsof -i :5173

# Tuer le processus
kill -9 PID
```

### Réinstaller les dépendances
```bash
# Frontend
cd userfrontend
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Effacer le cache Vite
```bash
cd userfrontend
rm -rf .vite node_modules/.vite
npm run dev
```

### Lancer à nouveau depuis zéro
```bash
# Arrêter les serveurs (Ctrl+C dans les terminals)

# Réinstaller tout
cd backend && npm install && cd ..
cd userfrontend && npm install && cd ..

# Lancer
cd backend && npm run dev &  # Terminal 1
cd userfrontend && npm run dev  # Terminal 2
```

---

## 📦 Gérer les Dépendances

### Vérifier les versions
```bash
npm list
npm outdated
```

### Installer une version spécifique
```bash
npm install package-name@1.2.3
```

### Mettre à jour une dépendance
```bash
npm update package-name
```

### Supprimer une dépendance
```bash
npm uninstall package-name
```

### Installer les devDependencies
```bash
npm install --save-dev package-name
```

---

## 🔐 Variables d'Environnement

### Frontend - `userfrontend/.env`
```env
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Backend - `backend/.env`
```env
PORT=5000
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY=your_key_here
FIREBASE_CLIENT_EMAIL=your_email
CORS_ORIGIN=http://localhost:5173
```

---

## 🌐 Accès aux Services

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:5000 | 5000 |
| Health Check | http://localhost:5000/api/health | - |

---

## 📝 Commandes Git

### Initialiser un repository
```bash
git init
git add .
git commit -m "Initial commit"
```

### Ajouter un remote
```bash
git remote add origin https://github.com/username/repo.git
```

### Push vers GitHub
```bash
git push -u origin main
```

### Créer une branche
```bash
git checkout -b feature/auth
```

### Commiter les changements
```bash
git add .
git commit -m "Feat: add authentication"
git push origin feature/auth
```

---

## 🚀 Déploiement

### Construire pour la production
```bash
# Frontend
cd userfrontend
npm run build
# Crée un dossier 'dist'

# Backend
# Modifier .env pour la production
# Ajouter à package.json:
# "engines": { "node": "18.x" }
```

### Déployer sur Vercel (Frontend)
```bash
npm install -g vercel
vercel
```

### Déployer sur Railway (Backend)
```bash
npm install -g railway
railway link
railway up
```

### Déployer sur Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 📊 Debugging

### Logs Frontend (Console)
```javascript
// Dans le navigateur
F12  // Ouvrir DevTools
Console  // Voir les logs

// Dans le code
console.log('Debug:', variable)
console.error('Error:', error)
console.table(data)
```

### Logs Backend (Terminal)
```javascript
// Dans server.js
console.log('Server started')
console.error('Error:', error)

// Utiliser un logger
npm install winston
```

### Network Inspector
```
DevTools > Network
Voir les requêtes HTTP
Vérifier les réponses
Checker les headers
```

---

## ⚡ Performance

### Optimiser le Bundle Frontend
```bash
npm install --save-dev @vitejs/plugin-visualize
npm run build -- --analyze
```

### Vérifier les perfs
```bash
# Lighthouse dans Chrome
DevTools > Lighthouse

# Utiliser WebPageTest
https://www.webpagetest.org
```

---

## 🧹 Nettoyage

### Nettoyer les logs
```bash
# Terminal
clear  # Linux/Mac
cls    # Windows

# PowerShell
Clear-Host
```

### Archiver l'ancien code
```bash
git tag -a v1.0 -m "Version 1.0"
git push origin v1.0
```

---

## 🎯 Workflow Développement

```
1. Créer une branche
   git checkout -b feature/nouvelle-feature

2. Développer et tester
   npm run dev

3. Tester les changements
   http://localhost:5173 / http://localhost:5000

4. Commiter
   git add .
   git commit -m "Feat: description"

5. Push
   git push origin feature/nouvelle-feature

6. Pull Request sur GitHub
   Reviewer ➜ Merge

7. Déployer
   Railway/Vercel automatique ou manuel
```

---

## 📚 Ressources Additionnelles

- [NPM Scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts)
- [Vite CLI](https://vitejs.dev/guide/cli.html)
- [Express API](https://expressjs.com/api.html)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Git Cheatsheet](https://github.github.com/training-kit/downloads/github-git-cheat-sheet/)

---

✨ Toutes les commandes les plus utiles en un seul endroit!
