import { Input } from "@/components/ui/input";
import React, { FormEvent, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { createClient } from "@/utils/supabase/client";
import ChatMessages from "./ChatMessages";
import { LoaderCircle } from "lucide-react";
import { redirect, useRouter } from "next/navigation";

type ChatProps = {
    botType: "fitness" | "nutrition" | "sports";
};

interface Message {
    content: string;
    role: "assistant" | "user";
}

const Chat = (props: ChatProps) => {
    const sendButton = useRef<HTMLButtonElement>(null);
    const router = useRouter();

    const { botType } = props;
    const supabase = createClient();

    const [message, setMessage] = React.useState<Message>({
        role: "user",
        content: "",
    });
    const [messages, setMessages] = React.useState<{
        fitness: Message[];
        nutrition: Message[];
        sports: Message[];
    }>({
        fitness: [],
        nutrition: [],
        sports: [],
    });
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/messages`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleOnChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage({
            role: "user",
            content: e.currentTarget.value,
        });
    };

    const handleSendMessage = async () => {
        const updatedMessages = {
            ...messages,
            [botType]: [...messages[botType], message],
        };

        setMessages(updatedMessages);

        setMessage({ role: "user", content: "" });

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    botType: botType,
                    messages: updatedMessages[botType],
                }),
            }).then(async (res: Response) => {
                const reader = res.body?.getReader();
                const decoder = new TextDecoder();

                let result = "";

                const processText = async ({
                    done,
                    value,
                }: ReadableStreamReadResult<Uint8Array>): Promise<
                    string | undefined
                > => {
                    if (done) {
                        return result;
                    }
                    const text = decoder.decode(value, {
                        stream: true,
                    });

                    setMessages((messages) => {
                        let lastMessage =
                            messages[botType][messages[botType].length - 1];
                        let otherMessages = messages[botType].slice(
                            0,
                            messages[botType].length - 1
                        );

                        if (lastMessage.role === "user") {
                            return {
                                ...messages,
                                [botType]: [
                                    ...otherMessages,
                                    lastMessage,
                                    {
                                        role: "assistant",
                                        content: text,
                                    },
                                ],
                            };
                        } else {
                            return {
                                ...messages,
                                [botType]: [
                                    ...otherMessages,
                                    {
                                        ...lastMessage,
                                        content: lastMessage.content + text,
                                    },
                                ],
                            };
                        }
                    });

                    result += text;
                    return reader?.read().then(processText); // Continue reading the next chunk of the response
                };

                await reader?.read().then(processText);
            });
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    // Handle Enter key press to send the message
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (message.content.trim().length > 0) {
                sendButton.current?.click();
            }
        }
    };

    // const endChat = async () => {
    //     try {
    //         const response = await fetch("/api/messages", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 botType: botType,
    //             }),
    //         });
    //         if (response.ok) {
    //         } else {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //     } catch (error) {
    //         console.error("Error ending chat:", error);
    //     }
    // };

    return (
        <div className="relative flex flex-col flex-1 p-4 px-6">
            <div className="flex flex-row gap-2 items-center justify-between mb-4">
                <h1 className="text-xl font-semibold ">
                    {botType === "fitness"
                        ? "Chat with Chad"
                        : botType === "nutrition"
                        ? "Chat with Cherry"
                        : "Chat with Brian"}
                </h1>
                {/* <Button variant="destructive" onClick={endChat}>
                    End Chat
                </Button> */}
            </div>

            {/* Main content area */}
            <ScrollArea className="h-[70vh] mb-4 px-2">
                {loading ? (
                    <div className="flex justify-center items-center h-1/2">
                        <LoaderCircle
                            size={36}
                            className="text-primary animate-spin"
                        />
                    </div>
                ) : (
                    <ChatMessages messages={messages[botType]} />
                )}
            </ScrollArea>

            {/* Input area */}
            <div className="absolute bottom-4 right-4 left-4 flex flex-row gap-2">
                <Input
                    onChange={handleOnChangeText}
                    placeholder="Search"
                    className="flex-1"
                    value={message.content}
                    onKeyDown={handleKeyDown}
                />
                <Button ref={sendButton} onClick={handleSendMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
};

export default Chat;
