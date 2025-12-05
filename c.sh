#!/bin/bash
# Skrypt do automatycznego pobierania zmian, instalowania zależności Bun i budowania projektu.

echo "--- START: Proces aktualizacji i budowania projektu ---"

# Ustawienie ścieżki do binariów Bun, aby skrypt działał niezależnie od ścieżki PATH
# Ścieżka podana przez użytkownika: /home/pawelbrzezinski2k4/.bun/bin/bun
BUN_BIN="/home/pawelbrzezinski2k4/.bun/bin/bun"

# 1. Pobierz zmiany w kodzie (git pull)
echo ""
echo ">>> KROK 1/3: Pobieram najnowsze zmiany z repozytorium..."
git pull

# Sprawdzenie, czy git pull się powiódł
if [ $? -ne 0 ]; then
    echo "[BŁĄD] Pobieranie zmian (git pull) nie powiodło się. Przerywam skrypt."
    exit 1
fi

# 2. (Opcjonalnie) Sprawdź, czy doszły nowe biblioteki (bun install)
echo ""
echo ">>> KROK 2/3: Sprawdzam i instaluję zależności za pomocą Bun..."

# Sprawdzamy, czy plik binarny Bun istnieje przed próbą użycia
if [ ! -f "$BUN_BIN" ]; then
    echo "[OSTRZEŻENIE] Plik binarny Bun ($BUN_BIN) nie został znaleziony. Próbuję użyć 'bun' z PATH."
    BUN_BIN="bun"
fi

"$BUN_BIN" install

# Sprawdzenie, czy bun install się powiódł
if [ $? -ne 0 ]; then
    echo "[BŁĄD] Instalacja zależności (bun install) nie powiodła się. Przerywam skrypt."
    exit 1
fi

# 3. Zbuduj nową wersję (bun run build)
echo ""
echo ">>> KROK 3/3: Buduję nową wersję projektu (bun run build)..."
"$BUN_BIN" run build

# Sprawdzenie, czy bun run build się powiódł
if [ $? -eq 0 ]; then
    echo ""
    echo "--- KONIEC: Projekt pomyślnie zaktualizowany i zbudowany! ---"
else
    echo ""
    echo "[BŁĄD KRYTYCZNY] Budowanie projektu (bun run build) nie powiodło się."
    exit 1
fi

exit 0