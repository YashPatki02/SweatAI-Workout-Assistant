import { Input } from "@/components/ui/input";
import React, { FormEvent } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

type ChatProps = {
    botType: string;
};

const Chat = (props: ChatProps) => {
    const { botType } = props;

    const [message, setMessage] = React.useState("");
    const [messages, setMessages] = React.useState([
        {
            role: "assistant",
            content:
                "Hi, I'm your personal AI assistant. How can I help you today?",
        },
    ]);

    const handleOnChangeText = (e: React.FormEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
    };

    const handleSendMessage = async () => {
        setMessage("");
        setMessages((messages) => [
            ...messages,
            { role: "user", content: message }, // Add the user's message to the chat
            { role: "assistant", content: "" }, // Add a placeholder for the assistant's response
        ]);

        // Send the message to the server
        const response = fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                botType: botType,
                messages: [...messages, { role: "user", content: message }],
            }),
        }).then(async (res: Response) => {
            const reader = res.body?.getReader(); // Get a reader to read the response body
            const decoder = new TextDecoder(); // Create a decoder to decode the response text

            let result = "";
            // Function to process the text from the response
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
                }); // Decode the text

                setMessages((messages) => {
                    let lastMessage = messages[messages.length - 1];
                    let otherMessages = messages.slice(0, messages.length - 1);
                    return [
                        ...otherMessages,
                        { ...lastMessage, content: lastMessage.content + text },
                    ];
                });

                result += text;
                return reader?.read().then(processText); // Continue reading the next chunk of the response
            };

            await reader?.read().then(processText);
        });
    };

    return (
        <div className="relative flex flex-col flex-1 p-4 px-6">
            <h1 className="text-xl font-semibold mb-4">Chat</h1>

            {/* Main content area */}
            <ScrollArea className="h-[70vh] mb-4">
                <div className="flex flex-col gap-2">
                    {messages.map((message, index) => {
                        return (
                            <div
                                key={index}
                                className={`max-w-2xl rounded-lg p-4 m-2 break-words overflow-wrap break-word ${
                                    message.role === "assistant"
                                        ? "bg-primary text-white self-start"
                                        : "bg-slate-200 text-gray-800 self-end"
                                }`}
                            >
                                <p>{message.content}</p>
                            </div>
                        );
                    })}
                </div>
            </ScrollArea>

            {/* Input area */}
            <div className="absolute bottom-0 right-4 left-4 flex flex-row gap-2">
                <Input
                    onChange={handleOnChangeText}
                    placeholder="Search"
                    className="flex-1"
                    value={message}
                />
                <Button onClick={handleSendMessage}>Send</Button>
            </div>
        </div>
    );
};

export default Chat;
