# ベースイメージはお好みで普通のでもalpineでも。
FROM node:8.12.0-slim
ENV APP_ROOT /app/

WORKDIR $APP_ROOT

# package.jsonとpackage-lock.jsonを先にコピー。
# package*.jsonだけを先に個別コピーすることで、パッケージ変更時は`RUN npm install`が走るが
# それ以外のファイル変更時は同コマンドにはキャッシュ利用で飛ばされるため、ビルド時間を短縮できる。
COPY package*.json $APP_ROOT
RUN npm install

# その他ファイルをコピー。
COPY . $APP_ROOT