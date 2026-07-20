import Link from "next/link";
import { Rails } from "@/components/rails";
import { getNoteArticles } from "@/lib/note";

export default async function Home() {
  const { articles, fallback } = await getNoteArticles();

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="hero-eyebrow" data-reveal>TWO RAILS LLC — ORGANIZATIONAL DIAGNOSTICS</p>
          <h1 data-reveal><span className="phrase">情熱が、</span><br /><span className="phrase">放置されない</span><wbr /><span className="phrase">世界を創る。</span></h1>
          <Rails />
          <p className="hero-sub" data-reveal>Two Railsは、売上を伸ばす<strong>「次の一手」を見つける診断</strong>を中心に、経営支援プロダクトを開発しています。</p>
          <Link href="/services" className="button" data-reveal>プロダクトを見る</Link>
        </div>
      </section>

      <section className="section section--border">
        <div className="container">
          <p className="section-label" data-reveal>ISSUE</p>
          <h2 className="section-title" data-reveal>「うちの会社は大丈夫」を、<br />なくすこと。</h2>
          <div className="body-copy" data-reveal>
            <p>経営支援の現場でいちばん大事なのは、提案でも実行でもありません。<span className="mark">経営者本人が課題に気づく</span>、その最初の一歩です。しかし多くの場合、そもそも課題を深刻にとらえていない——そこで支援は止まってしまいます。</p>
            <p>Two Railsのプロダクトは、社長の自己認識と組織の実態のあいだにあるギャップを数値で示します。支援者が「言いにくいこと」を、データが代わりに語る。そこから本当の支援がはじまります。</p>
          </div>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container">
          <p className="section-label" data-reveal>IN NUMBERS</p>
          <h2 className="section-title" data-reveal>「経営者との対話の入口」となる<br />ものを届けています。</h2>
          <div className="numbers-grid">
            <div data-reveal><div className="num-value"><span className="accent" data-count="16">16</span><span className="unit">テーマ</span></div><p className="num-label">経営全般を網羅する診断テーマ数</p></div>
            <div data-reveal><div className="num-value"><span data-count="130">130</span><span className="unit">名以上</span></div><p className="num-label">診断実施数</p></div>
            <div data-reveal><div className="num-value"><span className="accent" data-count="9">9</span><span className="unit">割</span></div><p className="num-label">「課題が整理できた」と回答</p></div>
            <div data-reveal><div className="num-value"><span className="prefix">約</span><span data-count="800">800</span><span className="unit">名</span></div><p className="num-label">比較対象となる経営者データ</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="container">
          <p className="section-label" data-reveal>PRODUCTS</p>
          <h2 className="section-title" data-reveal>目的の異なる2つの診断で、<br />本当の課題を可視化する。</h2>
          <div className="product-flow">
            <article className="product-card" data-reveal>
              <span className="product-tag">FOR CEO</span>
              <h3 className="product-name">社長カルテ</h3>
              <p className="product-desc">16テーマで経営者の自己認識を可視化するエグゼクティブ診断。商談前の掘り起こしツールとして、眠っている名刺リストを対話のきっかけに変えます。</p>
              <Link href="/services#shacho-karte" className="text-link">社長カルテを見る →</Link>
            </article>
            <article className="product-card gap" data-reveal>
              <span className="product-tag">FOR ORGANIZATION</span>
              <h3 className="product-name">リーダーズGAP</h3>
              <p className="product-desc">社長と幹部・現場の認識のズレを定量化する組織診断。組織全体のデータから、どのテーマを優先して支援するかを特定します。</p>
              <Link href="/services#leaders-gap" className="text-link">リーダーズGAPを見る →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--border" id="partners">
        <div className="container">
          <p className="section-label" data-reveal>FOR YOU</p>
          <h2 className="section-title" data-reveal>あなたはどちらですか。</h2>
          <div className="split-grid">
            <article className="split-card partner" data-reveal>
              <p className="split-en">FOR PARTNERS</p><h3 className="split-title">診断を武器に、<br />クライアントを支援したい方へ</h3>
              <p className="split-desc">コンサルタント・士業・BtoB実務家向けのパートナー制度。診断ツールを自身の看板で使い、休眠顧客の掘り起こしから継続支援までを設計できます。</p>
              <a href="https://karte.ceo-sherpa.com/partners.html" target="_blank" rel="noopener" className="button">パートナー制度の詳細</a>
            </article>
            <article className="split-card direct" data-reveal>
              <p className="split-en">FOR EXECUTIVES</p><h3 className="split-title">自社の組織を<br />診断したい経営者の方へ</h3>
              <p className="split-desc">従業員20〜50名規模の企業を中心に、社長カルテ・リーダーズGAPの直接導入をご案内しています。まずはデモ診断からお試しください。</p>
              <Link href="/contact" className="button button--dark">デモ診断を申し込む</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--border" id="column">
        <div className="container">
          <p className="section-label" data-reveal>COLUMN</p><h2 className="section-title" data-reveal>経営支援の現場から。</h2>
          <div className="column-grid">
            {articles.map((article) => (
              <a key={`${article.url}-${article.title}`} href={article.url} target="_blank" rel="noopener" className="column-card" data-reveal>
                <p className="column-date">{article.date}</p><p className="column-title">{article.title}</p>
              </a>
            ))}
          </div>
          {fallback && <p className="column-fallback" data-reveal>最新記事を取得できない場合は、おすすめ記事を表示しています。</p>}
        </div>
      </section>

      <section className="section section--border section--sky">
        <div className="container">
          <p className="section-label" data-reveal>INITIATIVES</p><h2 className="section-title" data-reveal>診断だけでなく、<br />挑戦する人を直接応援する。</h2>
          <p className="body-copy" data-reveal>私たちのミッションは、プロダクトの外にも広がっています。情熱を持つ挑戦者が最初の一歩を踏み出せる場を、自ら運営しています。</p>
          <article className="initiative-card" data-reveal>
            <div className="initiative-visual"><span className="tag">PITCH EVENT</span><h3>情熱ピッチ</h3><span className="caption">はじめの0.1歩を応援する</span></div>
            <div className="initiative-body"><p>「立派な事業計画はいらない、情熱ひとつで参加できる」——業界初の応援型ピッチイベント。夢や想いを持つ挑戦者が舞台に立ち、応援金やメンタリング、出資マッチングを通じて最初の一歩を後押しします。これまでに4回開催してきました。</p><a href="https://www.jonetsu-pitch.com/" target="_blank" rel="noopener" className="text-link">情熱ピッチ公式サイトへ ↗</a></div>
          </article>
        </div>
      </section>

      <section className="cta-band">
        <div className="container"><h2 data-reveal>経営者との対話の<br />きっかけをつくりましょう。</h2><Rails /><p data-reveal>パートナー制度・デモ診断のご相談は、お気軽にどうぞ。</p><Link href="/contact" className="button" data-reveal>お問い合わせ</Link></div>
      </section>
    </>
  );
}
