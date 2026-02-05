#!/bin/bash

# Script de démarrage pour BK Shop
# Démarre le backend et le frontend en parallèle

echo "🛍️  Démarrage de BK Shop..."
echo ""

# Afficher les instructions
echo "📝 Instructions:"
echo "1. Assurez-vous que les variables d'environnement sont configurées:"
echo "   - userfrontend/.env"
echo "   - backend/.env"
echo ""

# Démarrer le backend en arrière-plan
echo "🚀 Démarrage du backend sur le port 5000..."
cd backend
npm run dev &
BACKEND_PID=$!

# Attendre que le backend soit prêt
sleep 3

# Démarrer le frontend
echo "🚀 Démarrage du frontend sur le port 5173..."
cd ../userfrontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Applications démarrées!"
echo "📍 Frontend: http://localhost:5173"
echo "📍 Backend: http://localhost:5000"
echo "📍 API Health: http://localhost:5000/api/health"
echo ""
echo "💡 Appuyez sur Ctrl+C pour arrêter"

# Attendre les deux processus
wait $BACKEND_PID $FRONTEND_PID
