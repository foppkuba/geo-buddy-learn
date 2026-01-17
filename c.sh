#!/bin/bash

PROJECT_DIR="/home/pawelbrzezinski2k4/projekt"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BACKEND_DIR="$PROJECT_DIR/backend"
PUBLIC_HTML="/var/www/html"

BACKEND_SERVICE="app-backend"

echo ">>> 1. Pobieram zmiany z Gita..."
cd "$FRONTEND_DIR"
git pull

echo ">>> 2. Buduję Frontend..."
cd "$FRONTEND_DIR"
bun install
bun run build

echo ">>> 3. Wystawiam Frontend na świat..."

sudo rm -rf "$PUBLIC_HTML"/*
sudo cp -r dist/* "$PUBLIC_HTML"/

echo ">>> 4. Restartuję Backend (jeśli były zmiany)..."
cd "$BACKEND_DIR"

# Przeładowanie Apache jest potrzebne po zmianach we frontendzie
sudo systemctl reload apache2

echo ">>> 4. Backend (Spring Boot)..."
cd "$BACKEND_DIR"

# Upewniamy się, że skrypt Mavena jest wykonywalny
chmod +x mvnw

echo "   -> Budowanie pliku .jar (Maven)..."
# clean package: czyści stare śmieci i buduje nowy plik
# -DskipTests: pomija testy, żeby było szybciej na serwerze
./mvnw clean package -DskipTests

# Sprawdzamy, czy Maven zakończył sukcesem (kod 0)
if [ $? -eq 0 ]; then
    echo "   -> Budowanie udane! Restartuję usługę Java..."
    
    # To jest ten moment, kiedy nowa wersja backendu wstaje
    sudo systemctl restart $BACKEND_SERVICE
    
    echo ">>> GOTOWE! Wszystko zaktualizowane."
else
    echo ">>> [BŁĄD] Budowanie backendu nie powiodło się! Nie restartuję serwera."
    exit 1
fi