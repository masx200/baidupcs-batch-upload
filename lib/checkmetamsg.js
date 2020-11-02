export function checkmetamsg(stdout) {
    const infoarr = stdout
        .split("--------------")?.[1]
        ?.split(/\s+/)
        ?.filter(Boolean);
    if (!infoarr) {
        return false;
    }
    if (infoarr?.indexOf("文件大小") < 0) {
        return false;
    }
    const sizenotzero = !infoarr?.[infoarr.indexOf("文件大小") + 1]?.startsWith(
        "0"
    );
    return !!(
        infoarr?.[0] === "类型" &&
        infoarr?.[1] === "文件" &&
        sizenotzero
    );
}
