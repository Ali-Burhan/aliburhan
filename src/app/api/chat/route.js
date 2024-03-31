const { GoogleGenerativeAI } = require("@google/generative-ai");

// 1 
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// 2 
const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 500,
    temperature: 0.7,
    topP: 0.6,
    topK: 16,
  };

// 3 
const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});

// 4
export async function POST(request) {
 const {messages} = await request.json();
 const prompt = messages
 const result = await model.generateContent(prompt);

// 5
 return Response.json(result.response.text() , { status: 200 });
}