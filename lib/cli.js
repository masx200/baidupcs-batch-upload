#!/usr/bin/env node
import fs from "fs";
import path, { dirname } from "path";
import process from "process";
import { fileURLToPath } from "url";
import { argsobj } from "./argsobj.js";
import { start } from "./start.js";
const { input, dest, concurrent } = argsobj;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const helppath = path.join(__dirname, "../help.txt");
const helptxt = String(fs.readFileSync(helppath));
console.log(argsobj);
if (input && dest) {
    console.log({
        input,
        dest,
        concurrent,
    });
    start(input, dest);
} else {
    console.error(helptxt);
    process.exit(1);
}
