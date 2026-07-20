import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <div className="container footer-inner">
        <span>©2026 合同会社Two Rails</span>
        <nav className="footer-nav" aria-label="フッターナビゲーション">
          <Link href="/company">会社概要</Link>
          <Link href="/privacy">プライバシーポリシー</Link>
          <Link href="/contact">お問い合わせ</Link>
        </nav>
      </div>
    </footer>
  );
}
