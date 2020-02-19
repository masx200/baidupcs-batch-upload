#!/usr/bin/env node
import process from "process";
import { start } from "./index.js";
import { parseargs } from "./parse-args.js";
const argsobj = parseargs(process.argv.slice(2));
const { input, dest } = argsobj;
if (input && dest) {
    console.log({ input, dest });
    start(input, dest);
}
else {
    console.error("使用baidupcs-go,百度网盘批量上传图片");
    console.error("示例:");
    console.error(`node ./cli.js --input=D:/baidupandownload/图片输入本地 --dest=/baidupandownload/图片输出网盘`);
    console.error("输入的参数有误!");
    process.exit(1);
}
