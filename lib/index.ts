export const slicecount = 500;

// const input = `D:/baidupandownload/微博美图相册-2020-02-13`;
// const dest = `/!我的图片-2020-02-10/微博美图相册-2020-02-13`;
import process from "process";
import os from "os";
import { start } from "./start.js";
export const cmd =
    "win32" === os.platform() ? "BaiduPCS-Go.exe" : "BaiduPCS-Go";
process.on("unhandledRejection", (e) => {
    throw e;
});
export let 总数 = {
    value: 0,
    toString() {
        return this.value;
    },
    valueOf() {
        return this.value;
    },
}; //0;
//export let 完成数 ={value:0}// 0;

export { start };

export let 完成数 = {
    value: 0,
    toString() {
        return this.value;
    },
    valueOf() {
        return this.value;
    },
}; //0;
