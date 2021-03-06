# try_labelmake

## nodenv で node リスト最新化

```bash
$ git -C "$(nodenv root)"/plugins/node-build pull
...
 create mode 100644 share/node-build/14.15.5
 create mode 100644 share/node-build/15.6.0
 create mode 100644 share/node-build/15.7.0
 create mode 100644 share/node-build/15.8.0
$ nodenv install --list |grep ^14.15
14.15.0
14.15.1
14.15.2
14.15.3
14.15.4
14.15.5
$ nodenv versions
* 14.15.3 (set by /home/***/.anyenv/envs/nodenv/version)
  14.16.0
```

## node ローカルインストール

```bash
$ nodenv local 14.16.0
$ node -v
v14.16.0
$ npm -v
6.14.11
```

## koa2/typescript 環境構築

- [Koa.js ミドルウェアの作り方](https://qiita.com/kei-nakoshi/items/904c46faff621c1be674)
- [TypeScript Ninja](http://typescript.ninja/typescript-in-definitelyland/index.html)
- [TypeScript Deep Dive 日本語版](https://typescript-jp.gitbook.io/deep-dive/)
- [Node.js & TypeScriptのプロジェクト作成](https://typescript-jp.gitbook.io/deep-dive/nodejs)

```bash
$ npm init -y
$ npm i -D typescript @types/node ts-node
$ npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom --module commonjs
$ cp -p package.json package.json.org
$ vi package.json
$ diff package.json package.json.org 
7,8d6
<     "8443": "PORT=8443 ts-node src/index.ts",
<     "start": "sudo ts-node src/index.ts",
$ npm i -S koa
$ npm i -D @types/koa
$ cat src/index.ts 
import Koa from 'koa'

// Koa2 サーバ初期設定
const app = new Koa()

// ミドルウェア設定
app.use(async (ctx, next) => {
  ctx.body = "koa app."
})

// サーバ起動
const port = process.env.PORT || 443
app.listen(port)
$ npm run 8443    # Ctrl-C で停止。http://localhost:8443 でアクセス
```
