export function checkmetamsg(stdout: string): boolean {
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
/*
[
  '类型',
  '文件',
  '文件路径',
  '/装机软件/QQLight_7.9.14308.0.exe',
  '文件名称',
  'QQLight_7.9.14308.0.exe',
  '文件大小',
  '48842424,',
  '46.579765MB',
  'md5',
  '(截图请打码)',
  '1ccc5df82e68c2f5028379dec0a047c1',
  'app_id',
  '266719',
  'fs_id',
  '173360764722406',
  '创建日期',
  '2016-10-24',
  '23:25:13',
  '修改日期',
  '2016-10-24',
  '23:25:13'
]

注：分享链接转存功能无法使用，可使用-cookies参数重新登录以启用
[0] - [/装机软件/QQLight_7.9.14308.0.exe] --------------

  类型              文件
  文件路径          /装机软件/QQLight_7.9.14308.0.exe
  文件名称          QQLight_7.9.14308.0.exe
  文件大小          48842424, 46.579765MB
  md5 (截图请打码)  1ccc5df82e68c2f5028379dec0a047c1
  app_id            266719
  fs_id             173360764722406
  创建日期          2016-10-24 23:25:13
  修改日期          2016-10-24 23:25:13
*/
