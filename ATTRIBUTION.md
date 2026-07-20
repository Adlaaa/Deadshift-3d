# Attribution & Copyright — DEADSHIFT 3D

This file is the project's license / copyright compliance document. It lists
every third-party component, states the permissions under which it is used,
and **reproduces the full license texts** so that anyone auditing or
redistributing the project has everything in one place.

**Short version:** the only third-party creative assets are six low-poly 3D
models from [poly.pizza](https://poly.pizza), **all CC0 1.0 (public-domain
dedication)** — verified on poly.pizza on **2026-07-20**. The 3D engine is
**three.js (MIT)**; its full MIT notice is reproduced below *and* kept verbatim
at the top of the inlined engine code in `index.html`. The background music
(`phase_two.mp3`) is **original, self-produced audio**, made with music
production software — no samples, loops, or third-party stems used. **Everything
else is original work containing no third-party copyright.** No CC-BY, no
all-rights-reserved, no trademarked or licensed font/logo content is included
anywhere.

---

## License & copyright summary

- **3D models — CC0 1.0 (public domain).** No permission or attribution is
  legally required; the credits below are voluntary.
- **three.js (r128) — MIT.** The required copyright + permission notice is
  reproduced in the "Full license texts" section below, embedded as an HTML
  comment in `index.html`, and preserved verbatim at the top of the inlined
  `three.min.js`. The `GLTFLoader` / `SkeletonUtils` modules are part of the
  same MIT-licensed project. The MIT condition ("the above copyright notice
  and this permission notice shall be included in all copies") is satisfied.
- **Background music (`phase_two.mp3`) — original, self-produced work.** Made
  by the developer using music production software; contains no samples,
  loops, presets under separate license terms, or third-party stems.
- **Original code & procedural assets — original work.** Gameplay, HUD,
  rendering, terrain, sky, audio synthesis, rider, gun, and all
  primitive-built props are original work for this project; free to use and
  modify; no third-party copyright applies.
- **No other third-party IP.** Text uses only OS-installed system fonts
  (referenced by name — no font files bundled); icons are OS-rendered
  Unicode/emoji; there are no logos or other trademarked content; all
  textures are generated in code.
- **poly.pizza** is referenced only as the source/distributor of the CC0
  models and for creator attribution (nominative use); it is not a rights
  holder of the game.

---

## 3D models (from poly.pizza) — all CC0 1.0

Licenses re-checked on the model pages on **2026-07-20** (all returned `CC0 1.0`).

| Used as | Original title | Creator | License | Model page | Creator page | glTF-Binary (GLB) | Local file |
|---|---|---|---|---|---|---|---|
| Player motorcycle | Cartoony Purple Motorcycle | **AliceCassie** | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [poly.pizza/m/j20srJUjpB](https://poly.pizza/m/j20srJUjpB) | [poly.pizza/u/AliceCassie](https://poly.pizza/u/AliceCassie) | `3ff04d85-dfe6-487c-b01d-5ce92103cf30.glb` | `assets/bike.glb` |
| Zombie (rigged) | Zombie | **Quaternius** | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [poly.pizza/m/VlXjG0N8Eg](https://poly.pizza/m/VlXjG0N8Eg) | [poly.pizza/u/Quaternius](https://poly.pizza/u/Quaternius) | `c4002f69-6979-42e8-ad6e-2f4e14fc3a9d.glb` | `assets/zombie_a.glb` |
| Zombie (rigged) | Zombie | **Quaternius** | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [poly.pizza/m/JoBvxIUpZP](https://poly.pizza/m/JoBvxIUpZP) | [poly.pizza/u/Quaternius](https://poly.pizza/u/Quaternius) | `af74108f-e770-4ed0-9d17-83576afece78.glb` | `assets/zombie_b.glb` |
| Dead trees (×5) | Dead Trees | **Quaternius** | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [poly.pizza/m/26H2UlEtWA](https://poly.pizza/m/26H2UlEtWA) | [poly.pizza/u/Quaternius](https://poly.pizza/u/Quaternius) | `2c85ff04-7223-4ead-93eb-0f171d3bd6c5.glb` | `assets/deadtree.glb` |
| Rocks | Rock | **Quaternius** | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [poly.pizza/m/34W5ymEePk](https://poly.pizza/m/34W5ymEePk) | [poly.pizza/u/Quaternius](https://poly.pizza/u/Quaternius) | `0ffcfce1-6983-4cb1-b055-77f71d50f3f1.glb` | `assets/rock.glb` |
| Exploding barrel | Exploding Barrel | **Quaternius** | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | [poly.pizza/m/1orHe0kCc1](https://poly.pizza/m/1orHe0kCc1) | [poly.pizza/u/Quaternius](https://poly.pizza/u/Quaternius) | `dbb58868-50d4-4ef0-945a-12b07222fb69.glb` | `assets/barrel.glb` |

> Earlier in development a CC-BY motorcycle and a CC-BY zombie were briefly
> considered; both were **replaced with the CC0 equivalents above** before
> release, so **no CC-BY / attribution-requiring model is present in the game.**

---

## Background music

| Asset | Source | License |
|---|---|---|
| `phase_two.mp3` | Self-produced with music production software | Original work — all rights held by the developer |

No samples, loops under separate license, presets requiring credit, or
third-party stems were used in producing this track. It is free to use,
modify, and redistribute as part of this project at the developer's discretion.

---

## Full license texts (reproduced for compliance)

### CC0 1.0 Universal — operative statement (3D models)
> **No Copyright** — The person who associated a work with this deed has
> dedicated the work to the public domain by waiving all of his or her rights
> to the work worldwide under copyright law, including all related and
> neighboring rights, to the extent allowed by law.
>
> You can copy, modify, distribute and perform the work, even for commercial
> purposes, all without asking permission.

Full legal text: <https://creativecommons.org/publicdomain/zero/1.0/legalcode>.
Deed: <https://creativecommons.org/publicdomain/zero/1.0/>. (Attribution is
*not* required; the creator names above are provided voluntarily.)

### MIT License — three.js (r128), GLTFLoader, SkeletonUtils
> Copyright © 2010–2021 three.js authors
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to
> deal in the Software without restriction, including without limitation the
> rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
> sell copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
> FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
> IN THE SOFTWARE.

This notice is (a) reproduced here, (b) embedded as an HTML comment near the
top of `index.html`, and (c) preserved verbatim in the `@license` header at
the very start of the inlined `three.min.js` (`Copyright 2010-2021 Three.js
Authors / SPDX-License-Identifier: MIT`).

---

## Modifications made to the models

For transparency (not required by CC0): files were kept in glTF-Binary
(`.glb`) form and **re-scaled, re-centered, and re-oriented** to a common
in-game scale; the rigged zombies were **posed / instanced** and driven by
their own animation clips; every model was **embedded as base64** inside the
single HTML document and rendered in a real-time 3D context. No geometry or
textures were otherwise edited.

---

## In-game credit line

A short credit line (creators + licenses) is shown on the **title screen** and
in the pause menu; it is hidden during gameplay. The same information appears
in the `README.md` asset table and in the HTML comment embedded in
`index.html`.

---

## Original / procedural content (no third-party asset)

Original work created for this project, no third-party license: the rider and
rifle; all primitive-built biome props (cacti, reeds, stumps, lamps, ruined
buildings, wrecks); the gradient sky dome, sun, moon and star field; the
blob-shadow decals; the value-noise terrain and per-biome height/color system;
the synthesized engine / gun / explosion audio (Web Audio API); the
self-produced background music track (`phase_two.mp3`); and all gameplay, HUD,
and rendering code.

---

## Distribution checklist (keep it compliant)

Before shipping a build, confirm each item:

1. [ ] Every poly.pizza slug in the table above still reads **`CC0 1.0`** on
       its model page (fetch `https://poly.pizza/m/<slug>` and check `license`).
2. [ ] `assets/*.glb` and the base64 map in `build_assets.py` match the table
       (same six files / slugs). Regenerate with `python3 build_assets.py`.
3. [ ] No CC-BY (or other attribution-requiring) model has been added. If you
       add one, you **must** add visible attribution (in-game + this file)
       per its license, or choose a CC0/MIT alternative instead.
4. [ ] The three.js MIT notice is present: in this file, in the `index.html`
       HTML comment, and in the inlined engine header.
5. [ ] No bundled fonts / logos / trademarked assets were introduced (system
       fonts by name and OS emoji are fine); the bundled music
       (`phase_two.mp3`) remains original, self-produced work.
6. [ ] This file's "Last license verification" date is updated.

If you are a rights holder and believe any of your work is included without
proper clearance, please open an issue (or contact the maintainer) and it
will be **removed or re-licensed promptly**.

---

*Last license verification: 2026-07-20. When adding or swapping any asset,
update the table + `build_assets.py`, re-confirm its license (prefer CC0 or
MIT to keep distribution friction-free), and tick the checklist above.*
