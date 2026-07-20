import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rails } from "@/components/rails";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "会社概要",
  "合同会社Two RailsのPurpose、Mission、Vision、Value、代表メッセージ、会社情報をご紹介します。",
  "/company",
);

export default function CompanyPage() {
  return (
    <>
      <div className="page-hero page-hero--center"><div className="container"><p className="page-en">PHILOSOPHY</p><h1>私たちの理念</h1><Rails /></div></div>

      <section className="band"><div className="container">
        <p className="band-label" data-reveal>PURPOSE</p><p className="band-sub" data-reveal>事業の目的</p>
        <h2 className="band-headline" data-reveal>情熱が、<span className="mark">放置されない</span>世界を創る。</h2>
        <div className="band-body" data-reveal>
          <p>私たちは、世の中を善くしたい、自分や周りの人を幸せにしたいという善き心・正しい志を持つ人が、きちんと応援される世界を創るために事業を展開します。</p>
          <p>人生で起こる悩みの多くは、人間関係——とりわけ<em>「想いが、届かないこと」</em>に起因すると私たちは考えます。どれだけ情熱を燃やし、どれだけ良いサービスをつくっても、それが届けたい相手に伝わらなければ、無いものとして扱われてしまう。</p>
          <p>人の心に届くためには、相手の理解と同じだけ、自己理解が欠かせません。しかしそのすべを持たないまま、認識のGAPに苦しみ、半ば諦めてしまう人が少なからずいます。だから私たちは、組織が前へ進むための「次の一手」を示すサービスを届けます。</p>
        </div>
      </div></section>

      <section className="band ink"><div className="container">
        <p className="band-label" data-reveal>MISSION</p><p className="band-sub" data-reveal>私たちの存在意義</p>
        <h2 className="band-headline" data-reveal>経営者の、<span className="mark">迷いを断ち切る。</span></h2>
        <div className="band-body" data-reveal>
          <p>最も大事なことは「決めること」だと、私たちは考えます。そして、決めることを最も仕事にしているのが経営者です。決断には大きな責任と行動が伴い、誰しも本能的には避けたくなる。それでも、その気持ちをはねのけ、歯を食いしばって進取の精神を持つ人こそが、本当の経営者です。</p>
          <p>私たちが支援したいのは、社会を良くするために恐れず事業を展開し、どこまでも届けたいという情熱と成長意欲を持ち、そして何より、自己犠牲ではなく「社員も自分たちも共に善くなろう」という精神を持つ経営者です。</p>
          <p>経営者の迷いを断ち切り、次の一手を示し、その後のアクションまで踏み出せる。そんな診断サービスを、私たちは開発しつづけます。</p>
          <Link href="/services" className="text-link">サービスを見る →</Link>
        </div>
      </div></section>

      <section className="band tint"><div className="container">
        <p className="band-label" data-reveal>VISION</p><p className="band-sub" data-reveal>実現したい未来</p>
        <h2 className="band-headline" data-reveal>「頑張る人が応援される」<br />という<span className="mark">当たり前</span>の世界へ。</h2>
        <div className="band-body" data-reveal>
          <p>生きるため、食べるため、仕方なく——ではなく。多くの人が「自己実現をしたい」という前向きな希望を持ち、その実現のために切磋琢磨しあう。私たちは、これこそ人生の目的に置くべき大切なことだと考えます。</p>
          <p>そのために、<em>自分の努力に誇りを持てる人</em>を増やしたい。誇りを持つ人が増えれば、他人への称賛や応援も、素直に差し出せるようになる。</p>
          <p>「自分には応援してくれる味方がいる」「だから何が起きても乗り越えられる」。挑戦する誰もがそう思える支援ネットワークを、私たちは創り上げていきます。</p>
        </div>
      </div></section>

      <section className="band"><div className="container">
        <p className="band-label" data-reveal>VALUE</p><p className="band-sub" data-reveal>大切にする価値観</p>
        <h2 className="band-headline" data-reveal>パーパスを達成するための、<br />3つの約束。</h2>
        <div className="value-grid">
          <article className="value-card" data-reveal><p className="number">01</p><h3>誠実であること</h3><p>判断基準は、常に「人として正しいことは何か」。迷う瞬間ほど何をすべきか見失いがちですが、そのとき立ち返るのは「人間として何が大切か」——そこにあると信じています。</p></article>
          <article className="value-card" data-reveal><p className="number">02</p><h3>本質を、<br />考えつづけること</h3><p>原理・原則にもとづいて行動する。トレンドに流されず、「なぜ起きているのか」「本質は何か」を問いつづける。飽くなき探求心を、最も大切にします。</p></article>
          <article className="value-card" data-reveal><p className="number">03</p><h3>尊重し、協力し、<br />事を成すこと</h3><p>組織の土台は、互いを認め尊重しあう感情。相手の価値観や背景を理解する努力を重ね、一人ではなく仲間と共に前進し、物事を実現へ導きます。</p></article>
        </div>
      </div></section>

      <section className="band tint"><div className="container">
        <div className="section-head" data-reveal><p className="band-label">MESSAGE</p><h2>代表メッセージ</h2></div>
        <div className="message-grid">
          <div className="portrait" data-reveal><Image src="/images/portrait-sato.jpg" alt="合同会社Two Rails 代表 佐藤元紀" fill sizes="(max-width: 840px) 300px, 300px" style={{ objectFit: "cover" }} priority /></div>
          <div className="message-body" data-reveal>
            <p>独立以来、多くの企業で新規事業開発やPM・経営顧問として現場に関わってきました。事業の成長が止まる背景を一つひとつ見ていくと、そこには決まって「社長と現場のGAP」が存在していました。</p>
            <p>社長には見えている景色が、現場には届いていない。現場が感じている手触りが、社長には上がってこない。この認識のズレが、良い会社ほど静かに成長を止めていく。私はそれを、何度も目の当たりにしてきました。</p>
            <p>いま私たちは、社長カルテ・リーダーズGAPを通じて、経営者の意思決定と組織の実行のあいだにあるズレを整理し、解消する支援を行っています。経営者の情熱が、放置されないために。</p>
            <div className="career"><h3>PROFILE</h3>1984年、東京都出身。法政大学卒業。新卒でベンチャー企業に入社し、新規事業開発・部門責任者・担当役員を歴任。2018年、上場企業の経営企画部門にて経営戦略の策定や組織内の調整に従事。2023年に独立し、新規事業開発のPM代行を提供しながら、成長企業が陥る組織課題の解決に取り組む。2024年、合同会社Two Railsを設立。経営支援ツールの開発・提供に加え、情熱を持つ起業家の育成やコミュニティ運営も行う。</div>
            <p className="sign"><small>合同会社Two Rails 代表</small>佐藤 元紀</p>
          </div>
        </div>
      </div></section>

      <section className="band"><div className="container">
        <div className="section-head" data-reveal><p className="band-label">COMPANY</p><h2>会社概要</h2></div>
        <table className="profile" data-reveal><tbody>
          <tr><th>会社名</th><td>合同会社Two Rails</td></tr><tr><th>代表</th><td>佐藤 元紀</td></tr><tr><th>設立</th><td>2024年4月</td></tr>
          <tr><th>所在地</th><td>東京都新宿区新宿1-36-2 新宿第七葉山ビル3F</td></tr>
          <tr><th>事業内容</th><td>経営診断アセスメント「社長カルテ」「リーダーズGAP」の開発・提供／権限移譲推進プログラムの提供／経営者・幹部向けエグゼクティブコーチング</td></tr>
          <tr><th>お問い合わせ</th><td><Link href="/contact" className="text-link" style={{ marginTop: 0 }}>お問い合わせフォームへ →</Link></td></tr>
        </tbody></table>
      </div></section>
    </>
  );
}
