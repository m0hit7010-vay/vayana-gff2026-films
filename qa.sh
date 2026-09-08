#!/bin/bash
# usage: qa.sh file.mp4
f=$1; b=${f%.mp4}
echo "== $f"; ffprobe -v error -show_entries format=duration -of csv=p=0 "$f"
ffmpeg -v error -y -i "$f" -vf "fps=1/3,scale=480:-1,tile=5x4" "${b}_frames.png"
ffmpeg -v error -y -ss 0 -i "$f" -frames:v 1 /tmp/qa0.png; ffmpeg -v error -y -ss 59.966 -i "$f" -frames:v 1 /tmp/qa1.png
python3 - <<'PY'
from PIL import Image, ImageChops
a=Image.open('/tmp/qa0.png').convert('RGB'); b=Image.open('/tmp/qa1.png').convert('RGB')
d=ImageChops.difference(a,b).convert('L'); print('seam max', d.getextrema()[1])
PY
