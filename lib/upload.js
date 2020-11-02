import baidupcsupload from "./execbaidupcs.js";
import {
    directfailure,
    successerror,
    successmsg,
    fatalerror,
    retrymsg,
} from "./uploadfile.js";
import { retryupload } from "./retryupload.js";
export async function upload(file, destination) {
    const starttime = Date.now();
    let result = { stdout: "", stderr: "" };
    function done() {
        const endtime = Date.now();
        const durtime = (endtime - starttime) / 1000;
        console.log(["初步文件上传成功", file, destination].join("\n"));
        console.log("用时" + durtime + "秒");
        return;
    }
    try {
        result = await baidupcsupload(file, destination);
    } catch (error) {
        const { stdout, stderr, code } = error;
        console.error(error);
        console.error(JSON.stringify({ stdout, stderr }, null, 4));
        if (
            typeof code !== "number" ||
            typeof stdout !== "string" ||
            typeof stderr !== "string"
        ) {
            throw error;
        } else if (
            code === 2 &&
            !directfailure.some((m) => stdout.includes(m)) &&
            successerror.some((m) => stderr?.includes(m)) &&
            successmsg.some((m) => stdout?.includes(m))
        ) {
            done();
            return;
        } else {
            throw error;
        }
    }
    const { stdout, stderr } = result;
    if (fatalerror.some((m) => stdout.includes(m))) {
        throw Object.assign(
            new Error(
                "exec command failure! baidupcs-go:" +
                    "\n" +
                    stdout +
                    "\n" +
                    stderr
            ),
            { stdout, stderr }
        );
    } else if (directfailure.some((m) => stdout.includes(m))) {
        const e = Object.assign(
            new Error(
                "exec command failure! baidupcs-go:" +
                    "\n" +
                    stdout +
                    "\n" +
                    stderr
            ),
            { stdout, stderr }
        );
        console.error(e);
        console.warn(stdout, stderr);
        console.warn("上传失败,5秒后重试:" + file);
        return await retryupload(file, destination);
    } else if (successmsg.some((m) => stdout.includes(m))) {
        done();
        return;
    } else if (retrymsg.some((msg) => stdout.includes(msg))) {
        const e = Object.assign(
            new Error(
                "exec command failure! baidupcs-go:" +
                    "\n" +
                    stdout +
                    "\n" +
                    stderr
            ),
            { stdout, stderr }
        );
        console.error(e);
        console.warn(stdout, stderr);
        console.warn("上传失败,5秒后重试:" + file);
        return await retryupload(file, destination);
    } else {
        throw Object.assign(
            new Error(
                "exec command failure! baidupcs-go:" +
                    "\n" +
                    stdout +
                    "\n" +
                    stderr
            ),
            { stdout, stderr }
        );
    }
}
