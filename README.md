# For Rasmita 💗 — Birthday Website

A mobile-first, eight-scene birthday surprise built with plain HTML, CSS, and JavaScript.

## What's included

1. Glossy SVG heart-shaped balloon with a clear arrow-to-heart trajectory
2. Animated heart tree birthday reveal
3. Layered cake and candle-blowing interaction
4. Five poppable balloons with personal reasons
5. Five Polaroid-style photo cards hanging from a glowing fairy-light rope, with gentle up/down sway and horizontal swipe navigation
6. Golden envelope reveal
7. Personalized love letter with typewriter effect
8. Cute illustrated birthday finale and replay button

The background music is generated in the browser using the Web Audio API, so there is no copyrighted audio file included. Browsers require a user interaction before audio can start; tap the music button at the top.

## Personalize it

Open `script.js` and edit the `CONFIG` object near the top:

- `name`: birthday person's name
- `age`: birthday age
- `sender`: your name
- `reasons`: the five messages revealed by balloons
- `memories`: captions and paths for your five photos
- `letter`: the personal birthday letter

### Add your photos

Copy your five photos into `assets/photos/` and name them exactly:

- `memory-1.jpg`
- `memory-2.jpg`
- `memory-3.jpg`
- `memory-4.jpg`
- `memory-5.jpg`

If your images are PNG or WebP, either convert them to JPG or update each `image` path in `CONFIG.memories`. Use portrait photos where possible; the carousel crops images to fit the Polaroid frame.

## Run locally

**Quick option:** open `index.html` in a modern browser.

**Recommended option:** from this folder, run a local static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

On Android, use the hosted link after deployment for the most reliable full-screen and audio behavior.

## Free hosting with a shareable link

### Option A — GitHub Pages

1. Create or sign in to a GitHub account.
2. Create a new public repository, for example `rasmita-birthday`.
3. Upload `index.html`, `styles.css`, `script.js`, and the `assets` folder to the repository root.
4. Open **Settings → Pages**.
5. Under the build/deployment section, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then save.
7. Wait for GitHub Pages to publish. Your link will look like `https://YOUR-USERNAME.github.io/rasmita-birthday/`.
8. Open the link on your phone and test all scenes before sending it.

### Option B — Netlify Drop

1. Visit `https://app.netlify.com/drop`.
2. Sign in if asked.
3. Drag the entire project folder (or a ZIP of its contents) into the drop area.
4. Netlify will publish it and provide a shareable HTTPS URL.

## Notes

- No backend, API key, build tools, or paid service is required.
- Internet is needed for the optional Google Fonts import; fallback fonts are provided.
- The reference screenshots contain a browser preview toolbar that is not part of the birthday page; this project recreates the scene content, not the phone's browser chrome.
- Replace placeholder memories and customize the message before sharing.


## Latest visual refinements

- Opening scene now uses a proper SVG heart silhouette instead of the lumpy CSS heart shape. The arrow animates from the bow toward the heart target.
- Memory lane now displays five hanging Polaroid cards on a warm, glowing rope. Cards sway gently at slightly different heights; swipe horizontally or use the side arrows/dots to move between them.
