#!/usr/bin/env bash
# Videoları scroll animasiyası üçün WebP kadrlara bölür.
# İstifadə: ./scripts/extract-frames.sh <videoların-qovluğu>
#
# Gözlənilən fayl adları (qovluqda olmalıdır):
#   *1008.mp4                         -> public/frames/hero      (steteskop)
#   *Doctor_making_presentation*.mp4  -> public/frames/services
#   *Female_doctor_looking*.mp4       -> public/frames/digital
#   *Three_doctors*.mp4               -> public/frames/team
#   *Female_doctor_nods*.mp4          -> public/frames/cta
set -euo pipefail

SRC="${1:?Videoların qovluğunu göstərin}"
OUT="$(cd "$(dirname "$0")/.." && pwd)/public/frames"
WIDTH=1600
QUALITY=72

extract() {
  local pattern="$1" name="$2" filter="$3"
  local input
  input="$(find "$SRC" -maxdepth 1 -name "$pattern" | head -n 1)"
  [[ -n "$input" ]] || { echo "Tapılmadı: $pattern" >&2; exit 1; }
  mkdir -p "$OUT/$name"
  find "$OUT/$name" -maxdepth 1 -name '*.webp' -delete
  ffmpeg -v error -y -i "$input" \
    -vf "${filter}scale=${WIDTH}:-2:flags=lanczos" \
    -fps_mode vfr -c:v libwebp -quality "$QUALITY" -compression_level 6 \
    "$OUT/$name/%04d.webp"
  echo "$name: $(find "$OUT/$name" -name '*.webp' | wc -l) kadr"
}

# Steteskop videosu: bütün kadrlar (30 fps), fon bir az ağardılır ki, səhifə ilə uyğunlaşsın.
extract '*1008.mp4' hero 'colorlevels=rimax=0.93:gimax=0.93:bimax=0.93,'
# Digər videolar 24 fps — hər ikinci kadr kifayətdir. Ağa yaxın fon tam ağa çəkilir,
# yoxsa sıxılma artefaktları ağ səhifənin fonunda kvadratlar kimi görünür.
WHITE="colorlevels=rimax=0.96:gimax=0.96:bimax=0.96,"
EVERY2="select='not(mod(n\,2))',"
extract '*Doctor_making_presentation*.mp4' services "$EVERY2$WHITE"
extract '*Female_doctor_looking*.mp4' digital "$EVERY2$WHITE"
extract '*Three_doctors*.mp4' team "$EVERY2$WHITE"
extract '*Female_doctor_nods*.mp4' cta "$EVERY2$WHITE"

# Həkim kartları üçün portretlər
TEAM="$(cd "$(dirname "$0")/.." && pwd)/public/team"
mkdir -p "$TEAM"
portrait() {
  local pattern="$1" time="$2" crop="$3" name="$4" input
  input="$(find "$SRC" -maxdepth 1 -name "$pattern" | head -n 1)"
  ffmpeg -v error -y -ss "$time" -i "$input" -frames:v 1 \
    -vf "crop=${crop},${WHITE}scale=480:600:flags=lanczos" -c:v libwebp -quality 82 "$TEAM/$name.webp"
}
portrait '*Three_doctors*.mp4' 4 416:520:688:0 elchin
portrait '*Female_doctor_nods*.mp4' 2 560:700:1220:0 leyla
portrait '*Three_doctors*.mp4' 4 424:530:1492:20 nermin
echo "portretlər hazırdır"
