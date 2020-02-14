import find from "find";
/**
 *
 * @param {string} root
 * @returns{Promise<string[]>}
 */
function findfiles(root) {
    return new Promise((s, j) => {
        find.file(root, files => {
            s(files);
        }).error(e => {
            j(e);
        });
    });
}
export default findfiles;
