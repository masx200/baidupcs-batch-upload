const slicecount = 500;
import fs from "fs";
import path, { posix } from "path";
import process from "process";
import findfile from "./findfiles.js";
import { uploadandcheck } from "./uploadfile.js";
import os from "os";
export const cmd =
    "win32" === os.platform() ? "BaiduPCS-Go.exe" : "BaiduPCS-Go";
process.on("unhandledRejection", (e) => {
    throw e;
});
let 总数 = 0;
let 完成数 = 0;
async function start(input, dest) {
    const filedatas = await findfile(path.resolve(input));
    filedatas.sort();
    console.log("找到文件" + filedatas.length + "个");
    console.log(JSON.stringify(filedatas, null, 4));
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
    await handleup(filelist, input, dest);
    console.log("全部处理完成");
}
export { start };
function resolvefiledestination(file, input, dest) {
    const inputbase = path.basename(input);
    const destination = posix.dirname(
        posix
            .resolve(dest, inputbase, path.relative(input, file))
            .replace(/\\/g, "/")
    );
    return destination;
}
async function handleup(filelist, input, dest) {
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
            filelist.map(async (file, index) => {
                const destination = resolvefiledestination(file, input, dest);
                await uploadandcheck(file, destination);
                完成数++;
                const 进度 =
                    "完成进度:" +
                    `${(完成数 / 总数) * 100} % ` +
                    `${完成数} / ${总数}`;
                console.log(进度);
                process.title = 进度;
            })
        );
    }
}
