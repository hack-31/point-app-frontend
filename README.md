# point-app-frontend

ハッカソン 2022 で作成するポイントアプリのフロントエンドプロジェクト

# ローカル環境構築手順

```sh
$ git clone https://github.com/hack-31/point-app-frontend.git
$ cd ./point-app-frontend
$ cp .env.example .env
$ make build-up

# 2回目以降
$ make up
```

[http://localhost:3000/](http://localhost:3000/)にアクセス

# モック API

モック API として[swagger 定義](https://hack-31.github.io/point-app-backend/openapi.yml)を元に作成しております。
`localhost:3001`にアクセスすることで利用できます。（デフォルトで設定済み）
swagger 定義が更新されるとモックサーバーを起動し直してください。

```sh
$ make remock
```

バックエンド側を実際にモックとして使いたい場合などは環境変数`VITE_APP_API_URL`を変更してください

# ディレクトリ構成

ベースは[bulletproof-react](https://github.com/alan2207/bulletproof-react)

```sh
src
├ assets     // 画像などの静的ファイル配置
├ config     // 環境変数は env から直接使用せずにここを挟んで扱いやすくする
├ const      // 全体で使うエラー文言や値などの定数、
├ lib        // 外部のライブラリをアプリ用に使いやすくエクスポートなどを行う
├ utils      // アプリケーション全体で使えるユーティリティ関数
├ styles     // 全体適用CSS
├ routes     // ルーティング
├ prividers  // アプリケーション全体にラップする必要がある場合のProviderを記述
├ hooks      // アプリケーション全体の共通カスタムフック
├ components // アプリケーション全体で共通して利用する部品コンポーネント
│ ├ Button
│ │ ├ index.tsx // Container コンポーネント（ロジック部分）
│ │ ├ Button.tsx // Presentational コンポーネント（UI 部分）
│ │ ├ hook.ts // コンポーネントのカスタムフック
│ │ ├ type.ts // コンポーネントの型定義
│ │ └ functions.ts // コンポーネントの共通メソッド
│ ├ Layout
│ ├ SnackBar
│ └ Modal
├ pages // ページごとに作成
│ ├ Login
│ │ ├ index.tsx
│ │ ├ Login.tsx
│ │ ├ hook.ts
│ │ └ functions.ts
│ └ Signup
├ features // 機能ベースのモジュール群
│ ├ auth
│ │ ├ api
│ │ ├ component
│ │ ├ hooks
│ │ ├ types
│ │ └ index.ts  // export用
│ ├ user
│ └ point
│ └ SendPoint
├ states // Recoil で管理するステート
│ └ auth
│ ├ atoms.ts
│ └ selectors.ts
├ App.tsx   // アプリケーションのルートコンポーネント
├ main.tsx  // ReactDOMを生成するルートコンポーネント
```

# react-qeury

## queryKey のルール

queryKey を指定しなければ、ならないが、その際のルールは、
`api/v1`を省いたパスにすること

```ts
// api/v1/users
const { data } = useQuery(["users"], getUsers);

// api/v1/users/list/2
const { data } = useQuery(["users", "list", "2"], getUsers);
```
