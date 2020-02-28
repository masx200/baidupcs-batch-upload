import AsyncLimiter from "@masx200/async-task-current-limiter";
import { execFile } from "child_process";
import { promisify } from "util";
const limiter = AsyncLimiter(12);
const execpro = promisify(execFile);
export const limitexec = limiter.asyncwrap(execpro);
