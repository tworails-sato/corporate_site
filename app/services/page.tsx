import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rails } from "@/components/rails";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "プロダクト",
  "社長カルテ、リーダーズGAP、社長カルテPartners（OEM）をご紹介します。",
  "/services",
);

export default function ServicesPage() {
  return (
    <>
      <div className="page-hero"><div className="container"><p className="page-en">PRODUCTS</p><h1>プロダクト</h1><p>Two Railsは、経営者の意思決定と組織の実行のあいだにある「認識のズレ」を可視化する診断プロダクトを開発しています。目的の異なる2つの診断で、経営者が本当の課題に気づく最初の一歩を支えます。</p></div></div>

      <section className="product-detail" id="shacho-karte"><div className="container">
        <div className="prod-head" data-reveal><span className="prod-tag">FOR CEO</span><h2 className="prod-name">社長カルテ</h2></div>
        <p className="prod-lead" data-reveal>経営者の優先課題を、<span className="mark">16テーマ</span>で可視化する。</p>
        <p className="prod-desc" data-reveal>収益性・成長性・組織機能・事業継続性など、経営を全般から網羅する16テーマのエグゼクティブ診断です。経営者自身の回答から強みと伸びしろを構造化し、約800名の経営者データと比較したレポートを自動生成。商談前の掘り起こしツールとして、眠っている名刺リストを「対話のきっかけ」に変えます。</p>
        <div className="prod-grid">
          <div className="shot" data-reveal><Image src="/images/shacho-karte-report.jpg" width={808} height={708} sizes="(max-width: 840px) 100vw, 50vw" alt="社長カルテ レポートサマリ（16テーマ別スコア・レーダーチャート）" /></div>
          <div data-reveal><ul className="feature-list"><li>経営を網羅する16テーマをスコアで可視化</li><li>高スコア／優先確認テーマを自動で色分け・整理</li><li>約800名の経営者データと比較したレポートを自動生成</li><li>レポートがそのまま「どの課題から支援するか」の対話台本になる</li></ul><p className="caption-text">実際のレポートサマリ。このレポートをもとに面談するだけで、支援の会話が自然に始まります。</p><a href="https://karte.ceo-sherpa.com/" target="_blank" rel="noopener" className="text-link">社長カルテの詳細を見る ↗</a></div>
        </div>
      </div></section>

      <section className="product-detail tint" id="leaders-gap"><div className="container">
        <div className="prod-head" data-reveal><span className="prod-tag sky">FOR ORGANIZATION</span><h2 className="prod-name">リーダーズGAP</h2></div>
        <p className="prod-lead" data-reveal>社長と現場の<span className="mark">「認識のズレ」</span>を、数値にする。</p>
        <p className="prod-desc" data-reveal>社長・幹部・現場それぞれの回答を突き合わせ、組織内の認識ギャップを定量化する組織診断です。「うちの会社は大丈夫」の内側で実際に起きていることをデータが可視化し、どのテーマから支援に入るべきか、優先順位を明らかにします。権限移譲や組織改善の起点として活用できます。</p>
        <div className="prod-grid">
          <div data-reveal><ul className="feature-list"><li>社長×幹部×現場の回答を三層で比較</li><li>認識ギャップの大きいテーマから支援の入口を特定</li><li>権限移譲・組織改善の推進テーマとして活用</li></ul><a href="https://ceo-sherpa.com/gap.pdf" target="_blank" rel="noopener" className="text-link">リーダーズGAPの資料を見る（PDF） ↗</a></div>
          <div className="shot" data-reveal><Image src="/images/leaders-gap-screenshot.jpg" width={1047} height={502} sizes="(max-width: 840px) 100vw, 50vw" alt="リーダーズGAP 認識差レーダーチャートと経営層対現場の評価比較" /></div>
        </div>
      </div></section>

      <section className="section section--border"><div className="container">
        <p className="page-en" data-reveal>FOR PARTNERS — OEM</p><h2 className="section-title" data-reveal>診断を、<span className="mark">あなたの看板</span>で。<br />社長カルテ Partners。</h2>
        <p className="prod-desc" data-reveal>コンサルタント・士業・BtoB実務家の方へ。社長カルテを自社サービスとして提供できるOEMパートナー制度をご用意しています。診断ツールを自身のブランドで活用し、休眠顧客の掘り起こしから継続支援までを、一貫して設計できます。</p>
        <div className="oem-points"><article className="oem-point" data-reveal><h3>自社ブランドで提供</h3><p>診断を自身の看板で提供でき、クライアントとの関係を主導できます。</p></article><article className="oem-point" data-reveal><h3>掘り起こしの武器に</h3><p>眠っている名刺リストを、診断を起点とした商談機会へ変換します。</p></article><article className="oem-point" data-reveal><h3>継続支援まで設計</h3><p>診断で見えた課題を起点に、伴走支援へと自然につなげられます。</p></article></div>
        <a href="https://karte.ceo-sherpa.com/partners.html" target="_blank" rel="noopener" className="text-link" data-reveal>パートナー制度・OEMの詳細を見る ↗</a>
      </div></section>

      <section className="cta-band"><div className="container"><h2>経営者との対話の<br />きっかけをつくりましょう。</h2><Rails /><p>パートナー制度・診断の導入について、お気軽にご相談ください。</p><a href="https://karte.ceo-sherpa.com/partners.html" target="_blank" rel="noopener" className="button">パートナー制度・OEMを見る</a><Link href="/contact" className="button button--ghost-light">導入の相談をする</Link></div></section>
    </>
  );
}
