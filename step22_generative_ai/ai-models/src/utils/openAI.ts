import { OpenAI } from "langchain/llms/openai";


const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});



export async function aiModel(title: string, price: number | string) {

  let text;

  if (title === '' && price === 0 || "") {
    text = `Create a product having title and price \
        first create title and price, title should be any name of e-commerce store product then generate product using this title and price \
        if should look like professional \
        like amazon , ali baba , daraz etc.
        title
        desciption
        price
        discountPercentage
        rating
        stock \ stock should be number like 12 , 34 etc. not in boolean form
        brand
        category \ it should not contain array just only one category
        thumbnail
        images : []
      
    `;
  } else {
    text = `Create a product having title and price \
      if there is values of ${title} and price ${price} then generate product using this title and price \
      if should look like professional \
      like amazon , ali baba , daraz etc.
      title
      desciption
      price
      discountPercentage
      rating
      stock \ stock should be number like 12 , 34 etc. not in boolean form
      brand
      category \ it should not contain array just only one category
      prompt \ create a prompt for the image generation  it should look like real image not cartoonish
      thumbnail
      images : []
    
    `;
  }


  const prompt = `
    Generate a json with details enclosing in the tripple brackets
    """${text}"""
    `
  const result = await llm.predict(prompt);
  // Parse the JSON result
  
  return result
}
