export const slicecount = 500;
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
};
export { start };
export let 完成数 = {
    value: 0,
    toString() {
        return this.value;
    },
    valueOf() {
        return this.value;
    },
};
