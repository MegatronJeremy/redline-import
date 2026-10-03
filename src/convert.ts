import mammoth from "mammoth";
import TurndownService from "turndown";
import { prepassDocx, type Change, type DocComment, type TrackedMode } from "./prepass";

export interface ConvertOptions {
  /** "mark" shows changes as ==ins== / ~~del~~; "accept" / "reject" resolve them. Free build always uses "accept". */
  tracked: TrackedMode;
  comments: boolean;
  /** Link text to put in the markdown for an extracted image (the caller saves the bytes). */
  imageLink: (index: number, ext: string) => string;
}

export interface ExtractedImage {
  index: number;
  ext: string;
  contentType: string;
  data: Uint8Array;
}

export interface ConvertResult {
  markdown: string;
  changes: Change[];
  comments: DocComment[];
  images: ExtractedImage[];
  warnings: string[];
}

const td = new TurndownService({ headingStyle: "atx", bulletListMarker: "-", codeBlockStyle: "fenced" });
td.keep(["sup", "sub"]);

const toArrayBuffer = (u: Uint8Array): ArrayBuffer => u.buffer.slice(u.byteOffset, u.byteOffset + u.byteLength) as ArrayBuffer;
const b64ToBytes = (b64: string): Uint8Array => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
/** Keep author text from closing the HTML comment we put it in. */
const safe = (s: string) => s.replace(/--+/g, "-").replace(/[<>\r\n]/g, " ").trim();
const extFor = (ct: string) => ({ "image/jpeg": "jpg", "image/svg+xml": "svg" } as Record<string, string>)[ct] ?? (ct.split("/")[1] || "png").replace(/[^a-z0-9]/gi, "");

export async function convertDocx(input: Uint8Array, opts: ConvertOptions): Promise<ConvertResult> {
  const { buffer, changes, comments } = await prepassDocx(input, opts.tracked);
  const images: ExtractedImage[] = [];
  const result = await mammoth.convertToHtml(
    // node (tests) reads `buffer`, the browser build (Obsidian) reads `arrayBuffer`
    { arrayBuffer: toArrayBuffer(buffer), buffer } as unknown as { arrayBuffer: ArrayBuffer },
    {
      convertImage: mammoth.images.imgElement(async (img) => {
        const ext = extFor(img.contentType);
        const index = images.length + 1;
        images.push({ index, ext, contentType: img.contentType, data: b64ToBytes(await img.read("base64")) });
        return { src: opts.imageLink(index, ext), alt: (img as { altText?: string }).altText || "" };
      }),
    },
  );

  // Footnotes: mammoth emits <sup><a href="#footnote-N" id="footnote-ref-N">[k]</a></sup> and an <ol> of <li id="footnote-N">.
  const footnotes: { id: string; html: string }[] = [];
  let html = result.value.replace(/<ol>\s*((?:<li id="footnote-\d+">[\s\S]*?<\/li>\s*)+)<\/ol>/g, (_all, items: string) => {
    for (const m of items.matchAll(/<li id="footnote-(\d+)">([\s\S]*?)<\/li>/g)) {
      footnotes.push({ id: m[1], html: m[2].replace(/\s*<a href="#footnote-ref-\d+">[^<]*<\/a>/g, "") });
    }
    return "";
  });
  const order: string[] = [];
  html = html.replace(/<sup><a href="#footnote-(\d+)" id="footnote-ref-\d+">\[\d+\]<\/a><\/sup>/g, (_a, id: string) => {
    if (!order.includes(id)) order.push(id);
    return `⟦FN${id}⟧`;
  });

  let md = td.turndown(html);

  const byId = new Map(changes.map((c) => [c.id, c]));
  const meta = (c: Change) => ` <!-- ${c.type}${c.moved ? " (moved)" : ""}: ${safe(c.author) || "unknown"}${c.date ? ", " + safe(c.date) : ""} -->`;
  md = md
    .replace(/⟦INS(\d+)⟧([\s\S]*?)⟦\/INS\1⟧/g, (_, id, t) => `==${t.trim()}==${meta(byId.get(+id)!)}`)
    .replace(/⟦DEL(\d+)⟧([\s\S]*?)⟦\/DEL\1⟧/g, (_, id, t) => `~~${t.trim()}~~${meta(byId.get(+id)!)}`);

  const defs: string[] = [];
  const fnLabel = new Map(order.map((id, i) => [id, String(i + 1)]));
  md = md.replace(/⟦FN(\d+)⟧/g, (_, id) => `[^${fnLabel.get(id)}]`);
  for (const id of order) {
    const f = footnotes.find((x) => x.id === id);
    if (f) defs.push(`[^${fnLabel.get(id)}]: ${td.turndown(f.html).trim().replace(/\n+/g, " ")}`);
  }

  const used: DocComment[] = [];
  const cLabel = (id: string) => `c${comments.findIndex((x) => x.id === id) + 1}`;
  md = md.replace(/⟦CMT(\d+)⟧/g, (all, id) => {
    const c = comments.find((x) => x.id === id);
    if (!opts.comments || !c) return "";
    used.push(c);
    return `[^${cLabel(id)}]`;
  });
  for (const c of used) {
    const who = safe(c.author) || "unknown";
    const reply = c.parentId ? `reply to [^${cLabel(c.parentId)}], ` : "";
    defs.push(`[^${cLabel(c.id)}]: Comment (${reply}${who}${c.date ? ", " + safe(c.date) : ""}): ${c.text.replace(/\s*\n\s*/g, " ")}`);
  }

  if (defs.length) md = md.trimEnd() + "\n\n" + defs.join("\n") + "\n";
  return { markdown: md.trimEnd() + "\n", changes, comments: used, images, warnings: result.messages.map((m) => m.message) };
}
