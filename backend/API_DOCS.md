# 📚 Documentation API Backend

## URL de Base
```
http://localhost:5000
```

## 🔐 Authentification

### 1. Inscription (Sign Up)
**POST** `/api/auth/signup`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "displayName": "John Doe"
}
```

**Réponse (201):**
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "uid": "user_id",
  "token": "custom_token"
}
```

**Erreurs:**
- `400`: Email, password ou displayName manquants
- `400`: L'utilisateur existe déjà

---

### 2. Connexion (Login)
**POST** `/api/auth/login`

**Body:**
```json
{
  "email": "user@example.com"
}
```

**Réponse (200):**
```json
{
  "success": true,
  "uid": "user_id",
  "token": "custom_token"
}
```

**Erreurs:**
- `400`: Utilisateur non trouvé
- `400`: Identifiants invalides

---

### 3. Authentification Google
**POST** `/api/auth/google`

**Body:**
```json
{
  "idToken": "google_id_token"
}
```

**Réponse (200):**
```json
{
  "success": true,
  "uid": "user_id",
  "token": "custom_token",
  "message": "Connecté avec succès" ou "Compte créé avec succès"
}
```

**Erreurs:**
- `400`: Token Google invalide

---

### 4. Obtenir les Informations Utilisateur
**GET** `/api/auth/user/:uid`

**Réponse (200):**
```json
{
  "email": "user@example.com",
  "displayName": "John Doe",
  "createdAt": "2024-01-01T00:00:00Z",
  "photoURL": "https://..."
}
```

**Erreurs:**
- `404`: Utilisateur non trouvé
- `400`: Erreur serveur

---

### 5. Vérification de Santé
**GET** `/api/health`

**Réponse (200):**
```json
{
  "status": "OK"
}
```

---

## 📋 Codes HTTP

| Code | Signification |
|------|---------------|
| 200 | Succès |
| 201 | Créé |
| 400 | Erreur requête |
| 404 | Non trouvé |
| 500 | Erreur serveur |

---

## 🔄 Flux d'Authentification

### Sign Up:
1. Frontend envoie `/auth/signup`
2. Backend crée l'utilisateur Firebase
3. Backend sauvegarde dans Firestore
4. Backend retourne le custom token
5. Frontend utilise le token pour la session

### Sign In:
1. Frontend envoie `/auth/login`
2. Backend crée un custom token
3. Frontend utilise le token

### Google Auth:
1. Frontend récupère le Google idToken
2. Frontend envoie `/auth/google`
3. Backend vérifie le token Google
4. Backend crée/récupère l'utilisateur
5. Backend retourne le custom token

---

## 🧪 Tester avec cURL

### Inscription:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "displayName": "Test User"
  }'
```

### Connexion:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### Santé:
```bash
curl http://localhost:5000/api/health
```

---

## 🔒 Règles de Sécurité Firebase

**Authentication:**
- Authentification requise pour toutes les routes sauf `/health`

**Firestore:**
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

---

## 🚀 Déploiement

### Variables d'environnement requises:
```env
PORT=5000
FIREBASE_PROJECT_ID=your_project
FIREBASE_PRIVATE_KEY=your_key
FIREBASE_CLIENT_EMAIL=your_email
CORS_ORIGIN=https://yourdomain.com
```

### Déployer sur Heroku/Railway:
```bash
git push heroku main
```

---

✨ API complètement documentée !
