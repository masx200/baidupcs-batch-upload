import baidupcsupload from "./execbaidupcs.js";
import {
    directfailure,
    successerror,
    successmsg,
    fatalerror,
    retrymsg,
} from "./uploadfile.js";
import { retryupload } from "./retryupload.js";

/**
 * @param {string} file
 * @param {string} destination
 */

export async function upload(file: string, destination: string): Promise<void> {
    // const localfile = file;
    //  const desdir = destination;
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
            /*
const endtime=Date.now()
const durtime=(endtime-starttime)/1000


            console.log(["初步文件上传成功", file, destination,].join("\n"));

console.log("用时"+durtime+"秒")
*/
            done();
            return;
        } else {
            //如果。找不到 baidupcs-go的可执行文件，则。会在这里报错
            throw error;
        }
    }

    const { stdout, stderr } = result;
    /*  const 记录日志 = {
        localfile,
        desdir,
        stdout,
        stderr,
    };
    console.log(JSON.stringify(记录日志, null, 4));
*/
    //未登录的致命错误要失败
    /* 判断是否上传成功与失败 */
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
        /*throw new Error(
            "exec command failure! baidupcs-go:" + "\n" + stdout + "\n" + stderr
        );*/
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
        // console.log("初步文件上传成功", file, destination);
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
        /*throw new Error(
            "exec command failure! baidupcs-go:" + "\n" + stdout + "\n" + stderr
        );*/
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

/*
Error: spawn BaiduPCS-Go ENOENT
    at Process.ChildProcess._handle.onexit (internal/child_process.js:268:19)
    at onErrorNT (internal/child_process.js:468:16)
    at processTicksAndRejections (internal/process/task_queues.js:84:21) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'spawn BaiduPCS-Go',
  path: 'BaiduPCS-Go',
  spawnargs: [ 'upload', '/sdcard/test/test/文件.txt', '/我 的测试/test' ],
  cmd: 'BaiduPCS-Go upload /sdcard/test/test/文件.txt /我的 测试/test',
  stdout: '',
  stderr: ''
}

*/
/*
Error: Command failed: BaiduPCS-Go.exe upload D:\baidupandownload\微博美图合集-2020-02-15+2020-02-14\图片压缩输出\微博美图合集-2020-02-14\教主Shadow\微博配图\882ab48745b65338f17c993f80d3f15c.webp /我的图片/微博美图合集-2020-02-15+2020-02-14/图片压缩输出/微博美图合集-2020-02-14/教主Shadow/微博配图 panic: runtime error: index out of range goroutine 22 [running]:github.com/iikira/BaiduPCS-Go/internal/pcsfunctions/pcsupload.(*UploadingDatabase).UpdateUploading(0xc0422e48d0, 0xc042222240, 0xc0420f6ee0) /Users/syy/go/src/github.com/iikira/BaiduPCS-Go/internal/pcsfunctions/pcsupload/upload_database.go:101 +0x279github.com/iikira/BaiduPCS-Go/internal/pcscommand.RunUpload.func2.1(0xa60d20, 0xc042580a80, 0xc04205c240) /Users/syy/go/src/github.com/iikira/BaiduPCS-Go/internal/pcscommand/upload.go:355 +0x385github.com/iikira/BaiduPCS-Go/requester/uploader.(*MultiUploader).uploadStatusEvent.func1(0xc04206aa90) /Users/syy/go/src/github.com/iikira/BaiduPCS-Go/requester/uploader/status.go:93 +0x1a1created by github.com/iikira/BaiduPCS-Go/requester/uploader.(*MultiUploader).uploadStatusEvent /Users/syy/go/src/github.com/iikira/BaiduPCS-Go/requester/uploader/status.go:84 +0x4f at ChildProcess.exithandler (child_process.js:303:12) at ChildProcess.emit (events.js:321:20) at maybeClose (internal/child_process.js:1026:16) at Process.ChildProcess._handle.onexit (internal/child_process.js:286:5) { killed: false, code: 2, signal: null, cmd: 'BaiduPCS-Go.exe upload D:\\baidupandownload\\微博美图合集-2020-02-15+2020-02-14\\图片压缩输出\\微博美图合集-2020-02-14\\教主Shadow\\微博配图\\882ab48745b65338f17c993f80d3f15c.webp /我的图片/微博美图合集-2020-02-15+2020-02-14/图片压缩输出/微博美图合集-2020-02-14/教主Shadow/微博配图',

*/
