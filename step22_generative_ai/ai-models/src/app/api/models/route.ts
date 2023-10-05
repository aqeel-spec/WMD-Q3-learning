import { NextRequest, NextResponse } from "next/server";
import { generateImage } from "@/lib/generateImage";
import { aiModel } from "@/utils/openAI";


export const POST =async (request : NextRequest) => {
    const body = await request.json();

    try {
        //const imageUrl = await generateImage(`${body.title}`)
        const des = await aiModel(body.title , body.price);
        const jsonResult = JSON.parse(des);

        return NextResponse.json({
            message : "Image generated successfully",
          //  url : imageUrl,
            aiData : jsonResult
        }, {
            status : 200
        })
    } catch (error : any) {
        console.log(error )
        return NextResponse.json({
            success : false,
            message : "Failed to generate ai image",
        }, {
            status : 500
        })
    }

}