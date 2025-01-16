import md5 from "md5";
import SM4 from "sm4";

/**
 * @description 青岛智旅 sm4 生成方法
 * @param pwd 需要加密的数据例如 密码之类的
 * @param key 加密的 key
 * */
export function gmcryptSm4(pwd: string, key: string):string {
    const md5Data = md5(key);
    let sm4Config = {
        key: md5Data.substring(md5Data.length - 16),
        iv: md5Data.substring(md5Data.length - 16),
    };
    let sm4 = new SM4(sm4Config);
    let newPassword = pwd.trim();
    return sm4.encrypt(newPassword);
}
