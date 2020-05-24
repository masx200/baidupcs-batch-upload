#!/usr/bin/env node
import fs from "fs";
import path, { dirname } from "path";
import process from "process";
import { fileURLToPath } from "url";
import { argsobj } from "./argsobj.js";
import { start } from "./index.js";
const { input, dest } = argsobj;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const helppath = path.join(__dirname, "../help.txt");
const helptxt = String(fs.readFileSync(helppath));
if (input && dest) {
    console.log({ input, dest });
    start(input, dest);
}
else {
    console.error(helptxt);
    process.exit(1);
}
