#!/usr/bin/env python3
"""Regenerate assets/assets_b64.js (base64 of the poly.pizza GLBs) from the files in assets/.
All shipped models are CC0. Edit the map below to swap/add models, then run build.py."""
import base64, os
HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "assets")
MODELS = {
    "bike":    "bike.glb",        # AliceCassie  - Cartoony Purple Motorcycle (CC0)
    "zombieA": "zombie_a.glb",    # Quaternius   - Zombie (CC0, rigged/animated)
    "zombieB": "zombie_b.glb",    # Quaternius   - Zombie (CC0, rigged/animated)
    "tree":    "deadtree.glb",    # Quaternius   - Dead Trees (CC0)
    "rock":    "rock.glb",        # Quaternius   - Rock (CC0)
    "barrel":  "barrel.glb",      # Quaternius   - Exploding Barrel (CC0)
}
lines = ["// Auto-generated base64 of poly.pizza GLB models (all CC0). Regenerate with build_assets.py.",
         "window.MODELS_B64 = {"]
for k, f in MODELS.items():
    raw = open(os.path.join(ASSETS, f), "rb").read()
    lines.append(f'  {k}: "{base64.b64encode(raw).decode()}", // {f} ({len(raw)} bytes)')
lines.append("};")
open(os.path.join(ASSETS, "assets_b64.js"), "w").write("\n".join(lines) + "\n")
print("regenerated assets/assets_b64.js from:", {k: v for k, v in MODELS.items()})
