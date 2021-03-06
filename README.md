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
