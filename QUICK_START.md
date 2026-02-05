# 🚀 Guide de Démarrage Rapide - BK Shop

## Étape 1: Configuration Firebase

### Sur Firebase Console:
1. Créez un nouveau projet: https://console.firebase.google.com/
2. Activez **Authentication** > Méthode de connexion:
   - ✅ Email/Mot de passe
   - ✅ Google (optionnel)
3. Activez **Firestore Database**
4. Créez une collection `users` avec des règles:

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

## Étape 2: Récupérer les Identifiants Firebase

### Pour le Frontend:
1. Allez sur Firebase > Paramètres du Projet
2. Copiez votre configuration web
3. Collez les valeurs dans `userfrontend/.env`

### Pour le Backend:
1. Allez sur Firebase > Paramètres du Projet > Comptes de Service
2. Cliquez "Générer nouvelle clé privée"
3. Collez les valeurs dans `backend/.env`

## Étape 3: Configuration Google OAuth (Optionnel)

1. Allez sur https://console.cloud.google.com/
2. Sélectionnez votre projet Firebase
3. Allez sur "APIs et services" > "Identifiants"
4. Créez un nouvel "ID client OAuth 2.0 - Application Web"
5. Ajoutez les origines autorisées:
   ```
   http://localhost:5173
   http://localhost:5173/
   http://localhost:5173/signup
   http://localhost:5173/login
   ```
6. Sauvegardez l'ID client

## Étape 4: Lancer le Projet

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd userfrontend
npm run dev
```

### Accédez à:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

## ✅ Test de l'Authentification

### Créer un compte:
1. Allez sur http://localhost:5173/signup
2. Remplissez le formulaire
3. Vous serez redirigé vers la page d'accueil

### Tester la connexion Google:
1. Cliquez sur "Se connecter avec Google"
2. Sélectionnez un compte Google
3. Vous serez connecté automatiquement

### Déconnexion:
1. Cliquez sur l'avatar en haut à droite
2. Cliquez "Déconnexion"

## 🐛 Dépannage Rapide

| Erreur | Solution |
|--------|----------|
| CORS Error | Vérifiez `CORS_ORIGIN` dans `backend/.env` |
| Firebase Unauthorized | Vérifiez la configuration Firebase |
| Google Auth échoue | Vérifiez les URI autorisés dans Google Cloud |
| Page blanche au chargement | Vérifiez la console pour les erreurs |

## 📚 Documentation Utile

- [Firebase Docs](https://firebase.google.com/docs)
- [React Router](https://reactrouter.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

---

✨ Vous êtes prêt ! Commencez à développer votre e-commerce.
