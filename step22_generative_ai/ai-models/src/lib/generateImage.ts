import { textToImage } from "@/utils/text-to-image";
import { promises as fs } from "fs";

export async function generateImage(caption: string): Promise<string | undefined> {
    try {
        const imageBytes = await textToImage({
            inputs: caption,
        });

        // generate file name with caption and save the image
        const fileName = `${caption.replace(/\s+/g, "-")}.png`;
        const filePath = `public/ai-images/${fileName}`;
        await fs.writeFile(filePath, Buffer.from(imageBytes));
        console.log(`Image saved to: ${filePath}`);

        // return the file path
        return filePath;
    } catch (error) {
        console.error(error);

        // return undefined if an error occurs
        return undefined;
    }
}