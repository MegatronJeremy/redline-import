# Redline Import

Import `.docx` files into your vault as Markdown notes. Comments, footnotes and images come along in the free version. Pro adds tracked changes shown as marked-up text, and batch import.

> **AI-assisted.** This plugin and this README were written with AI assistance (Claude) by Quillfern (AI-assisted), a small AI-assisted studio, and reviewed before release. The code is open source under the MIT licence.

> **Payment required for some features.** Single-file import is free. Tracked-changes marking and batch import need **Redline Import Pro**, a separate one-time purchase on Gumroad. Pro is not on sale yet; this README will carry the purchase link when it is. The free version is not time-limited.

## Free version

Run **Import a .docx file** from the command palette and pick one `.docx`. The note is created in the output folder you set (default: vault root); an existing note is never overwritten.

- Headings, lists, tables, bold/italic and links become Markdown.
- **Comments** become footnotes named `[^c1]`, `[^c2]` and so on, with author and date. A reply to a comment says which comment it answers (this needs the reply information that Word writes in `commentsExtended.xml`).
- **Footnotes** become Markdown footnotes (`[^1]`).
- **Images** are saved as separate files in your attachments folder and linked from the note. Importing the same file twice saves the images again under new names.
- **Tracked changes in the free version are accepted silently**: inserted text is kept and deleted text is dropped, with no markers.

## Pro version (optional, paid)

Pro unlocks two features, both covered by automated tests:

- **Tracked changes shown in the note.** Choose one of three modes in settings:
  - *Mark*: insertions become `==inserted text==` and deletions become `~~deleted text~~`, each followed by an HTML comment with the author and date.
  - *Accept all*: keep insertions, drop deletions.
  - *Reject all*: restore deleted text, drop insertions.
- **Batch import**: pick up to 100 `.docx` files at once and import them in one go. Each file is converted independently; a file that fails is reported and the rest continue. Files over 50 MB are skipped.

Not included: exporting notes back to Word. This plugin only imports, and no round trip with any other plugin is claimed or tested.

### Buying and activating Pro

1. Buy Redline Import Pro on Gumroad ($12, one-time). The link will be added here once the listing is live.
2. Gumroad emails you a licence key.
3. In Obsidian: Settings → Community plugins → Redline Import → paste the key → **Verify**.

Keys from refunded or charged-back purchases fail verification. Pro stays active offline until you press **Re-check**; the plugin never re-checks by itself.

## Network use, privacy and data

- **One network call, only when you press Verify / Re-check**: the plugin sends your licence key and the Pro product id to `https://api.gumroad.com/v2/licenses/verify` (Gumroad's licence API). It does not increase the licence's use count. Nothing else is sent.
- The settings tab has a "How to get Pro" link to this README. It opens in your browser only when you click it; the plugin loads nothing for it.
- **No network call at startup, in the background, or during import.** Importing works fully offline.
- **No telemetry, analytics, ads or tracking.** No server of ours is involved.
- Your licence key and settings are stored locally in the plugin's `data.json` inside your vault. Your documents never leave your computer.
- The plugin reads only the `.docx` files you pick, and writes notes and images into your vault.

## Install

- **From the community directory**: not listed yet. This line will change only after the directory accepts the plugin.
- **Manually**: download `main.js` and `manifest.json` from the latest GitHub release into `<your vault>/.obsidian/plugins/redline-import/`, then enable the plugin under Community plugins. Desktop only.

## Known limits (honest status)

- **Tracked changes:**
  - Changes to a paragraph mark (a merged or split paragraph) are ignored.
  - Formatting changes that Word tracks (bold, style, paragraph format) are ignored.
  - Changes inside text boxes are not handled.
  - In Mark mode, an insertion nested inside a deletion is shown as part of the deletion.
  - Moved text is shown as a deletion at the old place plus an insertion at the new place, not as a "move".
- **Tests used synthetic files**: documents built by us for the tests, with invented reviewer names. **No file saved by Microsoft Word or LibreOffice was tested**, so real-world files may behave differently.
- **Two runs in the real app, Obsidian 1.13.7 on Linux desktop.** (1) An earlier build that differs from the release build in how comments are numbered and how image file names and links are chosen: it covered Pro paths (tracked-changes mark/accept/reject, 3-file batch), with **Pro forced on in the test setup, not unlocked with a licence key**. (2) The exact release build (`main.js` sha256 f96c5da1…): plugin loads, free import, re-import with an image-name collision (second image saved with a " (1)" suffix and the second note links to it), comments, footnotes. The Pro paths were **not** re-run on the release build; they are covered by automated tests only. In both runs the operating-system file picker was bypassed (the plugin's own import code ran, the dialog did not).
- **The licence check against the live Gumroad service has not been run** (Pro is not on sale yet).
- Not tested on Windows, macOS or mobile (the plugin is desktop-only). The minimum Obsidian version, 1.5.0, is an estimate; only 1.13.7 was used.
- Password-protected files and old `.doc` files are not supported.
- See TESTED.md for the full record.

## Credits and licences

Built on open-source libraries, with thanks to their authors:
- [mammoth.js](https://github.com/mwilliamson/mammoth.js), BSD-2-Clause, by Michael Williamson.
- [turndown](https://github.com/mixmark-io/turndown), MIT, by Dom Christie.
- [JSZip](https://github.com/Stuk/jszip), MIT or GPL-3.0 (used under MIT).
- [@xmldom/xmldom](https://github.com/xmldom/xmldom), MIT.

Their licence notices are in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md). This plugin is MIT licensed (see `LICENSE`).

## Support

Report problems on the GitHub issues page of this repository. Made by Quillfern (AI-assisted).

"Word" and "Obsidian" are trademarks of their respective owners. Not affiliated with Microsoft or Obsidian.
