import baidupcsupload from "./baidupcsupload.js";
/**
 * @param {string} file
 * @param {string} destination
 */
export async function upload(file, destination) {
    const localfile = file;
    const desdir = destination;
    const result = await baidupcsupload(file, destination);
    const { stdout } = result;
    const 记录日志 = {
        // file,
        localfile,
        desdir,
        stdout
    };
    console.log(JSON.stringify(记录日志, null, 4));
    const errormsg = "全部上传完毕, 总大小: 0B";
    const retrymsg = [
        "获取文件列表错误, 获取目录下的文件列表",
        "网络错误",
        `上传文件错误: 上传状态过期`,
        `上传文件失败, 分片上传—合并分片文件: 遇到错误`
    ];
    if (stdout.includes(errormsg)) {
        if (retrymsg.some(msg => stdout.includes(msg))) {
            console.warn(stdout);
            console.warn("上传失败,5秒后重试:" + file);
            return new Promise(res => {
                setTimeout(() => {
                    res(upload(file, destination));
                }, 5000);
            });
        } else {
            throw new Error("baidupcs-go:" + stdout);
        }
    }
}
