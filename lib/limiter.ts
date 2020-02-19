import AsyncLimiter from "@masx200/async-task-current-limiter";
import { execFile } from "child_process";
import { promisify } from "util";

const limiter = AsyncLimiter(15);
/**
 * @param {any} data
 */
const listener = (data: any) => console.log("限流状态" + JSON.stringify(data));
limiter.target.on("free", listener);
limiter.target.on("full", listener);
const execpro = promisify(execFile);

export const limitexec = limiter.asyncwrap(execpro);
