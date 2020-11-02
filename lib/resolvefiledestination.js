import path, { posix } from "path";
export function resolvefiledestination(file, input, dest) {
    const inputbase = path.basename(input);
    const destination = posix.dirname(
        posix
            .resolve(dest, inputbase, path.relative(input, file))
            .replace(/\\/g, "/")
    );
    return destination;
}
