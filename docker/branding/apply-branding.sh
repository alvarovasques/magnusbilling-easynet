#!/bin/sh
# =====================================================================
# Easynet Telefônica — aplica a Camada A de marca sobre o pacote oficial.
# Roda no BUILD (Dockerfile), logo após instalar o MagnusBilling8.
# Idempotente: pode rodar de novo sem duplicar injeções.
#
#   uso: apply-branding.sh <BRANDING_SRC_DIR> <APP_ROOT>
#   ex:  apply-branding.sh /opt/easynet-branding /var/www/html/mbilling
# =====================================================================
set -eu

SRC="${1:?dir de branding}"
APP="${2:?raiz do app}"
IMG="$APP/resources/images"
RES="$APP/resources"
IDX="$APP/index.html"

echo "[easynet] aplicando marca em $APP"

# 1) Assets de logo/favicon --------------------------------------------------
mkdir -p "$IMG"
cp -f "$SRC/easynet-logo.png"  "$IMG/easynet-logo.png"
cp -f "$SRC/easynet-mark.png"  "$IMG/easynet-mark.png"
cp -f "$SRC/easynet-white.png" "$IMG/easynet-white.png"
# substitui os originais usados pelo app (logo do topo, splash, favicon)
cp -f "$SRC/logo.png"     "$IMG/logo.png"
cp -f "$SRC/loading.gif"  "$IMG/loading.gif"
cp -f "$SRC/easynet.ico"  "$IMG/logo.ico"

# 2) CSS/JS de override ------------------------------------------------------
cp -f "$SRC/easynet.css" "$RES/easynet.css"
cp -f "$SRC/easynet.js"  "$RES/easynet.js"

# 3) index.html: título, splash e injeção do CSS/JS -------------------------
if [ -f "$IDX" ]; then
  # título da aba
  sed -i 's#<title>MagnusBilling</title>#<title>Easynet Telefônica</title>#' "$IDX"
  # nome no splash (fallback) e submensagem
  sed -i "s#t('MagnusBilling System')#t('Easynet Telefônica')#g" "$IDX"
  sed -i "s#'Voip System'#'Sistema de Telefonia'#g" "$IDX"

  # injeta <link>+<script> uma única vez (marcador ez-branding)
  if ! grep -q "ez-branding" "$IDX"; then
    sed -i 's#</head>#    <link rel="stylesheet" href="resources/easynet.css" data-ez-branding="1" />\n    <script src="resources/easynet.js" data-ez-branding="1"></script>\n</head>#' "$IDX"
  fi
  echo "[easynet] index.html marcado."
else
  echo "[easynet] AVISO: $IDX não encontrado; pulei injeção de HTML."
fi

echo "[easynet] marca aplicada."
