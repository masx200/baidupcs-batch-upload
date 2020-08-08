import { limitexec } from "./limiter.js";

import { cmd } from "./index.js";

export default function execmeta(remotefile: string) {
    return limitexec(cmd, ["meta", remotefile]);
}
