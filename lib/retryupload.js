import { uploadandcheck } from "./uploadandcheck.js";
export async function retryupload(file, destination) {
    return new Promise((res) => {
        setTimeout(() => {
            res(uploadandcheck(file, destination));
        }, 5000);
    });
}
