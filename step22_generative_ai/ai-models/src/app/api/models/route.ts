import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/generateImage";
import openAiModel  from "@/utils/ai";

const { v4: uuidv4 } = require('uuid');

const defaultImg = "https://img.freepik.com/free-vector/artificial-intelligence-concept-design-with-face_1017-18296.jpg?w=996&t=st=1697439178~exp=1697439778~hmac=3b2a9603cc89f568da86061342dd98649ccbd5ed55d37c1f22ef7a4c18d4e549"

export const POST = async (request: NextRequest) => {
    const body = await request.json();

    try {
        const des : any = await openAiModel(body.title , body.price);
        const jsonResult = JSON.parse(des);
        const imageUrl  = await generateImage( jsonResult.title ,`${jsonResult.description}`)
        return NextResponse.json({
            message: "Image generated successfully",
            data: {
                id: uuidv4(),
                ...jsonResult,
                thumbnail: imageUrl ? imageUrl : defaultImg
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