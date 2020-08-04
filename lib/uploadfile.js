const fatalerror = [
    "遇到错误, 远端服务器返回错误, 代码: 31045, 消息: 操作失败,",
];
const directfailure = [
    "以下文件上传失败:",
    "全部上传完毕, 总大小: 0B",
    "ms, 总大小: 0B",
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
    const localfile = file;
    const desdir = destination;
    let result = { stdout: "", stderr: "" };
    try {
        result = await baidupcsupload(file, destination);
    } catch (error) {
        const { stdout, stderr } = error;
        console.error(error);
        console.error(JSON.stringify({ stdout, stderr }, null, 4));
        if (
            successerror.some((m) => stderr?.includes(m)) &&
            successmsg.some((m) => stdout?.includes(m))
        ) {
            console.log("文件上传成功", file);
            return;
        } else {
            throw error;
        }
    }
    const { stdout, stderr } = result;
    const 记录日志 = {
        localfile,
        desdir,
        stdout,
        stderr,
    };
    console.log(JSON.stringify(记录日志, null, 4));
    if (fatalerror.some((m) => stdout.includes(m))) {
        throw new Error(
            "exec command failure! baidupcs-go:" + "\n" + stdout + "\n" + stderr
        );
    } else if (directfailure.some((m) => stdout.includes(m))) {
        console.warn(stdout, stderr);
        console.warn("上传失败,5秒后重试:" + file);
        return new Promise((res) => {
            setTimeout(() => {
                res(upload(file, destination));
            }, 5000);
        });
    } else if (successmsg.some((m) => stdout.includes(m))) {
        console.log("文件上传成功", file);
        return;
    } else if (retrymsg.some((msg) => stdout.includes(msg))) {
        console.warn(stdout, stderr);
        console.warn("上传失败,5秒后重试:" + file);
        return new Promise((res) => {
            setTimeout(() => {
                res(upload(file, destination));
            }, 5000);
        });
    } else {
        throw new Error(
            "exec command failure! baidupcs-go:" + "\n" + stdout + "\n" + stderr
        );
    }
}
