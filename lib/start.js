import fs from "fs";
import path from "path";
import findfile from "./findfiles.js";
import { handleup } from "./handleup.js";
import { 总数 } from "./index.js";
export { start };
async function start(input, dest) {
    const filedatas = await findfile(path.resolve(input));
    filedatas.sort();
    console.log("找到文件" + filedatas.length + "个");
    console.log(JSON.stringify(filedatas, null, 4));
    const filesizes = await Promise.all(
        filedatas.map(async (file) => {
            const stat = await fs.promises.stat(file);
            return stat.size;
        })
    );
    const filelist = filedatas.filter((file, index) => {
        return filesizes[index];
    });
    总数.value = filelist.length;
    await handleup(filelist, input, dest);
    console.log("全部处理完成");
}
