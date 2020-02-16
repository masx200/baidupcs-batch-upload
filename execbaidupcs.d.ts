/// <reference types="node" />
export default function(
    localfile: string,
    desdir: string
): import("child_process").PromiseWithChild<{
    stdout: string;
    stderr: string;
}>;
