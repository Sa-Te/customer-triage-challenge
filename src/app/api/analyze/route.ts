import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Init Gemini
const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || "",
);

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
        You are an AI support assistant for a Superhero Helpdesk and you will help in classifing tickets for a triage dashboard.
        Analyze this ticket: "${message}"
        
        Classify it into one of these Categories: "Bug", "Billing", "Feature Request", "General".
        Assign a Priority: "High", "Medium", "Low".
        
        Return ONLY a raw JSON object (no markdown formatting) like this:
        { "category": "Bug", "priority": "High" }
        `;

    const result = await model.generateContent(prompt);
    const response = result.response;

    //remove markdown if Gemini add it
    const text = response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      {
        category: "General",
        priority: "Medium",
      },
      { status: 500 },
    );
  }
}
