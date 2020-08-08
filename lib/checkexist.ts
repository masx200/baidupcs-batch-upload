export async function checkexist(remotefile:string){
const  result = await retry(
        () => {

execmeta(remotefile)

},{


times: 5,
            onFailedAttempt: async (e) => {
                console.warn(e);
                console.warn("网络错误，3秒后重试");
                await sleep(3000);
            },
})
    const { stdout, stderr } = result

const 记录日志={

remotefile,
stdout, stderr
}
console.log(JSON.stringify(记录日志,null,4))
}


import execmeta from "./execmeta.js"
import pupkg from "@shanyue/promise-utils";
const { retry, sleep } = pupkg;
