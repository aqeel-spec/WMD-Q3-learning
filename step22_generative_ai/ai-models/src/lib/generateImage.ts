import { textToImage } from "@/utils/text-to-image";
import { promises as fs } from "fs";
import os from 'os';



const cloudinary = require('cloudinary')

export const cloudinaryCre = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export async function generateImage(title: string, caption: string): Promise<string | undefined> {

    const cloudinaryFolder = "Nextjs AI generated images";
    const tempFolderPath = os.tmpdir();



    try {
        const imageBytes = await textToImage({
            inputs: ` ${caption}`,
        });



        // generate file name with caption and save the image
        const fileName = `${title.replace(/\s+/g, "-")}.png`;
        let filePath = `${tempFolderPath}/${fileName}`;

        await fs.writeFile(filePath, Buffer.from(imageBytes));

        const uploadResult = await cloudinary.v2.uploader.upload(filePath, {
            folder: cloudinaryFolder,
            public_id: fileName,
            tags: "ai",
            overwrite: true
        });
        // cloudinary image url is here
        const imageUrl = await uploadResult.secure_url;

        await fs.unlink(filePath);

        return imageUrl;
    } catch (error) {
        console.error(error);

        // return undefined if an error occurs
        return undefined;
        
    }
}