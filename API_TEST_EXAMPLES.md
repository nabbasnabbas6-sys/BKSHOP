# 🧪 Exemples de Requêtes API

Vous pouvez tester l'API avec cURL, Postman, ou Thunder Client.

## 📊 Base URL
```
http://localhost:5000
```

---

## 🔐 Routes d'Authentification

### 1️⃣ Inscription (Sign Up)

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!",
    "displayName": "John Doe"
  }'
```

**Réponse:**
```json
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "uid": "abc123xyz",
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2️⃣ Connexion (Login)

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

**Réponse:**
```json
{
  "success": true,
  "uid": "abc123xyz",
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3️⃣ Authentification Google

**Note:** Le token idToken provient du frontend après signInWithPopup()

**cURL:**
```bash
curl -X POST http://localhost:5000/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{
    "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE4YTM2ZWY1YWZmODg3MjJjYzE3YjA2YjAxOGI4NmY5ZTcyODQ5OGUiLCJ0eXAiOiJKV1QifQ..."
  }'
```

**Réponse:**
```json
{
  "success": true,
  "uid": "google_user_id",
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Compte créé avec succès"
}
```

---

### 4️⃣ Récupérer les Infos Utilisateur

**cURL:**
```bash
curl -X GET http://localhost:5000/api/auth/user/abc123xyz \
  -H "Content-Type: application/json"
```

**Réponse:**
```json
{
  "email": "john@example.com",
  "displayName": "John Doe",
  "createdAt": {
    "_seconds": 1702300800,
    "_nanoseconds": 0
  },
  "photoURL": null
}
```

---

### 5️⃣ Health Check

**cURL:**
```bash
curl http://localhost:5000/api/health
```

**Réponse:**
```json
{
  "status": "OK"
}
```

---

## 🧑‍💻 Utilisation dans le Frontend

### Exemple avec fetch():
```javascript
// Sign Up
const response = await fetch('http://localhost:5000/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePass123!',
    displayName: 'John Doe'
  })
})

const data = await response.json()
console.log(data.token) // Utiliser le token pour la session
```

### Exemple avec le service authApi:
```javascript
import authApi from '@/services/authApi'

// Sign Up
const result = await authApi.signup(
  'john@example.com',
  'SecurePass123!',
  'John Doe'
)

// Login
const result = await authApi.login('john@example.com')

// Google Auth
const result = await authApi.googleAuth(idToken)

// Get User
const user = await authApi.getUser(uid)
```

---

## 🐛 Messages d'Erreur Courants

### Erreur 400: Email existant
```json
{
  "success": false,
  "error": "The email address is already in use by another account."
}
```

**Solution:** Utilisez un autre email ou connectez-vous si vous avez déjà un compte.

---

### Erreur 400: Mot de passe faible
```json
{
  "success": false,
  "error": "Password should be at least 6 characters"
}
```

**Solution:** Utilisez un mot de passe plus fort (8+ caractères).

---

### Erreur 400: Token Google invalide
```json
{
  "success": false,
  "error": "Illegal Argument Error"
}
```

**Solution:** Vérifiez que le token Google est valide et n'a pas expiré.

---

### Erreur 404: Utilisateur non trouvé
```json
{
  "error": "Utilisateur non trouvé"
}
```

**Solution:** Vérifiez l'UID ou créez un nouvel utilisateur.

---

## 📮 Importer dans Postman

Créez une nouvelle collection avec ces requêtes:

```json
{
  "info": {
    "name": "BK Shop API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Sign Up",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/auth/signup",
        "body": {
          "mode": "raw",
          "raw": "{\"email\": \"test@example.com\", \"password\": \"SecurePass123!\", \"displayName\": \"Test User\"}"
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "url": "http://localhost:5000/api/auth/login",
        "body": {
          "mode": "raw",
          "raw": "{\"email\": \"test@example.com\"}"
        }
      }
    },
    {
      "name": "Health",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/health"
      }
    }
  ]
}
```

---

## ✅ Checklist de Test

- [ ] Inscription avec email valide
- [ ] Connexion avec email/mot de passe
- [ ] Connexion Google
- [ ] Récupération des infos utilisateur
- [ ] Messages d'erreur appropriés
- [ ] Health check fonctionne

---

✨ Vous êtes prêt à tester votre API!
