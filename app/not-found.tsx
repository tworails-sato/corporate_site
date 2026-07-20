import Link from "next/link";
import { Rails } from "@/components/rails";

export default function NotFound() {
  return (
    <div className="not-found"><div className="container"><p className="code">404 — NOT FOUND</p><h1>ページが見つかりません。</h1><Rails /><p>お探しのページは移動または削除された可能性があります。</p><Link href="/" className="button">トップページへ戻る</Link></div></div>
  );
}
