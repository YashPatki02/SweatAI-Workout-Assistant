import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Adjust import path if needed

const ChatSidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white h-auto p-4">
            <div className="grid grid-rows-5 gap-4 h-full">
                <div className="row-span-1">
                    <h1 className="text-2xl font-bold">SweatAI</h1>
                </div>

                {/* Image Row 1 */}
                <div className="row-span-1">
                    <Image
                        src="/hero.png"
                        alt="Image 1"
                        width={256}
                        height={144}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Image Row 2 */}
                <div className="row-span-1">
                    <Image
                        src="/hero.png"
                        alt="Image 2"
                        width={256}
                        height={144}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Image Row 3 */}
                <div className="row-span-1">
                    <Image
                        src="/hero.png"
                        alt="Image 3"
                        width={256}
                        height={144}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Buttons Row */}
                <div className="row-span-1 flex flex-col justify-between">
                    <div className="flex flex-col gap-2">
                        <Button className="bg-blue-500 hover:bg-blue-600">
                            Update Profile
                        </Button>
                        <Button className="bg-red-500 hover:bg-red-600">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default ChatSidebar;
