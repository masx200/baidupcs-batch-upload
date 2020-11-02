import process from "process";
import { uploadandcheck } from "./uploadandcheck.js";
import { resolvefiledestination } from "./resolvefiledestination.js";
import { slicecount, 完成数, 总数 } from "./index.js";
export async function handleup(filelist, input, dest) {
    const files = filelist;
    if (!files.length) {
        return;
    } else if (files.length > slicecount) {
        const workfiles = files.slice(0, slicecount);
        const restfiles = files.slice(slicecount);
        await handleup(workfiles, input, dest);
        await handleup(restfiles, input, dest);
        return;
    } else {
        await Promise.all(
            filelist.map(async (file) => {
                const destination = resolvefiledestination(file, input, dest);
                await uploadandcheck(file, destination);
                完成数.value++;
                const 进度 =
                    "完成进度:" +
                    `${(完成数.value / 总数.value) * 100} % ` +
                    `${完成数.toString()} / ${总数.valueOf()}`;
                console.log(进度);
                process.title = 进度;
            })
        );
    }
}
