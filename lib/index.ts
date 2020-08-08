const slicecount = 500;

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
process.on("unhandledRejection", (e) => {
    throw e;
});
let 总数 = 0;
let 完成数 = 0;

/**

 *@param {string} input
 *@param {string} dest
 *  */

async function start(
    input: string,
    dest: string

    /*, reverse = false*/
) {
    const filedatas = await findfile(path.resolve(input));
    // 总数 = filedatas.length;
    console.log("找到文件" + filedatas.length + "个");
    console.log(JSON.stringify(filedatas, null, 4));

    /* 要把文件大小为0的文件排除,否则上传失败 */
    const filesizes = await Promise.all(
        filedatas.map(async (file) => {
            const stat = await fs.promises.stat(file);
            return stat.size;
        })
    );
    const filelist = filedatas.filter((file, index) => {
        return filesizes[index];
    });

    总数 = filelist.length;

    //TODO  上传完大量文件之后会极少的一些文件返回信息上传成功，但实际上上传没有成功！

    //https://github.com/felixonmars/BaiduPCS-Go/issues/20

    //可以使用meta命令来判断文件是否存在

    await handleup(filelist, input, dest);
    console.log("全部处理完成");
}
export { start };
function resolvefiledestination(file: string, input: string, dest: string) {
    const inputbase = path.basename(input);
    const destination = posix.dirname(
        posix
            .resolve(dest, inputbase, path.relative(input, file))
            .replace(/\\/g, "/")
    );
    return destination;
}

async function handleup(filelist: string[], input: string, dest: string) {
    const files = filelist;
    if (!files.length) {
        return;
    } else if (files.length > slicecount) {
        const workfiles = files.slice(0, slicecount);
        const restfiles = files.slice(slicecount);
        await handleup(workfiles, input, dest);
        await handleup(restfiles, input, dest);
        return;
    } else {
        await Promise.all(
            filelist.map(
                /**
                 * @param {string} file
                 */
                async (file, index) => {
                    // 给上传目标文件夹添加了输入文件夹的名字
                    /*
                     */
                    const destination = resolvefiledestination(
                        file,
                        input,
                        dest
                    );

                    await upload(file, destination);
                    完成数++;
                    const 进度 = "完成进度:" + `${完成数} / ${总数}`;
                    console.log(进度);
                }
            )
        );
    }
}
