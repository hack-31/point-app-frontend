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
