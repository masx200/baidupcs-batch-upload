import path, { posix } from "path";

export function resolvefiledestination(
    file: string,
    input: string,
    dest: string
) {
    const inputbase = path.basename(input);
    const destination = posix.dirname(
        posix
            .resolve(dest, inputbase, path.relative(input, file))
            .replace(/\\/g, "/")
    );
    return destination;
}
