# Vayana GFF 2026 booth films — source files

Seven 60-second, 1080p, seamlessly looping product films, built as animated web pages and rendered frame-by-frame to MP4. Everything in the films is code: the screens are HTML/CSS mock-ups rebuilt from product screenshots, the icons are hand-drawn SVG paths, and the motion is a single GSAP timeline per film.

| Folder | Film | Entry file |
|---|---|---|
| `01_BillsToPay` | BillsToPay | `video.html` |
| `02_SCF` | Supply Chain Finance | `video.html` |
| `03_VTX` | Vayana TradeXchange — Exporter / Financier | `exp.html` / `fin.html` |
| `04_CollectrIQ_Banks` | CollectrIQ for Banks & FIs | `video.html` |
| `05_CollectrIQ_Corporates` | CollectrIQ for Enterprises | `video.html` |
| `06_Vantage` | Vayana Vantage | `video.html` |

`kit.js` at the root is the shared motion kit used by films 03–06 (`../kit.js` from each folder), so keep the folder structure as is.

## Watch a film in the browser

Open any entry file in Chrome/Edge with `?play` appended to the address, e.g.

```
file:///…/06_Vantage/video.html?play
```

The film loops at 1920×1080; zoom the browser to fit. Without `?play` the page stays on frame 0 — that is the mode the renderer drives.

## How a film is built

Each film is one HTML file with three parts:

1. **Scenes** — `<section class="scene">` blocks, one per beat (title, problem, flow, platform screens, outcomes, close). App screens are `.scr` cards with a top bar, KPI cards, tables and charts written in HTML/CSS, with values matching the real screenshots.
2. **Assets** — `data.js` holds the logos and the QR code as base64 data URIs, plus map paths (Natural Earth, public domain) where a map is used. `gsap.min.js` is GSAP 3.12.5.
3. **Timeline** — one `gsap.timeline({paused:true})`. Every animation is placed at an absolute second (`tl.to(el, {...}, 27.2)`), so the whole film is deterministic and can be scrubbed to any time with `window.seek(t)`. The last tweens fade to white by 59.6s and the first frame is white, which is what makes the loop seamless.

`kit.js` provides the reusable moves: `reveal` (masked text rise), `pop` (card entrance), `out`, `float`, `count` (number tickers), `prepDraw`/`draw` (SVG stroke drawing), `stamp`, `typeIn`, `typing`, and `mountKit()` which adds the drifting brand wave in the background.

## Render to MP4

Requirements: Node 18+, `npm i playwright` (with Chromium), and `ffmpeg` on the PATH.

```
cd 06_Vantage
node preview.js 3 12 30 45      # writes frames_preview/t*.png at those seconds — quick QA
node render.js Vantage_GFF2026.mp4
```

`render.js` opens the page in headless Chromium at 1920×1080, calls `window.seek(t)` for each of the 1800 frames (30 fps × 60 s), screenshots them, and pipes the PNGs into ffmpeg (H.264, CRF 17, yuv420p, silent AAC track, faststart). A render takes about 5 minutes. For the VTX folder pass the file name: `HTML=exp.html node render.js VTX_Exporter.mp4`.

The `contact_sheet*.png` in each folder is one frame every 3 seconds of the final render, used for the last visual check.

## Design rules used across all films

- White ground, navy `#29397A`, crimson `#B4303E`, navy→crimson gradient, Poppins — the BillsToPay brochure scheme.
- App screens are rebuilt only from real product screenshots (values, labels, layout); no invented screens.
- Annotations are white callouts; every caption or chip that sits near the background wave has its own white background so nothing overlaps.
- No named people on close cards — product web address and a generic enquiries contact only.
- Booth band: Global Fintech Fest 2026 · Booth K16–17 · Jio World Centre, Mumbai · 9–11 September, with a scan-to-connect QR.
