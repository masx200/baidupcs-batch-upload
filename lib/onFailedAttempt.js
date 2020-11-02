import { sleep } from "./checkexist.js";
import { fatalerror } from "./uploadfile.js";
export async function onFailedAttempt(e) {
    console.warn(e);
    const stdout = Reflect.has(e, "stdout") && Reflect.get(e, "stdout");
    if (typeof stdout !== "string") {
        throw e;
    }
    if (fatalerror.some((m) => stdout.includes(m))) {
        throw e;
    }
    console.warn("运行命令查询错误，4秒后重试");
    await sleep(4000);
}
