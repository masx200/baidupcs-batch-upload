/// <reference types="node" />
export default function execmeta(
    remotefile: string
): import("child_process").PromiseWithChild<{
    stdout: string;
    stderr: string;
}>;
