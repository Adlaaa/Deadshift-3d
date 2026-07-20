# Deploying DEADSHIFT 3D

The game is a **single self-contained file: `index.html`** — the 3D engine,
the six 3D models, and the background music are all inlined as base64. That
makes hosting trivial: anywhere that serves `index.html` serves the whole game.

## Quick facts

- **Playable file:** `index.html` (double-click to play locally, or host it).
- **Source** (edit these, then rebuild with `python3 build.py`):
  `game_template.html`, `assets/*.glb`, `assets/phase_two.mp3`, `assets/*.js`,
  `build.py`, `build_assets.py`.
- **Licenses:** 3D models are **CC0**, three.js is **MIT** (both recorded in
  `ATTRIBUTION.md` and embedded as a comment in `index.html`); the background
  music is **original, self-produced** work; all other original code is
  yours — add a `LICENSE` of your choice (see below).
- A ready-to-upload **`DEADSHIFT_itch.zip`** (just `index.html`) is included.

---

## GitHub

### Push with Git (recommended)

```bash
# one-time identity
git config --global user.name  "Your Name"
git config --global user.email "you@example.com"

# in this project folder
git init
git add .
git commit -m "Initial commit: DEADSHIFT 3D"

# create an EMPTY repo first at https://github.com/new  (do NOT add README/.gitignore there)
git remote add origin https://github.com/<YOUR-USERNAME>/<REPO>.git
git branch -M main
git push -u origin main
```

A `.gitignore` is already included (keeps OS / editor / Python / Node caches
out). `index.html` (~7 MB) is far under GitHub's 100 MB-per-file limit → **no
Git LFS needed**.

### Upload via the website (no Git)

`github.com/new` → create the repo → **"uploading an existing file"** → drag
the project files/folders in → *Commit changes*. Good for a first upload;
switch to Git afterwards for easy updates.

### Play it straight from the repo (GitHub Pages)

Repo → **Settings → Pages** → *Deploy from a branch* → branch **`main`**,
folder **`/ (root)`** → **Save**. The game is then live at
`https://<YOUR-USERNAME>.github.io/<REPO>/` (an `index.html` at the root is
served automatically).

---

## itch.io

itch.io plays HTML games from an `index.html` located at the **root of the
uploaded ZIP**. Since our `index.html` is fully self-contained, that ZIP only
needs the one file — use the included **`DEADSHIFT_itch.zip`**.

### Web upload

1. `https://itch.io/game/new` → set the title → **Kind of project: HTML**.
2. **Uploads** → upload `DEADSHIFT_itch.zip` → tick **"This file will be
   played in the browser"**.
3. Set the embed **Viewport** to **`1280 x 720`** (matches the game canvas).
4. Add a **cover image + screenshots** (grab a few from the running game), set
   price/free, then **Save / Publish**.

Make your own zip if you prefer (the `index.html` must be at the ZIP root):

- macOS / Linux: `zip -j DEADSHIFT_itch.zip index.html`
- Windows: right-click `index.html` → *Compress to ZIP file* (zip the
  **file**, not a folder that contains it).
- Python:
  `python -c "import zipfile; zipfile.ZipFile('DEADSHIFT_itch.zip','w').write('index.html','index.html')"`

### itch.io CLI (`butler`) — fast re-uploads

```bash
butler push . <YOUR-ITCH-USERNAME>/<GAME>:html --userversion 1.0.0
```

Pushing the whole folder also works (the browser only runs the root
`index.html`; the extra source files are simply ignored).

---

## Licensing (recommended before publishing)

- The models (CC0), three.js (MIT), and the background music (original,
  self-produced) are already covered in `ATTRIBUTION.md` and, for the models
  and three.js, in the comment embedded in `index.html`.
- Add a **`LICENSE`** for **your original code**. A common, permissive choice
  is the **MIT License** (put its text in a `LICENSE` file with your name and
  year). The project-wide license can be MIT while the third-party assets
  keep their own CC0/MIT notices.
  *(Want the `LICENSE` file generated? Just say the license and the
  name/year.)*
- Before your first public upload, run through the **distribution checklist**
  at the bottom of `ATTRIBUTION.md` — it re-verifies asset licenses and flags
  the one manual thing to keep current (the license-check date).

---

## Editing & rebuilding

Edit `game_template.html` / the assets, then:

```bash
python3 build.py     # rebuilds index.html (inlines engine + models + music)
```

Afterwards, re-zip `index.html` for itch.io, and `git commit` + `git push`
(or `butler push`) to update GitHub / itch.io.
