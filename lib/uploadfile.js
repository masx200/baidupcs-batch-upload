const fatalerror = [
    "遇到错误, 远端服务器返回错误, 代码: 31062, 消息: file name is invalid",
    "遇到错误, 远端服务器返回错误, 代码: 31045, 消息: 操作失败, 可能百度帐号登录状态过期",
    "网络错误, http 响应错误, 403 Forbidden",
];
export { fatalerror };
const directfailure = [
    "以下文件上传失败:",
    "全部上传完毕, 总大小: 0B",
    "打开上传未完成数据库错误:",
];
const retrymsg = [
    "网络错误, http 响应错误,",
    "遇到错误, 远端服务器返回错误, 代码: 31352, 消息: commit superfile2 failed",
    "网络错误, Post",
    "json 数据解析失败,",
    "获取文件列表错误, 获取目录下的文件列表",
    "网络错误, Get",
    "上传文件错误: 上传状态过期, 请重新上传",
    "上传文件失败, 分片上传—合并分片文件",
];
const successmsg = [
    ", 已存在, 跳过...",
    "秒传成功, 保存到网盘路径:",
    "上传文件成功, 保存到网盘路径:",
];
import baidupcsupload from "./execbaidupcs.js";
const successerror = ["panic: runtime error: index out of range"];
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
async function retryupload(file, destination) {
    return new Promise((res) => {
        setTimeout(() => {
            res(uploadandcheck(file, destination));
        }, 5000);
    });
}
import { checkexist } from "./checkexist.js";
import path, { posix } from "path";
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
