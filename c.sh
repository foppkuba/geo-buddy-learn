#!/bin/bash

PROJECT_DIR="/home/pawelbrzezinski2k4/projekt"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BACKEND_DIR="$PROJECT_DIR/backend"
PUBLIC_HTML="/var/www/html"

echo ">>> 1. Pobieram zmiany z Gita..."
cd "$PROJECT_DIR"
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

sudo systemctl reload apache2

echo ">>> GOTOWE!"