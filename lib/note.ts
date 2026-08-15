export type NoteArticle = {
  title: string;
  url: string;
  date: string;
  image: string;
  excerpt: string;
};

const DEFAULT_ACCOUNT = "tworails_sato";
const FALLBACK_IMAGE = "/logo.png";
const ARTICLE_LIMIT = 3;
const noteAccount = process.env.NOTE_ACCOUNT?.trim() || DEFAULT_ACCOUNT;

export const NOTE_PROFILE_URL = `https://note.com/${encodeURIComponent(noteAccount)}`;

function decodeEntities(value: string) {
  const entities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(x[0-9a-f]+|\d+);/gi, (_, code: string) => {
      const radix = code.toLowerCase().startsWith("x") ? 16 : 10;
      const number = Number.parseInt(radix === 16 ? code.slice(1) : code, radix);
      return Number.isNaN(number) ? "" : String.fromCodePoint(number);
    })
    .replace(/&([a-z]+);/gi, (match, name: string) => entities[name.toLowerCase()] ?? match);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^$\{\}()|[\]\\]/g, "\\$&");
}

function tagValue(block: string, tag: string) {
  const escapedTag = escapeRegExp(tag);
  const match = block.match(new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`, "i"));
  return decodeEntities(match?.[1]?.trim() ?? "");
}

function tagAttribute(block: string, tags: string[], attribute: string) {
  for (const tag of tags) {
    const escapedTag = escapeRegExp(tag);
    const element = block.match(new RegExp(`<${escapedTag}\\b[^>]*>`, "i"))?.[0];
    if (!element) continue;
    const value = element.match(new RegExp(`${attribute}=["']([^"']+)["']`, "i"))?.[1];
    if (value) return decodeEntities(value);
  }
  return "";
}

function safeHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function canonicalNoteUrl(value: string, account: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "note.com" || !url.pathname.startsWith(`/${account}/n/`)) return "";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return "";
  }
}

function firstImage(...htmlValues: string[]) {
  for (const html of htmlValues) {
    const decoded = decodeEntities(html);
    const source = decoded.match(/<img\b[^>]*\bsrc=["']([^"']+)["']/i)?.[1];
    const safeSource = source ? safeHttpsUrl(decodeEntities(source)) : "";
    if (safeSource) return safeSource;
  }
  return "";
}

function metaImage(html: string) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    const property = tag.match(/(?:property|name)=["']([^"']+)["']/i)?.[1]?.toLowerCase();
    if (property !== "og:image" && property !== "twitter:image") continue;
    const content = tag.match(/content=["']([^"']+)["']/i)?.[1];
    const safeSource = content ? safeHttpsUrl(decodeEntities(content)) : "";
    if (safeSource) return safeSource;
  }
  return "";
}

async function articleImage(articleUrl: string, ...feedValues: string[]) {
  const imageInFeed = firstImage(...feedValues);
  if (imageInFeed) return imageInFeed;

  try {
    const response = await fetch(articleUrl, {
      headers: { Accept: "text/html,application/xhtml+xml;q=0.9" },
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return FALLBACK_IMAGE;
    const html = await response.text();
    return metaImage(html) || firstImage(html) || FALLBACK_IMAGE;
  } catch {
    return FALLBACK_IMAGE;
  }
}

function excerptFrom(...htmlValues: string[]) {
  for (const html of htmlValues) {
    const text = decodeEntities(html)
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (text) return text.length > 90 ? `${text.slice(0, 90).trimEnd()}…` : text;
  }
  return "";
}

function formatDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  }).format(parsed).replaceAll("/", ".");
}

export async function getNoteArticles(): Promise<{ articles: NoteArticle[]; fallback: boolean }> {
  const account = noteAccount;

  try {
    const response = await fetch(`https://note.com/${encodeURIComponent(account)}/rss`, {
      headers: { Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8" },
      next: { revalidate: 21600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`note RSS: ${response.status}`);

    const xml = await response.text();
    const items = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].slice(0, ARTICLE_LIMIT);
    const parsedArticles = await Promise.all(items.map(async (match): Promise<NoteArticle | null> => {
      const item = match[1];
      const description = tagValue(item, "description");
      const content = tagValue(item, "content:encoded");
      const url = canonicalNoteUrl(tagValue(item, "link") || tagValue(item, "guid"), account);
      const title = tagValue(item, "title").replace(/\s+/g, " ").trim();
      if (!title || !url) return null;

      const feedImage = safeHttpsUrl(tagAttribute(item, ["media:thumbnail", "media:content", "enclosure"], "url"));
      return {
        title,
        url,
        date: formatDate(tagValue(item, "pubDate") || tagValue(item, "dc:date")),
        image: feedImage || await articleImage(url, content, description),
        excerpt: excerptFrom(description, content),
      };
    }));
    const articles = parsedArticles.filter((article): article is NoteArticle => article !== null);

    if (articles.length === 0) throw new Error("note RSS has no valid items");
    return { articles, fallback: false };
  } catch {
    return { articles: [], fallback: true };
  }
}
