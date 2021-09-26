# metabase + mongo

```
docker-compose up -d
```

詳しくは下記の記事を参照。

『Metabase と Mongo DB を連携させる(docker-compose 使用)』
https://blog.kwst.site/202109043150/

『Metabase で MongoDB に保存されたデータを可視化する』
https://blog.kwst.site/202109115215/

## Metabase のグラフを外部のサイトに埋め込むサンプル

`docker-compose up`で起動しているときに、下記コマンドでルートディレクトリがホストされたサーバが立ち上がる。`index.html` にアクセスするとグラフが埋め込まれたページが見れる。

```
yarn start
```
