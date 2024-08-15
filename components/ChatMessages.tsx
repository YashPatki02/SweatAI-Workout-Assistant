import React from "react";

interface ChatMessagesProps {
    messages: Message[];
}

interface Message {
    content: string;
    role: "assistant" | "user";
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
    return (
        <div className="flex flex-col gap-2 pb-10">
            {messages[0] && messages.map((message: Message, index: number) => (
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
            ))}
        </div>
    );
};

export default ChatMessages;
