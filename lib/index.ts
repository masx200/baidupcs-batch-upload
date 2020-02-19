// const input = `D:/baidupandownload/微博美图相册-2020-02-13`;
// const dest = `/!我的图片-2020-02-10/微博美图相册-2020-02-13`;
import fs from "fs";
import path, { posix } from "path";
import process from "process";
import findfile from "./findfiles.js";
import { upload } from "./uploadfile.js";
import os from "os";
export const cmd =
    "win32" === os.platform() ? "BaiduPCS-Go.exe" : "BaiduPCS-Go";
process.on("unhandledRejection", e => {
    throw e;
});
let 总数 = 0;
let 完成数 = 0;

/**
 * 
 * 
 *@param {string} input
 *@param {string} dest
 * 

 *  */

const start = async (input: string, dest: string /*, reverse = false*/) => {
    const filedatas = await findfile(path.resolve(input));
    // 总数 = filedatas.length;
    console.log("找到文件" + filedatas.length + "个");
    console.log(JSON.stringify(filedatas, null, 4));
    const 输入目录名 = path.basename(input);
    /* 要把文件大小为0的文件排除,否则上传失败 */
    const filesizes = await Promise.all(
        filedatas.map(async file => {
            const stat = await fs.promises.stat(file);
            return stat.size;
        })
    );
    const filelist = filedatas.filter((file, index) => {
        return filesizes[index];
    });
    // reverse ? filedatas.reverse() : filedatas;
    总数 = filelist.length;
    const destlist = filelist.map(file => {
        const destination = posix.dirname(
            posix
                .resolve(dest, 输入目录名, path.relative(input, file))
                .replace(/\\/g, "/")
        );
        return destination;
    });

    filelist.forEach(
        /**
         * @param {string} file
         */
        async (file, index) => {
            // 给上传目标文件夹添加了输入文件夹的名字
            /*
             */
            const destination = destlist[index];

            /*posix.dirname(
                posix
                    .resolve(dest, 输入目录名, path.relative(input, file))
                    .replace(/\\/g, "/")
            );*/
            await upload(file, destination);
            完成数++;
            console.log("完成进度:", `${完成数} / ${总数}`);
        }
    );
};
export { start };
