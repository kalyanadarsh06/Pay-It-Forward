#!/bin/zsh
# usage: capture.sh  — renders settled (?still=1) captures of every tour step + the ledger
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
OUT="$ROOT/.impeccable/review"
URL="file://$ROOT/prototype/index.html"
shot() { "$CH" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=7000 --window-size=$2 --screenshot="$OUT/$1" "$3" >/dev/null 2>&1; }
for n in 0 1 2 3 4 5 6; do shot "tour-$n-desktop.png" 1440,1000 "$URL?tour=$n&still=1"; done
shot "desktop.png" 1440,4400 "$URL?ledger&still=1"
# phone: Chrome headless won't go below 500px wide, so render through a 390px iframe host
for spec in "tour-1:$URL?tour=1&still=1:1900" "tour-2:$URL?tour=2&still=1:1700" "tour-6:$URL?tour=6&still=1:1300" "mobile:$URL?ledger&still=1:5200"; do
  name="${spec%%:*}"; rest="${spec#*:}"; h="${rest##*:}"; src="${rest%:*}"
  host="$OUT/_host-$name.html"
  printf '<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;background:#6b5a4b}iframe{display:block;border:0;width:390px;height:%spx}</style></head><body><iframe src="%s"></iframe></body></html>' "$h" "$src" > "$host"
  shot "$( [ "$name" = mobile ] && echo mobile.png || echo "$name-mobile.png" )" "500,$h" "file://$host"
  rm "$host"
done
ls -la "$OUT"/*.png
