import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // Adjust import path if needed
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const ChatSidebar = () => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [selectedCoach, setSelectedCoach] = React.useState<string | null>(
        null
    );

    return isOpen ? (
        <aside className="w-1/4 bg-[var(--sidebar)] h-screen">
            <div className="flex flex-col gap-2 h-full justify-center px-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PanelRightOpen
                                strokeWidth={2}
                                onClick={() => setIsOpen(!isOpen)}
                                className="ml-4 mb-2 cursor-pointer"
                            />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Close Sidebar</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <div className="flex flex-col items-center justify-between ">
                    <span className="font-bold uppercase text-primary text-md text-center">
                        Meet your Coaches
                    </span>
                </div>

                {/* Coach Row 1 */}
                <div className="px-4">
                    <Card
                        className={`cursor-pointer hover:shadow-lg transition-shadow ${
                            selectedCoach === "1" ? "border-blue-400" : ""
                        }`}
                        onClick={() => setSelectedCoach("1")}
                    >
                        <CardHeader className="flex flex-row items-center justify-center gap-4">
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-muted-foreground text-sm">
                                Chad, Fitness Coach to personalize your workout
                                plans and training.
                            </p>
                        </CardHeader>
                    </Card>
                </div>

                {/* Coach Row 2 */}
                <div className="px-4">
                    <Card
                        className={`cursor-pointer hover:shadow-lg transition-shadow ${
                            selectedCoach === "2" ? "border-blue-400" : ""
                        }`}
                        onClick={() => setSelectedCoach("2")}
                    >
                        <CardHeader className="flex flex-row items-center justify-center gap-4">
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-muted-foreground text-sm">
                                Cherry, Nutrition Coach to personalize your
                                nutrition plans and diet.
                            </p>
                        </CardHeader>
                    </Card>
                </div>

                {/* Coach Row 3 */}
                <div className="px-4">
                    <Card
                        className={`cursor-pointer hover:shadow-lg transition-shadow ${
                            selectedCoach === "3" ? "border-blue-400" : ""
                        }`}
                        onClick={() => setSelectedCoach("3")}
                    >
                        <CardHeader className="flex flex-row items-center juce gap-4">
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-muted-foreground text-sm">
                                Brian, Knowledge Coach to provide you advice,
                                tips, and facts on all things sports.
                            </p>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </aside>)
        : (
            <div className="flex flex-col items-center justify-center gap-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PanelRightClose
                                strokeWidth={2}
                                onClick={() => setIsOpen(!isOpen)}
                                className="cursor-pointer"
                            />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Open Sidebar</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <span className="font-bold uppercase text-primary text-md text-center">
                    Meet your Coaches
                </span>
            </div>
    );
};

export default ChatSidebar;
