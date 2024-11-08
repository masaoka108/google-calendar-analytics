# Google Calendar Analytics

このプロジェクトは、Googleカレンダーと連携して予定を分析し、各タイトルにかけた時間を可視化するWebアプリケーションです。

## 機能

- Googleカレンダーとの連携
- 予定のタイトルごとの時間集計
- データのリスト形式と円グラフでの可視化
- 月ごとの集計と前後の月への移動

## 必要条件

- Node.js (v14以上)
- npm または yarn
- Google Cloud Platformのプロジェクト（APIキーとOAuth 2.0クライアントID）

## セットアップ

1. リポジトリをクローンします：

   ```
   git clone https://github.com/yourusername/google-calendar-analytics.git
   cd google-calendar-analytics
   ```

2. 依存関係をインストールします：

   ```
   npm install
   # または
   yarn install
   ```

3. `.env.local`ファイルをプロジェクトのルートに作成し、以下の環境変数を設定します：

   ```
   NEXT_PUBLIC_GOOGLE_API_KEY=あなたのGoogleAPIキー
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=あなたのGoogleクライアントID
   ```

   これらの値は、Google Cloud Consoleから取得できます。

4. アプリケーションを開発モードで実行します：

   ```
   npm run dev
   # または
   yarn dev
   ```

5. ブラウザで `http://localhost:3000` を開きます。

## 使用方法

1. アプリケーションを開くと、「Sign In with Google」ボタンが表示されます。
2. ボタンをクリックしてGoogleアカウントでログインします。
3. 認証が完了すると、現在の月のカレンダーデータが表示されます。
4. 「Previous Month」と「Next Month」ボタンを使用して、異なる月のデータを表示できます。
5. データは、イベントのリストと時間配分を示す円グラフで表示されます。

## 注意事項

- このアプリケーションは、個人的な使用やデモンストレーション目的で作成されています。実際の運用環境では、セキュリティを強化するためにサーバーサイドでの認証処理を実装することをお勧めします。
- Google Calendar APIの使用制限に注意してください。頻繁なAPIコールは制限を超える可能性があります。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルを参照してください。

## 貢献

プルリクエストは歓迎します。大きな変更を加える場合は、まずissueを開いて変更内容を議論してください。

## サポート

問題や質問がある場合は、GitHubのissueを開いてください。

# next-template

A Next.js 13 template for building apps with Radix UI and Tailwind CSS.

## Usage

```bash
npx create-next-app -e https://github.com/shadcn/next-template
```

## Features

- Next.js 13 App Directory
- Radix UI Primitives
- Tailwind CSS
- Icons from [Lucide](https://lucide.dev)
- Dark mode with `next-themes`
- Tailwind CSS class sorting, merging and linting.

## License

Licensed under the [MIT license](https://github.com/shadcn/ui/blob/main/LICENSE.md).

