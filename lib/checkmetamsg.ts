export function checkmetamsg(stdout: string): boolean {
    const infoarr = stdout
        .split("--------------")?.[1]
        ?.split(/\s+/)
        ?.filter(Boolean);

    return infoarr?.[0] === "类型" && infoarr?.[1] === "文件";
}
