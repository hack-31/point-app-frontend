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
├ assets // 画像などの静的ファイル配置
├ config // 環境変数はenvから直接使用せずにここを挟んで扱いやすくする
├ lib // ライブラリを直接使用せずにここを挟んで扱いやすくする
├ hooks // アプリケーション全体の共通カスタムフック
├ components // アプリケーション全体で共通して利用する部品コンポーネント
│  ├ Button
│  │  ├ index.tsx  // Containerコンポーネント（ロジック部分）
│  │  ├ Button.tsx  // Presentationalコンポーネント（UI部分）
│  │  ├ hook.ts  // コンポーネントのカスタムフック
│  │  ├ type.ts  // コンポーネントの型定義
│  │  └ functions.ts  // コンポーネントの共通メソッド
│  ├ Layout
│  ├ SnackBar
│  └ Modal
├ pages // ページごとに作成
│   ├ Login
│   │  ├ index.tsx
│   │  ├ Login.tsx
│   │  ├ hook.ts
│   │  ├ type.tsx
│   │  └ functions.ts
│   └ Signup
├ features  // 機能ベースのモジュール群
│  ├ auth
│  │  ├ Login
│  │  ├ Signup
│  │  └ Logout
│  ├ user
│  │  ├ Users
│  │  ├ PersonalInfo
│  │  ├ PasswordReset
│  │  └ Account
│  └ point
│        └ SendPoint
├ routes // ルーティングの設定
│  └ index.tsx
├ globalStates // Recoilで管理するグローバルなステート
│  ├ atoms
│  │  └ user.ts
│  └ selectors
├ App.tsx
├ index.css
├ index.tsx
```