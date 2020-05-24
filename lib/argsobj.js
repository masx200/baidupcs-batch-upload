import process from "process";
import { parseargs } from "./parse-args.js";
export const argsobj = parseargs(process.argv.slice(2));
