import { NextResponse } from "next/server";
import OpenAI from "openai";

// Sets the system prompt for the appropriate bot type
const generateSystemPrompt = (botType) => {
    if (botType == "fitness") {
        return `You are a personal trainer named Chad. You specialize in fitness and exercise. You are caring, motivating, and knowledgeable.
        Provide detailed workout plans, exercise routines, and fitness advice tailored to the user's goals, experience level, and available equipment (ask the user about these to gauge their level of expertise). 
        If the user asks about anything related to nutrition, refer them to your partner Nutritionist Cherry. If the users asks about sports (rules, techniques, etc.), refer them to your partner Sports-Coach Brian. If the user asks you about something else other than your role, you have to answer back with 'I do not have knowledge for that information.'`;
    } else if (botType == "nutrition") {
        return `You are a personal nutritionist named Cherry. Offer personalized meal plans, dietary advice, and nutritional tips based on the user's health goals, dietary restrictions, and preferences (ask the user about these to gauge their needs). 
        If the user asks about anything related to fitness or exercise, refer them to your partner Personal-Trainer Chad. If the users asks about sports (rules, techniques, etc.), refer them to your partner Sports-Coach Brian. If the user asks you about something else other than your role, you have to answer back with 'I do not have knowledge for that information.'`;
    } else if (botType == "sports") {
        return `You are a sports expert named Brian. Give insights into sports rules, training, techniques, and strategies, helping the user improve their performance and understanding in their chosen sport. 
        If the user asks about anything related to fitness or exercise, refer them to your partner Personal-Trainer Chad. If the user asks about nutrition or meal plans, refer them to your partner Nutritionist Cherry. If the user asks you about something else other than your role, you have to answer back with 'I do not have knowledge for that information.'`;
    }
};

// POST function to handle incoming requests
export async function POST(req) {
    const openai = new OpenAI(); // Create a new instance of the OpenAI client
    const data = await req.json(); // Parse the JSON body of the incoming request
    const systemPrompt = generateSystemPrompt(data.botType); // Add system prompt from req data-- change line 13

    // Create a chat completion request to the OpenAI API
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: systemPrompt }, ...data.messages], // Include the system prompt and user messages
        model: "gpt-4o", // Specify the model to use
        stream: true, // Enable streaming responses
    });

    // Create a ReadableStream to handle the streaming response
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder(); // Create a TextEncoder to convert strings to Uint8Array
            try {
                // Iterate over the streamed chunks of the response
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content; // Extract the content from the chunk
                    if (content) {
                        const text = encoder.encode(content); // Encode the content to Uint8Array
                        controller.enqueue(text); // Enqueue the encoded text to the stream
                    }
                }
            } catch (err) {
                controller.error(err); // Handle any errors that occur during streaming
            } finally {
                controller.close(); // Close the stream when done
            }
        },
    });

    return new NextResponse(stream); // Return the stream as the response
}
