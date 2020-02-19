#!/usr/bin/env node
import process from "process";
import { start } from "./index.js";
import { parseargs } from "./parse-args.js";
const argsobj = parseargs(process.argv.slice(2));
const { inputdir, destdir } = argsobj;
if (inputdir && destdir) {
    console.log({ inputdir, destdir });
    start(inputdir, destdir);
}
else {
    console.error("使用baidupcs-go,百度网盘批量上传图片");
    console.error("示例:");
    console.error(`node ./cli.js --inputdir=D:/baidupandownload/图片输入本地 --destdir=/baidupandownload/图片输出网盘`);
    console.error("输入的参数有误!");
    process.exit(1);
}
