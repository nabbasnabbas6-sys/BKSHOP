# Script de démarrage pour BK Shop (Windows)
# Exécutez avec: powershell -ExecutionPolicy Bypass -File start.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "🛍️  Démarrage de BK Shop" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier la configuration
Write-Host "📝 Vérification de la configuration..." -ForegroundColor Yellow

if (-not (Test-Path "backend\.env")) {
    Write-Host "⚠️  backend\.env non trouvé. Assurez-vous que les variables sont configurées." -ForegroundColor Red
}

if (-not (Test-Path "userfrontend\.env")) {
    Write-Host "⚠️  userfrontend\.env non trouvé. Assurez-vous que les variables sont configurées." -ForegroundColor Red
}

Write-Host "✅ Configuration vérifiée" -ForegroundColor Green
Write-Host ""

# Démarrer le backend
Write-Host "🚀 Démarrage du backend sur le port 5000..." -ForegroundColor Yellow
Push-Location ".\backend"
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev"
Pop-Location

# Attendre que le backend soit prêt
Start-Sleep -Seconds 3

# Démarrer le frontend
Write-Host "🚀 Démarrage du frontend sur le port 5173..." -ForegroundColor Yellow
Push-Location ".\userfrontend"
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run", "dev"
Pop-Location

# Afficher les URLs
Write-Host ""
Write-Host "✅ Applications démarrées!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "📍 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "📍 API Health: http://localhost:5000/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Ouvrir le navigateur avec:" -ForegroundColor Yellow
Write-Host "   start http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "🛑 Pour arrêter les serveurs, fermez les fenêtres ou appuyez sur Ctrl+C" -ForegroundColor Yellow

# Garder la fenêtre ouverte
Read-Host "Appuyez sur Entrée pour continuer..."
