const allowedSubjects = new Set([
  "パートナー制度について",
  "診断の導入について（自社で受けたい）",
  "採用について（インターン等）",
  "取材・その他",
]);

type Payload = {
  subject?: unknown;
  name?: unknown;
  company?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
  requestId?: unknown;
};

type Field = "subject" | "name" | "email" | "message";
const recentRequests = new Map<string, number>();

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function cleanHeader(value: string) {
  return value.replace(/[\r\n]/g, " ");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json() as Payload;
  } catch {
    return Response.json({ message: "送信内容を読み取れませんでした。" }, { status: 400 });
  }

  if (text(body.website, 200)) return Response.json({ ok: true });

  const subject = text(body.subject, 80);
  const name = text(body.name, 80);
  const company = text(body.company, 120);
  const email = text(body.email, 254);
  const message = text(body.message, 5000);
  const requestId = text(body.requestId, 100);
  const errors: Partial<Record<Field, string>> = {};
  if (!allowedSubjects.has(subject)) errors.subject = "ご用件を選択してください。";
  if (!name) errors.name = "お名前を入力してください。";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "正しいメールアドレスを入力してください。";
  if (!message) errors.message = "お問い合わせ内容を入力してください。";
  if (Object.keys(errors).length) return Response.json({ message: "入力内容をご確認ください。", errors }, { status: 400 });

  const now = Date.now();
  for (const [key, time] of recentRequests) if (now - time > 10 * 60_000) recentRequests.delete(key);
  if (!requestId || recentRequests.has(requestId)) return Response.json({ message: "このお問い合わせはすでに受け付けています。" }, { status: 409 });
  recentRequests.set(requestId, now);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    recentRequests.delete(requestId);
    return Response.json({ message: "現在、送信機能をご利用いただけません。時間をおいて再度お試しください。" }, { status: 503 });
  }

  const mail = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `【Two Railsお問い合わせ】${cleanHeader(subject)} / ${cleanHeader(name)}`,
      text: `ご用件: ${subject}\nお名前: ${name}\n会社名・屋号: ${company || "（未入力）"}\nメールアドレス: ${email}\n\nお問い合わせ内容:\n${message}`,
    }),
  });

  if (!mail.ok) {
    recentRequests.delete(requestId);
    return Response.json({ message: "送信できませんでした。時間をおいて再度お試しください。" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
