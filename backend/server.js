const express = require('express');
const cors = require('cors');
require('dotenv').config();
const admin = require('./firebase');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// Route pour l'inscription
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !password || !displayName) {
      return res.status(400).json({ error: 'Email, password et displayName sont requis' });
    }

    // Créer l'utilisateur avec Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    // Créer un document utilisateur dans Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email,
      displayName,
      createdAt: new Date(),
      photoURL: null,
    });

    // Générer un token d'authentification
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      uid: userRecord.uid,
      token: customToken,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Route pour la connexion
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email } = req.body;

    // Récupérer les informations de l'utilisateur
    const userRecord = await admin.auth().getUserByEmail(email);

    // Générer un token d'authentification
    const customToken = await admin.auth().createCustomToken(userRecord.uid);

    res.json({
      success: true,
      uid: userRecord.uid,
      token: customToken,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Route pour la connexion Google
app.post('/api/auth/google', async (req, res) => {
  try {
    const { idToken } = req.body;

    // Vérifier le token Google
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const displayName = decodedToken.name;

    // Vérifier si l'utilisateur existe
    const userDoc = await admin.firestore().collection('users').doc(uid).get();

    if (!userDoc.exists) {
      // Créer un nouveau document utilisateur
      await admin.firestore().collection('users').doc(uid).set({
        email,
        displayName,
        createdAt: new Date(),
        photoURL: decodedToken.picture || null,
      });
    }

    // Générer un token personnalisé
    const customToken = await admin.auth().createCustomToken(uid);

    res.json({
      success: true,
      uid,
      token: customToken,
      message: userDoc.exists ? 'Connecté avec succès' : 'Compte créé avec succès',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Route pour obtenir les informations de l'utilisateur
app.get('/api/auth/user/:uid', async (req, res) => {
  try {
    const { uid } = req.params;

    const userDoc = await admin.firestore().collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(userDoc.data());
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend démarré sur le port ${PORT}`);
});
