import { limitexec } from "./limiter.js";
import { cmd } from "./index.js";
export default function execmeta(remotefile) {
    return limitexec(cmd, ["meta", remotefile]);
}
