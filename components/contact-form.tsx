"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

type Errors = Partial<Record<"subject" | "name" | "email" | "message", string>>;

function clientValidate(form: HTMLFormElement): Errors {
  const data = new FormData(form);
  const errors: Errors = {};
  if (!data.get("subject")) errors.subject = "ご用件を選択してください。";
  if (!String(data.get("name") || "").trim()) errors.name = "お名前を入力してください。";
  const email = String(data.get("email") || "").trim();
  if (!email) errors.email = "メールアドレスを入力してください。";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "正しいメールアドレスを入力してください。";
  if (!String(data.get("message") || "").trim()) errors.message = "お問い合わせ内容を入力してください。";
  return errors;
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inFlight = useRef(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const nextErrors = clientValidate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      setMessage("入力内容をご確認ください。");
      return;
    }

    inFlight.current = true;
    setStatus("sending");
    setMessage("送信しています…");
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.requestId = crypto.randomUUID();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { message?: string; errors?: Errors };
      if (!response.ok) {
        setErrors(result.errors || {});
        throw new Error(result.message || "送信できませんでした。");
      }
      form.reset();
      setErrors({});
      setStatus("success");
      setMessage("送信しました。お問い合わせありがとうございます。3営業日以内に担当よりご返信します。");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "送信できませんでした。時間をおいて再度お試しください。");
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={status === "sending"}>
      <div className="field">
        <label htmlFor="subject">ご用件<span className="required">必須</span></label>
        <select id="subject" name="subject" required aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined} defaultValue="">
          <option value="" disabled>選択してください</option><option>パートナー制度について</option><option>診断の導入について（自社で受けたい）</option><option>採用について（インターン等）</option><option>取材・その他</option>
        </select>{errors.subject && <span id="subject-error" className="field-error">{errors.subject}</span>}
      </div>
      <div className="field"><label htmlFor="name">お名前<span className="required">必須</span></label><input id="name" name="name" type="text" autoComplete="name" required maxLength={80} placeholder="山田 太郎" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <span id="name-error" className="field-error">{errors.name}</span>}</div>
      <div className="field"><label htmlFor="company">会社名・屋号</label><input id="company" name="company" type="text" autoComplete="organization" maxLength={120} placeholder="株式会社〇〇 / 個人の場合は空欄で結構です" /></div>
      <div className="field"><label htmlFor="email">メールアドレス<span className="required">必須</span></label><input id="email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} placeholder="taro@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <span id="email-error" className="field-error">{errors.email}</span>}</div>
      <div className="field"><label htmlFor="message">お問い合わせ内容<span className="required">必須</span></label><textarea id="message" name="message" required maxLength={5000} placeholder="ご相談内容をご記入ください" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />{errors.message && <span id="message-error" className="field-error">{errors.message}</span>}</div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">ウェブサイト</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
      <p className="privacy-note">送信いただいた情報は<Link href="/privacy">プライバシーポリシー</Link>に基づき取り扱います。</p>
      <button className="button submit-button" type="submit" disabled={status === "sending"}>{status === "sending" ? "送信中…" : "送信する"}</button>
      {message && <p className={`form-status${status === "error" ? " error" : ""}`} role={status === "error" ? "alert" : "status"} aria-live="polite">{message}</p>}
    </form>
  );
}
