// app/api/gemini/route.ts
import { generateGeminiPrompt } from "@/lib/utils";
import console from "console";
import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = process.env.GEMINI_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { place, budget, duration, currentLocation } = body;

    const prompt = generateGeminiPrompt(
      place,
      budget,
      duration,
      currentLocation
    );

    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!output) {
      return NextResponse.json(
        { error: "No response from Gemini" },
        { status: 500 }
      );
    }

    // Try to parse the JSON safely
    let parsed;
    try {
      parsed = JSON.parse(output.slice(7, output.length - 4));
    } catch (err) {
      console.error("JSON parsing error:", err);
      return NextResponse.json(
        { error: "Gemini returned invalid JSON", raw: output },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: parsed });
  } catch (err) {
    console.error("Gemini error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
