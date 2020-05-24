# baidupcs-batch-upload

使用 `baidupcs-go`,百度网盘批量上传文件

https://github.com/iikira/BaiduPCS-Go

给上传操作限流,防止打开过多报错,默认最多同时运行 15 个上传进程

如果遇到 8 种网络问题上传失败,则自动重试，比直接用 一个 `BaiduPCS-Go` 命令上传更快

目前适配的版本为

BaiduPCS-Go version v3.6.2

# 使用方法

安装

```shell
npm i -g @masx200/baidupcs-batch-upload
```

## 安装 `node_modules`

```shell
yarn install
```

## 编译脚本

```shell
yarn build
```

## 运行脚本

```shell
yarn start
```

# 使用之前先登陆

```shell
BaiduPCS-Go login
```

# 命令行示例

必选参数 `input`:类型`string`,输入本地文件目录

必选参数 `dest`:类型`string`,输出网盘文件目录

可选参数`concurrent`:类型`number`,同时并发的上传文件个数

```shell

node ./cli.js --input=D:/baidupandownload/图片输入本地 --dest=/baidupandownload/图片输出网盘
```

```shell
npx @masx200/baidupcs-batch-upload --input=D:/baidupandownload/图片输入本地 --dest=/baidupandownload/图片输出网盘
```

```shell
npx @masx200/baidupcs-batch-upload --input=D:/baidupandownload/图片输入本地 --dest=/baidupandownload/图片输出网盘 --concurrent=20
```
