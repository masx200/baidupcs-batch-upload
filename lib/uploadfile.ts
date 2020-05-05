const retrymsg = [
    "以下文件上传失败:",
    "网络错误, http 响应错误,",
    `遇到错误, 远端服务器返回错误, 代码: 31352, 消息: commit superfile2 failed`,
    `网络错误, Post`,
    `json 数据解析失败,`,
    "获取文件列表错误, 获取目录下的文件列表",
    "网络错误, Get",
    `上传文件错误: 上传状态过期, 请重新上传`,
    `上传文件失败, 分片上传—合并分片文件`,
    "全部上传完毕, 总大小: 0B"
];
const successmsg = [
    ", 已存在, 跳过...",
    "秒传成功, 保存到网盘路径:",
    "上传文件成功, 保存到网盘路径:"
];
import baidupcsupload from "./execbaidupcs.js";
/**
 * @param {string} file
 * @param {string} destination
 */
export async function upload(file: string, destination: string) {
    const localfile = file;
    const desdir = destination;
    const result = await baidupcsupload(file, destination);
    const { stdout, stderr } = result;
    const 记录日志 = {
        localfile,
        desdir,
        stdout,
        stderr
    };
    console.log(JSON.stringify(记录日志, null, 4));
    /* 判断是否上传成功与失败 */
    if (successmsg.some(m => stdout.includes(m))) {
        console.log("文件上传成功", file);
        return;
    }

    if (retrymsg.some(msg => stdout.includes(msg))) {
        console.warn(stdout, stderr);
        console.warn("上传失败,5秒后重试:" + file);
        return new Promise(res => {
            setTimeout(() => {
                res(upload(file, destination));
            }, 5000);
        });
    }

    throw new Error(
        "command failure! baidupcs-go:" + JSON.stringify({ stdout, stderr })
    );
}
