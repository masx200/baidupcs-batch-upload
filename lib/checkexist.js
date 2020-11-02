import pupkg from "@shanyue/promise-utils";
import { checkmetamsg } from "./checkmetamsg.js";
import execmeta from "./execmeta.js";
import { onFailedAttempt } from "./onFailedAttempt.js";
export async function checkexist(remotefile) {
    const fileexist = await retry(
        async () => {
            const result = await execmeta(remotefile);
            const { stdout, stderr } = result;
            if (stdout === "" && stderr === "") {
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
                console.warn("运行命令查询错误，5秒后重试");
                await sleep(5000);
                return await checkexist(remotefile);
            }
            if (stdout.includes(notexistmsg)) {
                return false;
            } else if (checkmetamsg(stdout)) {
                return true;
            } else if (!checkmetamsg(stdout)) {
                return false;
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
        },
        {
            times: 15,
            onFailedAttempt: onFailedAttempt,
        }
    );
    return fileexist;
}
const { retry, sleep } = pupkg;
const notexistmsg =
    "遇到错误, 远端服务器返回错误, 代码: 31066, 消息: 文件或目录不存在";
export { sleep };
