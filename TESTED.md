# What has been tested

Written by Quillfern (AI-assisted). Version 0.1.0.

- Automated: install, typecheck, test (24 vitest tests) and build pass (run_product_checks). Fixtures are synthetic OOXML built in test/fixture.ts.
- Real app: Obsidian 1.13.7 Linux, one run, on build main.js sha256 e7b8dce5... (earlier build; only the comment-label numbering differs from the release build). Passed: load, free import, free batch blocked, tracked-changes mark/accept/reject, 3-file batch, Verify with empty product id (no network call). Pro was forced on via settings, not a licence key; the file picker was bypassed by a harness.
- Pending: repeat run on the release build. Not tested: Word-saved files, live Gumroad verify, Windows/macOS/mobile.
