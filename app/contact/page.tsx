import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "お問い合わせ",
  "Two Railsのパートナー制度、診断導入、採用、取材・その他に関するお問い合わせはこちらから。",
  "/contact",
);

export default function ContactPage() {
  return (
    <>
      <div className="page-hero"><div className="container"><p className="page-en">CONTACT</p><h1>お問い合わせ</h1><p>パートナー制度・診断の導入・その他のご相談は、以下のフォームからお気軽にどうぞ。内容確認後、3営業日以内に担当よりご返信いたします。</p></div></div>
      <div className="container form-wrap"><ContactForm /></div>
    </>
  );
}
