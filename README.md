# Two Rails コーポレートサイト

合同会社Two Railsのコーポレートサイトです。Next.js App Router、TypeScript、Tailwind CSSで構築し、Vercelでの運用を想定しています。

## 実装内容

- `/`：トップページ（FV、課題、実績数値、プロダクト、対象別導線、note記事、情熱ピッチ、CTA）
- `/company`：Purpose / Mission / Vision / Value、代表メッセージ、会社概要
- `/services`：社長カルテ、リーダーズGAP、社長カルテPartners（OEM）
- `/contact`：サーバー送信対応のお問い合わせフォーム
- `/privacy`：プライバシーポリシー
- 404ページ、favicon、OGP画像、`sitemap.xml`、`robots.txt`
- 全ページのtitle、description、OGP、canonical
- Organization構造化データ
- stickyヘッダーと、キーボード・Esc・aria属性に対応したモバイルナビ
- IntersectionObserverによる表示アニメーションと数値カウントアップ
- `prefers-reduced-motion` 対応
- Next.js Imageによる画像最適化
- note RSS最新3件取得（1時間キャッシュ）と取得失敗時の代替表示
- 問い合わせの必須入力、クライアント／サーバー両方の検証、送信中・成功・失敗表示、二重送信防止、honeypot

## 未確定項目

以下はコードから分離してあります。確定後に環境変数または該当設定を更新してください。

1. IN NUMBERSのローンチ月・集計時点：公開画面では未確定の月表記を出していません。確定後に `app/page.tsx` へ追記してください。
2. noteアカウント名：`NOTE_ACCOUNT` にnoteのアカウント名（URLの `note.com/` 直後）を設定してください。未設定・取得失敗時は代替記事を表示します。
3. 問い合わせ送信先：`CONTACT_TO_EMAIL` を設定してください。
4. リーダーズGAP専用LP：現在は `https://ceo-sherpa.com/gap.pdf` への暫定リンクです。専用LP公開後に `app/services/page.tsx` のURLを差し替えてください。
5. プライバシーポリシー：公開前に内容、制定日、Cookie・アクセス解析に関する記載を専門家へ確認してください。GA4等を導入する場合は記載を更新してください。

## 必要な環境変数

`.env.example` を `.env.local` にコピーし、値を設定します。`.env.local` はリポジトリへコミットしません。

| 変数 | 必須 | 用途 |
|---|---:|---|
| `NEXT_PUBLIC_SITE_URL` | 本番で必須 | canonical、OGP、sitemap、構造化データの基準URL。例：`https://t-rails.com` |
| `NOTE_ACCOUNT` | note連携時 | noteアカウント名。未設定時は代替表示 |
| `RESEND_API_KEY` | フォーム送信時 | Resendの秘密鍵。サーバーでのみ使用し、ブラウザへ露出しません |
| `CONTACT_TO_EMAIL` | フォーム送信時 | 問い合わせ受信先 |
| `CONTACT_FROM_EMAIL` | フォーム送信時 | Resendで認証済みドメインの送信元。例：`Two Rails <contact@t-rails.com>` |

`RESEND_API_KEY` には `NEXT_PUBLIC_` を付けないでください。付けるとクライアントへ公開される可能性があります。

## ローカル確認

Node.js 20.9以上を使用してください。

```bash
npm install
npm run dev
```

品質確認コマンド：

```bash
npm run lint
npm run typecheck
npm run build
```

## Resend設定

1. Resendでアカウントを作成します。
2. `t-rails.com` をSending Domainへ追加します。
3. Resendが表示するDNSレコードをDNS管理画面へ追加し、認証完了を待ちます。
4. API Keyを発行し、Vercelの `RESEND_API_KEY` に保存します。
5. 認証済みドメインのアドレスを `CONTACT_FROM_EMAIL` に設定します。
6. `CONTACT_TO_EMAIL` に実際の受信先を設定し、Preview環境で送受信テストを行います。

## Vercel設定手順

1. このプロジェクトをGitHub等のGitリポジトリへpushします。
2. Vercelで「Add New Project」からリポジトリをImportします。
3. Framework PresetがNext.js、Root Directoryがこのプロジェクト直下になっていることを確認します。
4. Build Commandは `next build`（通常は自動検出）、Output Directoryは未指定のままにします。
5. Environment Variablesへ上記5変数を登録します。秘密鍵はProduction・Previewそれぞれ必要な範囲だけに設定します。
6. まずPreview Deploymentで5ページ、モバイルメニュー、画像、404、フォーム送信、OGP、`/sitemap.xml`、`/robots.txt` を確認します。
7. 問題がなければProductionへ昇格し、`*.vercel.app` のURLで最終確認します。
8. VercelのDomainsから `t-rails.com` と必要に応じて `www.t-rails.com` を追加します。正規URLへリダイレクトする側を決めます。

## DNS切り替え手順（依頼者が実施）

DNSの変更、ドメイン移管、Wix解約はこの実装では行っていません。認証情報を持つ依頼者が、Vercel画面に表示された最新の値を使って実施してください。

1. 現在のDNSレコードを画面保存またはエクスポートし、復旧できる状態にします。
2. メール運用に使うMX、SPF、DKIM、DMARCなどのTXTレコードを確認し、削除しないよう控えます。
3. 切り替え前にDNSのTTLを短くします。反映には元のTTL分の時間が必要です。
4. VercelのDomains画面に表示されたAレコード／CNAMEを、そのままDNS管理画面へ設定します。値をREADMEの固定値から推測しないでください。
5. `t-rails.com` と `www.t-rails.com` の両方についてVercelの「Valid Configuration」を確認します。
6. HTTPS証明書の発行、正規URLへのリダイレクト、5ページ、問い合わせ送信、メール受信を確認します。
7. 旧Wix URL（例：`/about`）が存在する場合は、アクセスログや旧サイト構成を確認してNext.js側へ301リダイレクトを追加します。
8. 24〜48時間は旧Wixを解約せず、DNS反映と新サイトの安定稼働を監視します。問題時は保存した旧DNS値へ戻します。
9. 十分に確認できた後、Wixの契約・ドメイン自動更新・メール等への影響を確認したうえで、依頼者自身が不要な契約のみ解約します。

## 実装上の補足

- 問い合わせAPIはResend REST APIをサーバー側から呼び出します。秘密鍵はクライアントバンドルに含まれません。
- 二重送信は送信中ボタンの無効化とリクエストIDの短期記録で抑止します。Vercelの複数インスタンスをまたぐ厳密な一意性が必要な場合は、Vercel KV等の永続ストアへ置き換えてください。
- note RSS取得は失敗してもページ全体をエラーにせず、代替記事へ切り替えます。
- プロトタイプ内のTODO、制作メモ、未確定注記は公開画面に含めていません。
