import fs from "fs";
import path, { posix } from "path";
import process from "process";
import findfile from "./findfiles.js";
import { upload } from "./uploadfile.js";
import os from "os";
export const cmd = "win32" === os.platform() ? "BaiduPCS-Go.exe" : "BaiduPCS-Go";
process.on("unhandledRejection", e => {
    throw e;
});
let 总数 = 0;
let 完成数 = 0;
const start = async (inputdir, destdir) => {
    const filedatas = await findfile(path.resolve(inputdir));
    总数 = filedatas.length;
    console.log("找到文件" + filedatas.length + "个");
    console.log(JSON.stringify(filedatas, null, 4));
    const 输入目录名 = path.basename(inputdir);
    const filesizes = await Promise.all(filedatas.map(async (file) => {
        const stat = await fs.promises.stat(file);
        return stat.size;
    }));
    const filelist = filedatas.filter((file, index) => {
        return filesizes[index];
    });
    const destlist = filelist.map(file => {
        const destination = posix.dirname(posix
            .resolve(destdir, 输入目录名, path.relative(inputdir, file))
            .replace(/\\/g, "/"));
        return destination;
    });
    filelist.forEach(async (file, index) => {
        const destination = destlist[index];
        await upload(file, destination);
        完成数++;
        console.log("完成进度:", `${完成数} / ${总数}`);
    });
};
export { start };
