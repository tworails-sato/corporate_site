import Link from "next/link";
import Image from "next/image";
import { Rails } from "@/components/rails";
import { HomeHero } from "@/components/home-hero";
import { getNoteArticles } from "@/lib/note";

export default async function Home() {
  const { articles, fallback } = await getNoteArticles();

  return (
    <>
      <HomeHero />

      <section className="section section--border" id="products">
        <div className="container">
          <div className="products-heading" data-reveal>
            <p className="section-label">PRODUCTS</p>
            <h2 className="section-title">経営支援のための、2つの診断プロダクト。</h2>
            <p className="products-lead">経営者個人の課題から、組織全体のGAPまで。目的に応じて選べる診断プロダクトを開発・提供しています。</p>
          </div>
          <div className="product-catalog">
            <article className="catalog-item" data-reveal>
              <div className="catalog-media">
                <Image src="/images/shacho-karte-report.jpg" alt="社長カルテの診断レポート画面" fill sizes="(max-width: 840px) 100vw, 50vw" />
              </div>
              <div className="catalog-body">
                <span className="product-tag">FOR CEO</span>
                <p className="catalog-logo">社長カルテ</p>
                <h3>社長カルテ</h3>
                <p className="catalog-desc">経営者の自己認識を可視化する、<strong>エグゼクティブ診断プロダクト</strong>。16テーマのスコアで「どこに課題があるか」「何から着手すべきか」を明らかにします。</p>
                <dl className="catalog-specs">
                  <div><dt>診断テーマ</dt><dd>16テーマ</dd></div>
                  <div><dt>所要時間</dt><dd>約5分</dd></div>
                  <div><dt>出力</dt><dd>16テーマのレーダーチャート＋フィードバックレポート</dd></div>
                  <div><dt>比較基準</dt><dd>成長企業の経営者 約800名のデータ</dd></div>
                </dl>
                <Link href="/services#shacho-karte" className="text-link">社長カルテを見る →</Link>
              </div>
            </article>
            <article className="catalog-item catalog-item--reverse" data-reveal>
              <div className="catalog-media">
                <Image src="/images/leaders-gap-screenshot.jpg" alt="リーダーズGAPの診断レポート画面" fill sizes="(max-width: 840px) 100vw, 50vw" />
              </div>
              <div className="catalog-body">
                <span className="product-tag product-tag--sky">FOR ORGANIZATION</span>
                <p className="catalog-logo catalog-logo--gap">リーダーズGAP</p>
                <h3>リーダーズGAP</h3>
                <p className="catalog-desc">組織の<strong>「本音」から、課題を可視化する組織診断プロダクト</strong>。経営層・幹部・現場の認識のズレを、上下（経営層⇄現場）と左右（部門間）の両面から捉え、GAPの大きい領域を明らかにします。</p>
                <dl className="catalog-specs">
                  <div><dt>診断構造</dt><dd>上下＋左右の多面診断</dd></div>
                  <div><dt>対象者</dt><dd>経営層／幹部／現場メンバー</dd></div>
                  <div><dt>所要時間</dt><dd>診断のみ約10分（インタビュー込みで一人あたり約30分）</dd></div>
                  <div><dt>出力</dt><dd>GAP診断レポート（組織単位で集計）</dd></div>
                </dl>
                <Link href="/services#leaders-gap" className="text-link">リーダーズGAPを見る →</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container">
          <p className="section-label" data-reveal>IN NUMBERS</p>
          <h2 className="section-title d1" data-reveal>経営支援の輪を広げるために。<br />「経営者との対話の入口」となるものを届けています。</h2>
          <div className="numbers-grid">
            <div className="d1" data-reveal><div className="num-value"><span className="accent" data-count="16">16</span><span className="unit">テーマ</span></div><p className="num-label">経営全般を網羅する診断テーマ数</p></div>
            <div className="d2" data-reveal><div className="num-value"><span data-count="30">30</span><span className="unit">社以上</span></div><p className="num-label">パートナー数</p></div>
            <div className="d2" data-reveal><div className="num-value"><span className="accent" data-count="9">9</span><span className="unit">割</span></div><p className="num-label">「課題が整理できた」と回答</p></div>
            <div className="d3" data-reveal><div className="num-value"><span className="prefix">約</span><span data-count="800">800</span><span className="unit">名</span></div><p className="num-label">比較対象となる経営者データ</p></div>
          </div>
          <p className="subnote d3" data-reveal>※ 2026年◯月時点</p>
        </div>
      </section>

      <section className="section section--border" id="partners">
        <div className="container">
          <p className="section-label" data-reveal>FOR YOU</p>
          <h2 className="section-title d1" data-reveal>あなたはどちらですか。</h2>
          <div className="split-grid">
            <article className="split-card partner d2" data-reveal>
              <p className="split-en">FOR PARTNERS</p><h3 className="split-title">診断を武器に、<br />クライアントを支援したい方へ</h3>
              <p className="split-desc">コンサルタント・士業・BtoB実務家向けのパートナー制度。診断ツールを自身の看板で使い、休眠顧客の掘り起こしから継続支援までを設計できます。</p>
              <a href="https://karte.ceo-sherpa.com/partners.html" target="_blank" rel="noopener" className="button">パートナー制度の詳細</a>
            </article>
            <article className="split-card direct d3" data-reveal>
              <p className="split-en">FOR EXECUTIVES</p><h3 className="split-title">自社の組織を<br />診断したい経営者の方へ</h3>
              <p className="split-desc">従業員20〜50名規模の企業を中心に、社長カルテ・リーダーズGAPの直接導入をご案内しています。まずはデモ診断からお試しください。</p>
              <Link href="/contact" className="button button--dark">デモ診断を申し込む</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--border" id="column">
        <div className="container">
          <p className="section-label" data-reveal>COLUMN</p><h2 className="section-title d1" data-reveal>経営支援の現場から。</h2>
          <div className="column-grid">
            {articles.map((article) => (
              <a key={`${article.url}-${article.title}`} href={article.url} target="_blank" rel="noopener" className="column-card d2" data-reveal>
                <p className="column-date">{article.date}</p><p className="column-title">{article.title}</p>
              </a>
            ))}
          </div>
          {fallback && <p className="column-fallback d3" data-reveal>最新記事を取得できない場合は、おすすめ記事を表示しています。</p>}
        </div>
      </section>

      <section className="initiative-strip section--border">
        <div className="container" data-reveal>
          <p>私たちは、診断プロダクトの開発だけでなく、挑戦する人が最初の一歩を踏み出せる場づくりにも取り組んでいます。</p>
          <Link href="/company#initiatives" className="text-link">私たちの取り組みを見る →</Link>
        </div>
      </section>

      <section className="cta-band">
        <div className="container"><h2 data-reveal>経営者との対話の<br />きっかけをつくりましょう。</h2><Rails /><p data-reveal>パートナー制度・デモ診断のご相談は、お気軽にどうぞ。</p><Link href="/contact" className="button" data-reveal>お問い合わせ</Link></div>
      </section>
    </>
  );
}
