#!/usr/bin/env node
/* 添加反向的参数可选 */
//const reverse = !!argsobj["reverse"];
import fs from "fs";
import path, { dirname } from "path";
import process from "process";
import { fileURLToPath } from "url";
import { argsobj } from "./argsobj.js";
import { start } from "./start.js";
const { input, dest, concurrent } = argsobj;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const helppath = path.join(__dirname, "../help.txt");
const helptxt = String(fs.readFileSync(helppath));
console.log(argsobj);
if (input && dest) {
    console.log({
        input,
        dest /*, reverse */,

        concurrent,
    });
    start(input, dest /*, reverse*/);
} else {
    console.error(helptxt);
    // console.error("使用baidupcs-go,百度网盘批量上传图片");
    // console.error("示例:");
    // console.error(
    //     `node ./cli.js --input=D:/baidupandownload/图片输入本地 --dest=/baidupandownload/图片输出网盘`
    // );
    // console.error(
    //     `npx @masx200/baidupcs-batch-upload --input=D:/baidupandownload/图片输入本地 --dest=/baidupandownload/图片输出网盘 --concurrent=20`
    // );
    // console.error("输入的参数有误!");
    process.exit(1);
}
