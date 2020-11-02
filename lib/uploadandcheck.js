import { checkexist } from "./checkexist.js";
import path, { posix } from "path";
import { upload } from "./upload.js";
import { retryupload } from "./retryupload.js";
export async function uploadandcheck(file, destination) {
    const inputbase = path.basename(file);
    const remotefile = posix.join(destination, inputbase);
    if (Math.random() > 0.5) {
        const starttime = Date.now();
        const fileexist = await checkexist(remotefile);
        if (fileexist) {
            console.log(
                ["检查网盘中存在此文件，跳过上传成功：", file, remotefile].join(
                    "\n"
                )
            );
            const endtime = Date.now();
            const durtime = (endtime - starttime) / 1000;
            console.log("用时" + durtime + "秒");
            return;
        } else {
            console.warn(
                [
                    "检查网盘中不存在此文件，开始上传文件：",
                    file,
                    remotefile,
                ].join("\n")
            );
        }
    }
    await upload(file, destination);
    const starttime = Date.now();
    const fileexist = await checkexist(remotefile);
    if (fileexist) {
        console.log(
            ["检查网盘中存在此文件，上传文件成功：", file, remotefile].join(
                "\n"
            )
        );
        const endtime = Date.now();
        const durtime = (endtime - starttime) / 1000;
        console.log("用时" + durtime + "秒");
        return;
    } else {
        console.warn(
            ["检查网盘中不存在此文件，重新上传文件：", file, remotefile].join(
                "\n"
            )
        );
        return await retryupload(file, destination);
    }
}
