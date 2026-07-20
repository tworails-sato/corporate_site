export type NoteArticle = { title: string; url: string; date: string };

const fallbackArticles: NoteArticle[] = [
  { title: "社長が「現場に任せている」と言うとき、実際に起きていること", url: "https://note.com/", date: "2026.07.01" },
  { title: "休眠名刺500枚を、3件の商談に変えた掘り起こしの設計", url: "https://note.com/", date: "2026.06.20" },
  { title: "診断ツールは「答え」ではなく「問い」を渡すためにある", url: "https://note.com/", date: "2026.06.05" },
];

function decode(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function valueOf(block: string, tag: string) {
  return decode(block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"))?.[1]?.trim() || "");
}

export async function getNoteArticles(): Promise<{ articles: NoteArticle[]; fallback: boolean }> {
  const account = process.env.NOTE_ACCOUNT?.trim();
  if (!account) return { articles: fallbackArticles, fallback: true };

  try {
    const response = await fetch(`https://note.com/${encodeURIComponent(account)}/rss`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`note RSS: ${response.status}`);
    const xml = await response.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 3);
    const articles = items.map((match) => {
      const rawDate = valueOf(match[1], "pubDate") || valueOf(match[1], "dc:date");
      const parsed = new Date(rawDate);
      return {
        title: valueOf(match[1], "title"),
        url: valueOf(match[1], "link"),
        date: Number.isNaN(parsed.getTime())
          ? ""
          : new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }).format(parsed).replaceAll("/", "."),
      };
    }).filter((article) => article.title && article.url);
    if (articles.length === 0) throw new Error("note RSS has no items");
    return { articles, fallback: false };
  } catch {
    return { articles: fallbackArticles, fallback: true };
  }
}
