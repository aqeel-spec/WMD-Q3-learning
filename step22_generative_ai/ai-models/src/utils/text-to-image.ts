

const API_URL =
  "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";

const headers = {
  Authorization: `Bearer ${process.env.HUGGING_FACE_API}`,
};


export const textToImage =async ( data : any ) => {
    const res = await fetch(`${API_URL}`,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    });
    const result = await res.arrayBuffer();

    return result;
}