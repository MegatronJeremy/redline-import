# Redline Import 0.1.1: test record (Dex, 2026-10-03)
- run_product_checks on products/redline-import: install, typecheck, test (27 tests, vitest), build all PASS (0.1.0 record: run on the exact source of the 0.1.0 main.js f96c5da1…; hash unchanged after build; 0.1.1 record is in the 0.1.1 section below).
- Fixtures: synthetic OOXML built in test/fixture.ts (invented reviewers Ann Reviewer, Bob, Cy, Di, Eve). No Word-saved file tested. LibreOffice not used (import direction, nothing to render).
- main.js sha256 10c36a9296fb0de08fc831aefda9ef69227d42a682c9205f3aee594da1f675b5, 715,425 bytes; manifest.json 184dd89b...
- NOT tested: real Obsidian: see RI5 (0.1.0 build; not repeated on 0.1.1); real Word/LibreOffice-saved .docx; live Gumroad verify with a real key (product id is now set in config.ts, but no real key has been verified yet); round trip with plugin #1 (do not claim).
- Tested behaviours (claimable): tracked insert/delete/move with author+date, accept-all, reject-all, deletion-of-insertion, author-name hardening, comments as footnotes with reply threading (commentsExtended), footnotes as [^n], images extracted, bad file rejected, batch = independent conversions, Pro gate.
- Known limits for README (DI6): paragraph-mark insert/delete (merged or split paragraphs), formatting changes (rPrChange/pPrChange), changes inside text boxes, moved text shown as delete + insert not linked; comment replies need commentsExtended.xml in the file; free build accepts changes silently.

- 2026-10-03 rev 2 (Dex): comment footnotes now numbered from 1 ([^c1], [^c2]...), matching the settings text; tests updated, typecheck/test (24)/build re-run PASS. Previous build hash e7b8dce5... superseded: real-Obsidian run must be repeated on this build. Duplicate image rewrite on repeat import not changed.

## Public summary: see repo-stage-redline/TESTED.md (kept identical to the repo copy)

- 2026-10-03 (Dex): RI1 image-link fix covered by test/paths.test.ts; checks re-run: typecheck, test 27/27, build PASS.

## RI5: real-Obsidian run on the release build (2026-10-03, Dex)
- Files: qa/ri5/ (vault, config, obsidian.log, docx/). Obsidian 1.13.7 Linux AppImage (extracted, studio's copy used read-only), WSLg, driven over CDP, fresh synthetic vault, no other plugins, updates off, no sign-in.
- Build: main.js sha256 f96c5da17b5a396b931467162d5d716772dcd972af5e2f91bb74f27a7676b81b (rev 3, after RI1-RI3), manifest.json 184dd89b...; hashes re-checked after the run: unchanged. Copied, not rebuilt.
- Passed: trust dialog -> plugin loads, both commands registered; free import: Notice "Imported to redline-sample.md"; re-import: Notice "Imported to redline-sample (1).md", second image saved as "attachments/redline-sample-image-1 (1).png" (byte-identical to the first) and the second note links to it (`![tiny](attachments/redline-sample-image-1%20\(1\).png)`); Obsidian's metadata cache resolves that embed to that exact file. Comments [^c1],[^c2] (reply threaded), footnote [^1], tracked changes accepted silently in free.
- Harness caveats: native file picker replaced by imp.cjs (fills input.files, fires the plugin's onchange). Pro paths (mark/reject/batch) NOT re-run on this build; they were run on rev 2 (RUN2, 10c36a92...) and the rev 3 changes are the image-link/paths code, covered by unit tests. Verify/network not re-run; no proxy log was produced this run (proxy listed no connections, but I did not confirm it was the one used), so no network claim for this run.
- Not covered: Word-saved files, live Gumroad verify, Windows/macOS/mobile, minAppVersion 1.5.0.
- Disk: no downloads; run folder 3 MB; 38 GB free before and after.

## 0.1.1 (2026-10-03, Dex)
- Only change from 0.1.0: the Gumroad product id is set in src/config.ts so licence keys can be activated. typecheck, test (27/27) and build re-run PASS. The real-Obsidian run above was done on 0.1.0; it was not repeated for 0.1.1 and the Pro licence check has not been run against a real key.
- 0.1.1 build record: main.js sha256 717e03e097cb4ff53eded045c54814fd0ac4b0408606c7efbc3da22ff077c048, 715801 bytes; manifest.json sha256 69b34ef60ac276e6ca50cc481a0d2f0b5c2fbc2c1af947404c02a7059350c59c (staged build run_8fdcf2b3). run_product_checks on this exact source (npm run test, vitest 2.1.9): 27 passed (27), 4 test files, 2026-10-03 session of task_92ac84f0; install, typecheck and build PASS earlier in run_8fdcf2b3.
- 0.1.1 on sale: the Pro listing https://xparhyx.gumroad.com/l/krpith ($12) is live. Activation has not been confirmed with a real purchase; full refund if your key does not verify.
