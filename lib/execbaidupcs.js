import { limitexec } from "./limiter.js";
import { cmd } from "./index.js";
export default function execup(localfile, desdir) {
    return limitexec(cmd, ["upload", localfile, desdir]);
}
