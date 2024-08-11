import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "./ui/button";

const Chat = () => {
    return (
        <div className="relative flex flex-col flex-1 p-4 px-6 w-full h-screen">
            <h1 className="text-xl font-semibold mb-4">Chat</h1>

            {/* Main content area */}
            <div className="flex-grow">
                <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
            </div>

            {/* Input area */}
            <div className="absolute bottom-0 right-4 left-4 flex flex-row gap-2">
                <Input placeholder="Search" className="flex-1" />
                <Button>Send</Button>
            </div>
        </div>
    );
};

export default Chat;
