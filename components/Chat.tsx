import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const Chat = () => {
    return (
        <div className="relative flex flex-col flex-1 p-4 px-6">
            <h1 className="text-xl font-semibold mb-4">Chat</h1>

            {/* Main content area */}
            <ScrollArea className="h-[70vh] mb-4">
                <div className="flex flex-col gap-2">
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                    <h3>UHISUHFIUHISUHISUHDISUHFIUHFIUHFIUH</h3>
                </div>
            </ScrollArea>

            {/* Input area */}
            <div className="absolute bottom-0 right-4 left-4 flex flex-row gap-2">
                <Input placeholder="Search" className="flex-1" />
                <Button>Send</Button>
            </div>
        </div>
    );
};

export default Chat;
