import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/utils/supabase/server";

// Sets the system prompt for the appropriate bot type
const generateSystemPrompt = (botType) => {
    if (botType === "fitness") {
        return `You are a personal trainer. Your name is Chad. Be welcoming and introduce yourself. You specialize in fitness and exercise. You are caring, motivating, and knowledgeable.
        Provide detailed workout plans, exercise routines, and fitness advice tailored to the user's goals, experience level, and available equipment (ask the user about these to gauge their level of expertise). Keep responses to less than 50 words.
        If the user asks about anything related to nutrition, refer them to your partner Nutritionist Cherry. If the users asks about sports (rules, techniques, etc.), refer them to your partner Sports-Coach Brian. If the user asks you about something else other than your role, you have to answer back with 'I do not have knowledge for that information.'`;
    } else if (botType === "nutrition") {
        return `You are a personal nutritionist. Your name is Cherry. Be welcoming and introduce yourself. Offer personalized meal plans, dietary advice, and nutritional tips based on the user's health goals, dietary restrictions, and preferences (ask the user about these to gauge their needs). Keep responses to less than 50 words.
        If the user asks about anything related to fitness or exercise, refer them to your partner Personal-Trainer Chad. If the users asks about sports (rules, techniques, etc.), refer them to your partner Sports-Coach Brian. If the user asks you about something else other than your role, you have to answer back with 'I do not have knowledge for that information.'`;
    } else if (botType === "sports") {
        return `You are a sports expert. Your name is Brian. Be welcoming and introduce yourself. Give insights into sports rules, training, techniques, and strategies, helping the user improve their performance and understanding in their chosen sport. Keep responses to less than 50 words.
        If the user asks about anything related to fitness or exercise, refer them to your partner Personal-Trainer Chad. If the user asks about nutrition or meal plans, refer them to your partner Nutritionist Cherry. If the user asks you about something else other than your role, you have to answer back with 'I do not have knowledge for that information.'`;
    }
};

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// POST function to handle incoming requests
export async function POST(req) {
    const supabase = createClient();
    const reqData = await req.json();
    const systemPrompt = generateSystemPrompt(reqData.botType);

    console.log("Request data:", reqData);

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const { data: chatData, error: chatError } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", user.id)
        .eq("bot_type", reqData.botType)
        .single();

    let newChatData;

    if (!chatData) {
        const { data: newData, error: insertError } = await supabase
            .from("chats")
            .insert([
                {
                    user_id: user.id,
                    bot_type: reqData.botType,
                    system_prompt: systemPrompt,
                },
            ])
            .single();

        if (insertError) {
            console.error("Error inserting chat:", insertError);
            // return new NextResponse("Error creating chat", { status: 500 });
        }

        newChatData = newData;
        console.log("Chat data not found, creating new chat data", newChatData);
    } else {
        newChatData = chatData;
        console.log("Chat data found", newChatData);
    }

    // Insert new messages
    const lastUserMessage = reqData.messages[reqData.messages.length - 1];
    console.log("Last user message:", lastUserMessage);

    const { error: messageError } = await supabase.from("messages").insert([
        {
            chat_id: newChatData.id,
            role: lastUserMessage.role,
            content: lastUserMessage.content,
            user_id: user.id,
        },
    ]);

    if (messageError) {
        console.error("Error inserting message:", messageError);
        // return new NextResponse("Error creating message", { status: 500 });
    }

    let fullMessage = "";

    // Create a chat completion request to the OpenAI API
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: systemPrompt },
            ...reqData.messages,
        ],
        model: "gpt-4",
        stream: true,
    });

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();

            try {
                // Iterate over the streamed chunks of the response
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content;
                    console.log("Chunk content:", content);
                    console.log(typeof content);
                    if (content) {
                        fullMessage += content;
                        controller.enqueue(new TextEncoder().encode(content));
                    }
                }
            } catch (err) {
                controller.error(err); // Handle any errors that occur during streaming
            } finally {
                controller.close(); // Close the stream when done

                 if (fullMessage.trim().length > 0) {
                    const { error: insertMessageError } = await supabase
                        .from("messages")
                        .insert([
                            {
                                chat_id: newChatData.id,
                                role: "assistant",
                                content: fullMessage,
                                user_id: user.id,
                            },
                        ]);

                    if (insertMessageError) {
                        console.error("Error inserting assistant message:", insertMessageError);
                        controller.error(insertMessageError);
                    }
                }
            }
        },
    });

    return new NextResponse(stream, {
        status: 200,
        headers: {
            "Content-Type": "application/octet-stream",
        },
    });
}
