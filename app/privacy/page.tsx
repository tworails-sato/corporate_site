import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "プライバシーポリシー",
  "合同会社Two Railsにおける個人情報の取り扱いについて定めています。",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <>
      <div className="page-hero"><div className="container"><p className="page-en">PRIVACY POLICY</p><h1>プライバシーポリシー</h1></div></div>
      <div className="container policy">
        <p className="lead">合同会社Two Rails（以下「当社」）は、当社が提供するウェブサイトおよびサービス（以下「本サービス」）における、個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。</p>
        <h2>1. 取得する情報</h2><p>当社は、本サービスの提供にあたり、以下の情報を取得することがあります。</p><ol><li>氏名、会社名、メールアドレス等、お問い合わせフォームにご入力いただく情報</li><li>診断サービスの利用にあたりご回答いただく情報</li><li>Cookie、アクセスログ等を通じて取得する閲覧情報</li></ol>
        <h2>2. 利用目的</h2><ol><li>お問い合わせへの対応のため</li><li>診断サービスの提供、結果レポートの作成・改善のため</li><li>サービスに関するご案内のため</li><li>統計データの作成（個人を識別できない形式に加工した上での分析）のため</li></ol>
        <h2>3. 第三者提供</h2><p>当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。</p>
        <h2>4. 委託</h2><p>当社は、利用目的の達成に必要な範囲において、個人情報の取扱いを外部に委託することがあります（サーバー運用、メール配信等）。この場合、委託先に対し必要かつ適切な監督を行います。</p>
        <h2>5. 安全管理</h2><p>当社は、個人情報の漏えい、滅失または毀損の防止その他の安全管理のために必要かつ適切な措置を講じます。</p>
        <h2>6. 開示・訂正・削除の請求</h2><p>ご本人からの個人情報の開示、訂正、利用停止、削除等のご請求には、ご本人であることを確認の上、法令に従い速やかに対応します。ご請求は<Link href="/contact" className="text-link" style={{ marginTop: 0 }}>お問い合わせフォーム</Link>よりご連絡ください。</p>
        <h2>7. 本ポリシーの変更</h2><p>本ポリシーの内容は、法令の改正やサービス内容の変更に応じて、予告なく変更することがあります。変更後のポリシーは、本ページに掲載した時点から効力を生じます。</p>
        <p className="updated">制定日: 2026年7月<br />合同会社Two Rails</p>
      </div>
    </>
  );
}
