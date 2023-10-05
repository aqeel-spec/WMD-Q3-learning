import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/generateImage";


export const POST =async (request : NextRequest) => {
    const body = await request.json();

    try {
        const imageUrl = await generateImage(`
         create image like a original of ${body.title}
        `)
        return NextResponse.json({
            success : true,
            message : "Image generated successfully",
            url : imageUrl
        })
    } catch (error) {
        console.log(error)
    }

}