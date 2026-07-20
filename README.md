# DEADSHIFT 3D — Zombie Bike Survival

A single-file, **fully offline** 3D zombie-bike survival game. Open `index.html`
in any modern browser — no server, no internet connection, no build step.
Everything (Three.js, the GLTF loader, the skeleton-cloning helper, all 3D
models, and the background music) is inlined into that one HTML file as base64.

## Play it

Just double-click `index.html` (or open it in a browser). Click **START RIDE**
(this also unlocks audio).

| Key | Action |
|---|---|
| `W` / `↑` | Throttle |
| `S` / `↓` | Brake / reverse |
| `A` `D` / `←` `→` | Steer |
| `Space` | Jump |
| `Shift` | Nitro (drains the blue meter, recharges over time) |
| `M` | Mute / unmute |

**Goal:** ram zombies at speed to splat them. Too slow and they tear your hull.
The **red barrels** explode on impact and chain-kill everything nearby
(including other barrels → chain reactions). Clear a wave to repair **+10
hull**; chaining kills within 2 seconds builds a combo multiplier (up to ×5).

## Assets & licensing

All third-party creative assets are **CC0** (public domain) or **MIT**. The
background music is original, self-produced work. Full details, license texts,
and a distribution checklist live in [ATTRIBUTION.md](ATTRIBUTION.md) — read
that before redistributing or modifying the project.

| Asset | Source | License |
|---|---|---|
| 6× low-poly 3D models (bike, 2 zombies, tree, rock, barrel) | [poly.pizza](https://poly.pizza) | CC0 1.0 |
| three.js (r128), GLTFLoader, SkeletonUtils | [three.js project](https://threejs.org) | MIT |
| Background music (`phase_two.mp3`) | Self-produced | Original work |
| All other code, art direction, terrain, gameplay | Original work | — |

## How the assets are embedded (the base64 trick)

1. Each `.glb` and the `.mp3` are read and base64-encoded — the models into
   `assets/assets_b64.js` (`window.MODELS_B64 = { bike: "...", zombieA: "...", ... }`)
   and the music inline during the build.
2. At runtime the game decodes each string back to bytes with `atob` →
   `Uint8Array` → `ArrayBuffer`. Model buffers go to `GLTFLoader.parse(buffer, …)`;
   since a `.glb` embeds its own textures, no external files or URLs are ever
   fetched. That's why the whole game is one portable HTML file.

## The infinite map (no chunks, no storage)

Same idea as a 2D noise field, in 3D. `terrainHeight(x, z)` is a pure
value-noise function (3 octaves). The ground is one subdivided plane that
follows the player; each frame its vertices are recomputed from the function,
so the world is endless in every direction and never stored. Scenery (trees,
rocks, barrels) is placed **deterministically per grid cell** from a hash of
the cell coordinates, so the same spot always looks the same; cells entering
the camera range are built and cells leaving it are dropped.

## Auto-normalizing models from the wild

Every downloaded model had different units, up-axis, and facing, so the game
normalizes each one on load (`buildModel` / `buildSplitModels`):

- **Scale, upright, ground** — `Box3.setFromObject` gives the true size after
  the file's own node transforms; the model is scaled to a target height and
  its origin dropped to the ground.
- **Facing** — detected automatically: for the bike, the centroid of the most
  *yellow* material group (the headlight) marks the front, computed per
  geometry group so it works even on a single-mesh model; for the zombies, the
  skeleton's left/right arm bones give the body's side axis and `up × side`
  gives forward, with the head-vs-hips lean resolving the 180° ambiguity. The
  model is then rotated so its front faces `+Z`.

## Files / build pipeline

`index.html` is **generated**. To edit the game or swap assets, work on the
sources and rebuild:

```
game_template.html      # the game (HTML/CSS/JS) with markers /*__THREE__*/ etc.
build.py                # inlines libs + base64 models + music -> index.html
build_assets.py         # regenerates assets/assets_b64.js from assets/*.glb
pizza.py                # helper: search poly.pizza & read a model's GLB url/license
assets/
  three.min.js          # three.js r128 (MIT)
  GLTFLoader.js         # three.js r128 example loader
  SkeletonUtils.js      # three.js r128 helper (clones skinned models correctly)
  *.glb                 # the 6 source models
  assets_b64.js         # base64 of the 6 models (regenerate with the snippet below)
  phase_two.mp3         # original background track
```

Rebuild after changing any asset:

```bash
python3 build_assets.py   # regenerates assets/assets_b64.js from assets/*.glb
python3 build.py          # rebuilds the single self-contained index.html
```

To add a model: `python3 pizza.py search <keyword>` to list slugs,
`python3 pizza.py info <slug>` for its GLB url + license, download the `.glb`,
add it to the base64 map in `build_assets.py`, and call `parseGLB('yourkey')`
on it in `game_template.html`.

## Tuning knobs (in `game_template.html`)

- **Bike feel** — `top`/accel/brake constants and `SFX.engine` mapping in `step()`.
- **Difficulty** — wave size `4 + wave*2`, spawn `gap`, kill-speed threshold
  (`power>=9`), maul damage (`16*dt`) in `step()`; zombie `speed`/`points` in
  `spawnZombie()`.
- **World** — terrain octaves in `terrainHeight`; prop density in `buildCell`
  (`rng(base+1)*2.4` props/cell, type thresholds); fog distance in `scene.fog`.
- **Facing wrong on a swapped model?** The auto-detector handles the shipped
  set; for an odd model you can force it by editing the value returned from
  `computeForward` for that `kind`.

## Testing note

Verified offline (via a Node harness, no GPU) that all 6 GLBs parse, that
`SkeletonUtils.clone` plus a per-clone `AnimationMixer` actually drives the
cloned skeletons (zombieA 36/50 bones, zombieB 6/12 bones move on *Walk*), that
facing detection returns the correct axis for each model, and that the game JS
passes a syntax check. A WebGL browser was not available in that environment,
so final render/gameplay wasn't pixel-verified there — open `index.html` and
report anything that looks off (a bike facing backwards, a zombie T-posing,
etc.).

## Deployment

See [DEPLOY.md](DEPLOY.md) for step-by-step GitHub, GitHub Pages, and itch.io
upload instructions.
