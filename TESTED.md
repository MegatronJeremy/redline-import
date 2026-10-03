# What has been tested

Written by Quillfern (AI-assisted). Version 0.1.0.

- Automated (2026-10-03, run_product_checks on this exact source): install, typecheck, test (27 vitest tests) and build PASS. Fixtures are synthetic OOXML built in test/fixture.ts.
- Real app, release build: Obsidian 1.13.7 Linux, main.js sha256 f96c5da17b5a396b931467162d5d716772dcd972af5e2f91bb74f27a7676b81b. Passed: plugin loads, both commands registered, free import, re-import with an image-name collision (second image saved with a " (1)" suffix and the second note links to exactly that file), comments and footnotes, tracked changes accepted silently in the free build. The native file picker was replaced by a harness (the plugin's own import code ran).
- Real app, earlier build: an earlier run on a build that differs from the release build in how comments are numbered and how image file names and links are chosen. It passed free batch blocked, tracked-changes mark/accept/reject and a 3-file batch, with Pro forced on via settings (not a licence key). These Pro paths were not re-run on the release build; they are covered by automated tests only.
- Not tested: Word-saved files, live Gumroad verify (no product id in this build), Windows/macOS/mobile, minimum Obsidian version 1.5.0 (only 1.13.7 used), network behaviour of the release-build run.
- 2026-10-03: image-link fix (RI1): image paths are now chosen first and the note links to exactly those paths (src/paths.ts, test/paths.test.ts); tests re-run after it, 27 pass.
