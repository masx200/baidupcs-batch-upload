import { uploadandcheck } from "./uploadandcheck.js";

export async function retryupload(
    file: string,
    destination: string
): Promise<void> {
    return new Promise((res) => {
        setTimeout(() => {
            res(uploadandcheck(file, destination));
        }, 5000);
    });
}
