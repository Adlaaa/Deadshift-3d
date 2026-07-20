#!/usr/bin/env python3
"""Inline three.js + GLTFLoader + SkeletonUtils + base64 models + base64 music into index.html."""
import os, base64
base = os.path.dirname(os.path.abspath(__file__))
a = os.path.join(base, "assets")
tpl = open(os.path.join(base, "game_template.html"), encoding="utf-8").read()
three  = open(os.path.join(a, "three.min.js"), encoding="utf-8").read()
gltf   = open(os.path.join(a, "GLTFLoader.js"), encoding="utf-8").read()
skel   = open(os.path.join(a, "SkeletonUtils.js"), encoding="utf-8").read()
models = open(os.path.join(a, "assets_b64.js"), encoding="utf-8").read()
music  = base64.b64encode(open(os.path.join(a, "phase_two.mp3"), "rb").read()).decode()
out = (tpl.replace("/*__THREE__*/", three)
          .replace("/*__LOADER__*/", gltf)
          .replace("/*__SKEL__*/", skel)
          .replace("/*__MODELS__*/", models)
          .replace("/*__MUSIC__*/", 'window.MUSIC_B64 = "' + music + '";'))
for mk in ("/*__THREE__*/", "/*__LOADER__*/", "/*__SKEL__*/", "/*__MODELS__*/", "/*__MUSIC__*/"):
    assert mk not in out, mk + " was not replaced"
open(os.path.join(base, "index.html"), "w", encoding="utf-8").write(out)
print("wrote index.html: %d bytes (%.1f MB) | music base64: %d bytes" % (len(out), len(out)/1e6, len(music)))
