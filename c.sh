#!/bin/bash

# --- KONFIGURACJA ---
PROJECT_DIR="/home/pawelbrzezinski2k4/projekt"
FRONTEND_DIR="$PROJECT_DIR/frontend"
BACKEND_DIR="$PROJECT_DIR/backend"
PUBLIC_HTML="/var/www/html"
BACKEND_SERVICE="app-backend"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}>>> START DEPLOYU...${NC}"

# ==========================================
# 1. FRONTEND
# ==========================================
cd "$FRONTEND_DIR"

# Pobieramy argumenty przekazane przez skrypt nadrzędny (jeśli istnieją)
EXTERNAL_OLD_HASH=$1
EXTERNAL_NEW_HASH=$2

if [ -n "$EXTERNAL_OLD_HASH" ]; then
    # SCENARIUSZ A: Skrypt został uruchomiony przez wrapper
    echo -e "${YELLOW}>>> [Frontend] Skrypt nadrzędny już zaktualizował kod.${NC}"
    OLD_HASH="$EXTERNAL_OLD_HASH"
    NEW_HASH="$EXTERNAL_NEW_HASH"
else
    # SCENARIUSZ B: Skrypt uruchomiony ręcznie (./c.sh)
    echo -e "${YELLOW}>>> [Frontend] Sprawdzam zmiany w GIT (tryb ręczny)...${NC}"
    OLD_HASH=$(git rev-parse HEAD)
    git pull
    NEW_HASH=$(git rev-parse HEAD)
fi

# Porównanie hashów (działa dla obu scenariuszy tak samo)
if [ "$OLD_HASH" != "$NEW_HASH" ] || [ "$3" == "--force" ]; then
    echo -e "${GREEN}>>> [Frontend] Wykryto zmiany ($OLD_HASH -> $NEW_HASH)! Budowanie...${NC}"
    
    bun install
    bun run build

    echo -e "${GREEN}>>> [Frontend] Podmieniam pliki na serwerze...${NC}"
    sudo rsync -av --delete dist/ "$PUBLIC_HTML"/
else
    echo -e "${GREEN}>>> [Frontend] Brak zmian w kodzie. Pomijam budowanie.${NC}"
fi

# ==========================================
# 2. BACKEND
# ==========================================
cd "$BACKEND_DIR"
echo -e "${YELLOW}>>> [Backend] Sprawdzam zmiany w GIT...${NC}"

OLD_HASH=$(git rev-parse HEAD)
git pull
NEW_HASH=$(git rev-parse HEAD)

if [ "$OLD_HASH" != "$NEW_HASH" ] || [ "$1" == "--force" ]; then
    echo -e "${GREEN}>>> [Backend] Wykryto zmiany! Budowanie .jar...${NC}"
    
    chmod +x mvnw
    ./mvnw clean package -DskipTests

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}>>> [Backend] Budowanie udane! Restartuję usługę...${NC}"
        sudo systemctl restart $BACKEND_SERVICE
    else
        echo -e "${RED}>>> [BŁĄD] Kompilacja Backend nieudana! Anuluję restart.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}>>> [Backend] Brak zmian. Pomijam budowanie i restart.${NC}"
fi

# ==========================================
# 3. FINALIZACJA
# ==========================================
sudo systemctl reload apache2

echo -e "${GREEN}>>> GOTOWE! Deploy zakończony pomyślnie.${NC}"