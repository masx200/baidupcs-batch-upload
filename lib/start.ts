import fs from "fs";
import path from "path";
import findfile from "./findfiles.js";
import { handleup } from "./handleup.js";
import { 总数 } from "./index.js";
export { start };

/**

 *@param {string} input
 *@param {string} dest
 *  */

async function start(
    input: string,
    dest: string
    /*, reverse = false*/
) {
    const filedatas = await findfile(path.resolve(input));
    //文件排序一下
    filedatas.sort();
    // 总数 = filedatas.length;
    console.log("找到文件" + filedatas.length + "个");
    console.log(JSON.stringify(filedatas, null, 4));

    /* 要把文件大小为0的文件排除,否则上传失败 */
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

    //TODO  上传完大量文件之后会极少的一些文件返回信息上传成功，但实际上上传没有成功！
    //https://github.com/felixonmars/BaiduPCS-Go/issues/20
    //可以使用meta命令来判断文件是否存在
    await handleup(filelist, input, dest);
    console.log("全部处理完成");
}
