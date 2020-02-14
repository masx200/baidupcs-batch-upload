# baidupcs-batch-upload

使用 baidupcs-go,百度网盘批量上传图片

https://github.com/iikira/BaiduPCS-Go

给上传操作限流,防止打开过多报错,默认最多同时运行 15 个上传进程

# 使用方法

安装 `node_modules`

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

# 命令行示例

必选参数 `inputdir`:输入本地图片目录 `string`

必选参数 `destdir`:输出网盘图片目录 `string`

```shell

node ./cli.js --inputdir=D:/baidupandownload/图片输入本地 --destdir=/baidupandownload/图片输出网盘
```
