"use client";
import React from "react";
import { Send, BicepsFlexed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Chatbots() {
    const [message, setMessage] = React.useState("");
    const [messages, setMessages] = React.useState([
        {
            role: "assistant",
            content:
                "Hi, I'm your personal AI assistant. How can I help you today?",
        },
        {
            role: "user",
            content: "I'm a user",
        },
    ]);

    const handleOnChange = (e: any) => {
        setMessage(e.target.value);
    };

    const handleSubmit = () => {
        setMessage("");
    };

    return (
        <div className={"flex min-h-screen justify-center"}>
            <div className="flex flex-col m-10 w-[500px]">
                {/* Chat Header */}
                <div className="flex flex-row items-center bg-slate-100 p-6 rounded-md">
                    <BicepsFlexed />
                    <p className="ml-4"> Personal Trainer</p>
                </div>

                {/* Messages Display */}
                <div className="flex flex-col overflow-y-scroll h-[100%] bg-slate-400 pt-2">
                    {messages.map((message, index) => {
                        return (
                            <div
                                key={index}
                                className={`max-w-sm rounded-lg p-4 m-2 ${
                                    message.role === "assistant"
                                        ? "bg-primary text-white self-start"
                                        : "bg-white text-gray-800 self-end"
                                }`}
                            >
                                <p>{message.content}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Send Message Component */}
                <div className="relative flex flex-row items-center">
                    <input
                        className="flex-grow p-4 h-16 bg-slate-100 outline-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        type="text"
                        id="message"
                        value={message}
                        onChange={handleOnChange}
                        placeholder="How can I help you?"
                    ></input>
                    <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={handleSubmit}
                    >
                        <Send />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatbots;
