import { NextResponse } from "next/server";
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

const firstMessage = (botType) => {
    if (botType === "fitness") {
        return `Hi, I'm Chad, your personal trainer. How can I help you today?`;
    }
    if (botType === "nutrition") {
        return `Hi, I'm Cherry, your personal nutritionist. How can I help you today?`;
    }
    if (botType === "sports") {
        return `Hi, I'm Brian, your sports expert. How can I help you today?`;
    }
};

async function fetchChatAndMessages(supabase, userId, botType) {
    // Fetch chat data
    const { data: chatData, error: chatError } = await supabase
        .from("chats")
        .select("*")
        .eq("user_id", userId)
        .eq("bot_type", botType)
        .single();

    if (chatError) {
        console.error(`Error fetching ${botType} chat data:`, chatError);
        // throw new Error(`Error fetching ${botType} chat data`);
    }

    let newChatData = chatData;

    if (!chatData) {
        const { data: insertedChat, error: insertError } = await supabase
            .from("chats")
            .insert([
                {
                    user_id: userId,
                    bot_type: botType,
                    system_prompt: generateSystemPrompt(botType),
                },
            ])
            .single();

        if (insertError) {
            console.error("Error inserting chat:", insertError);
            // return new NextResponse("Error creating chat", { status: 500 });
        }

        newChatData = insertedChat;
        console.log("Chat data not found, creating new chat data", newChatData);
    }

    // Fetch messages
    const { data: messages, error: messageError } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", newChatData.id)
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

    if (messageError) {
        console.error(`Error fetching ${botType} messages:`, messageError);
        throw new Error(`Error fetching ${botType} messages`);
    }

    let resultMessages = messages;

    if (!messages || messages.length === 0) {
        // Create the first message
        const { data: newMessage, error: messageInsertError } = await supabase
            .from("messages")
            .insert([
                {
                    chat_id: newChatData.id,
                    role: "assistant",
                    content: firstMessage(botType),
                    user_id: userId,
                },
            ]);

        if (messageInsertError) {
            console.error("Error inserting message:", messageError);
            // return new NextResponse("Error creating message", { status: 500 });
        }

        resultMessages = [newMessage];
    }

    return { messages: resultMessages, error: null };
}

export async function GET(req) {
    const supabase = createClient();

    // Handle user authentication
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        // Fetch chat and messages for all bot types
        const [fitnessData, nutritionData, sportsData] = await Promise.all([
            fetchChatAndMessages(supabase, user.id, "fitness"),
            fetchChatAndMessages(supabase, user.id, "nutrition"),
            fetchChatAndMessages(supabase, user.id, "sports"),
        ]);

        // Combine messages
        const messages = {
            fitness: fitnessData.messages,
            nutrition: nutritionData.messages,
            sports: sportsData.messages,
        };

        return new NextResponse(JSON.stringify(messages), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

// export async function POST(req) {
//     const supabase = createClient();
//     const reqData = await req.json();

//     // Handle user authentication
//     const {
//         data: { user },
//         error: authError,
//     } = await supabase.auth.getUser();

//     if (authError || !user) {
//         return new NextResponse("Unauthorized", { status: 401 });
//     }

//     try {
//         const { data: chatData, error: chatError } = await supabase
//             .from("chats")
//             .select("*")
//             .eq("user_id", user.id)
//             .eq("bot_type", reqData.botType)
//             .single();

//         if (chatError || !chatData) {
//             console.error("Error fetching chat data:", chatError);
//             return new NextResponse("Error fetching chat data", { status: 500 });
//         }

//         console.log("Chat data:", chatData);
//         console.log("User data:", user);

//         const { data:deleted, error: messageError } = await supabase
//             .from("chats")
//             .delete()
//             .eq("id", chatData.id)
//             .select()

//         console.log("Deleted:", deleted);

//         if (messageError) {
//             console.error("Error deleting messages:", messageError);
//             return new NextResponse("Error deleting messages", { status: 500 });
//         }

//         return new NextResponse("Messages deleted", { status: 200 });
//     } catch (error) {
//         console.error("Error processing request:", error);
//         return new NextResponse("Internal Server Error", { status: 500 });
//     }

// }