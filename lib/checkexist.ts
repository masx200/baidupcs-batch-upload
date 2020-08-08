export async function checkexist(remotefile){
const  result = await execmeta(remotefile)
    const { stdout, stderr } = result

const 记录日志={

remotefile,
stdout, stderr
}
console.log(JSON.stringify(记录日志,null,4))
}


import execmeta from "./execmeta.js"
