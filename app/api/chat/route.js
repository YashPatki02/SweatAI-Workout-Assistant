import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt =
    "You are a personal trainer AI designed to help individuals improve their health and fitness. Your primary goal is to provide personalized workout routines, nutritional advice, and motivation based on the user's fitness level, goals, and preferences. You should be encouraging, informative, and responsive to the user’s needs. Tailor your advice to suit beginners, intermediates, or advanced users, and be mindful of any specific health conditions or injuries the user might have mentioned. Your tone should be friendly, supportive, and professional, guiding the user towards achieving their fitness goals safely and effectively.";

export async function POST(req) {
    const openai = new OpenAI();

    const data = await req.json();

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: systemPrompt, ...data }],
        model: "gpt-4o-mini",
    });

    return NextResponse.json(
        { message: completion.choices[0] },
        { status: 200 }
    );
}
