# point-app-frontend

ハッカソン 2022 で作成するポイントアプリのフロントエンドプロジェクト

# ローカル環境構築手順

```sh
$ git clone https://github.com/hack-31/point-app-frontend.git
$ cd ./point-app-frontend
$ docker compose build
$ docker compose run --rm node yarn --frozen-lockfile
$ docker-compose up -d
```

[http://localhost:3000/](http://localhost:3000/)にアクセス
