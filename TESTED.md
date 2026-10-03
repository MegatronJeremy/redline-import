# Redline Import 0.1.3: test record (public copy)

Build tested (the files attached to the 0.1.3 release):
- main.js sha256 70e1c1698d84c34a50b217b94b06f01f66aa1bb423e82045a071c3489328d305
- manifest.json sha256 cfd08a7174d36c36f02ba4c346dd7e551916afbd1a64e0400cdd4c95629c9427 (version 0.1.3)

Automated checks (2026-10-03, run_product_checks on this source): typecheck PASS, tests 27/27 PASS (vitest), production build PASS. main.js contains no `createElement("script")`.

Lint: eslint-plugin-obsidianmd 0.4.2 (recommended rules, type-aware) on src/: 0 errors, 5 warnings (the optional Obsidian 1.13 `getSettingDefinitions` settings-search API is not adopted; four import warnings come from our lint harness, which lacked the dependency list).

Real Obsidian 1.13.7 (Linux desktop, fresh vault, no other plugins, no sign-in), exact 0.1.3 build:
- Plugin loads; both commands registered; settings headings "Import" and "Pro licence".
- Free import of a synthetic .docx: comments as [^c1], [^c2] with the reply threaded, footnote [^1], image extracted, tracked changes accepted silently.
- Free batch import is blocked with the notice "Batch import needs a paid licence. Enter your licence key in the plugin settings."
- Pro paths with **Pro forced on in the test setup (not a real licence key)**: mark, accept, reject, and a 3-file batch gave correct output.
- Verify with an invalid key: "Gumroad does not recognise this licence key."; key not saved.
- Network seen during the run: one connection to api.gumroad.com at the Verify click, none during imports. (Obsidian itself made one connection at startup; the plugin has no such code.)

Fixtures are synthetic OOXML built in test/fixture.ts with invented reviewer names.

Not tested: a valid licence key against live Gumroad (first paying buyers are that test); files saved by Word or LibreOffice; the native file dialog; Windows, macOS, mobile; minAppVersion 1.5.0 (only 1.13.7 used); round trip with any exporter plugin (not claimed).

Known limits: see README.
