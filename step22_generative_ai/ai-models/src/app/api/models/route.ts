import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/generateImage";
import openAiModel  from "@/utils/ai";

const { v4: uuidv4 } = require('uuid');

export const POST = async (request: NextRequest) => {
    const body = await request.json();

    try {

        const des : any = await openAiModel(body.title , body.price);
        const jsonResult = JSON.parse(des);
        const imageUrl  = await generateImage( jsonResult.title ,`${jsonResult.prompt}`)

        return NextResponse.json({
            message: "Image generated successfully",
            data: {
                id: uuidv4(),
                ...jsonResult,
                thumbnail: imageUrl
            }
        }, {
            status: 200
        })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Failed to generate ai image",
        }, {
            status: 500
        })
    }

}