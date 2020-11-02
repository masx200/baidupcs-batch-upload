export const fatalerror = [
    "遇到错误, 远端服务器返回错误, 代码: 31062, 消息: file name is invalid",
    "遇到错误, 远端服务器返回错误, 代码: 31045, 消息: 操作失败, 可能百度帐号登录状态过期",
    "网络错误, http 响应错误, 403 Forbidden",
];
//遇到错误, 远端服务器返回错误, 代码: 31045, 消息: 操作失败, 可能百度帐号登录状态过期, 请尝试重新登录, 消息: user not exists
//export { fatalerror };
export const directfailure = [
    "以下文件上传失败:",

    "全部上传完毕, 总大小: 0B",
    // "ms, 总大小: 0B",
    "打开上传未完成数据库错误:",
];
/*

[1] 加入上传队列: /sdcard/test/test/文件.txt
[1] 准备上传: /sdcard/test/test/文件.txt
[1] 目标文件, /我的测试/test/文件.txt, 已存在, 跳过...

上传结束, 时间: 547ms, 总大小: 0B

*/
export const retrymsg = [
    "网络错误, http 响应错误,",
    "遇到错误, 远端服务器返回错误, 代码: 31352, 消息: commit superfile2 failed",
    "网络错误, Post",
    "json 数据解析失败,",
    "获取文件列表错误, 获取目录下的文件列表",
    "网络错误, Get",
    "上传文件错误: 上传状态过期, 请重新上传",
    "上传文件失败, 分片上传—合并分片文件",
];
export const successmsg = [
    ", 已存在, 跳过...",
    "秒传成功, 保存到网盘路径:",
    "上传文件成功, 保存到网盘路径:",
];
export const successerror = ["panic: runtime error: index out of range"];
