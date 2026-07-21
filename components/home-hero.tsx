import Link from "next/link";

const railCount = 15;
const tieCount = 10;

function MarqueeItems() {
  return (
    <>
      <span>ORGANIZATIONAL DIAGNOSTICS</span>
      <span className="out">GAP</span>
      <span>次の一手 <em>×</em> データ</span>
      <span className="out">TWO RAILS</span>
    </>
  );
}

export function HomeHero() {
  return (
    <>
      <section className="hero">
        <div className="rail-field" aria-hidden="true">
          <div className="horizon-glow" />
          <div className="rail-plane">
            <div className="ties">
              {Array.from({ length: tieCount }, (_, index) => (
                <span
                  className="tie"
                  key={`tie-${index}`}
                  style={{ top: `${index * 10}%`, animationDelay: `${-index * 0.26}s` }}
                />
              ))}
            </div>
            <div className="rail-lines">
              {Array.from({ length: railCount }, (_, index) => (
                <span
                  className="rail"
                  key={`rail-${index}`}
                  style={{
                    left: `${(index / (railCount - 1)) * 100}%`,
                    background: index % 2 === 0 ? "var(--red)" : "var(--sky-deep)",
                    animationDelay: `${-(index % 4) * 0.8}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="container hero-inner">
          <p className="hero-eyebrow">TWO RAILS LLC — ORGANIZATIONAL DIAGNOSTICS</p>
          <h1>
            <span className="ln"><span>情熱が、</span></span>
            <span className="ln"><span>放置されない</span></span>
            <span className="ln"><span>世界を創る。</span></span>
          </h1>
          <span className="rails-mark" aria-hidden="true"><span /><span /></span>
          <p className="hero-sub">Two Railsは、売上を伸ばす<strong>「次の一手」を見つける診断</strong>を中心に、経営支援サービスを開発しています。</p>
          <Link href="/services" className="button hero-cta">サービスを見る</Link>
        </div>
        <div className="scroll-cue" aria-hidden="true">SCROLL</div>
      </section>

      <div className="marquee" aria-label="組織診断、GAP、次の一手とデータ、Two Rails">
        <div className="marquee-track" aria-hidden="true">
          <MarqueeItems />
          <MarqueeItems />
        </div>
      </div>
    </>
  );
}
