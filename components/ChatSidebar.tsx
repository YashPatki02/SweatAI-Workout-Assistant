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
import { Separator } from "./ui/separator";

type BotType = "fitness" | "nutrition" | "sports";

type ChatSidebarProps = {
    setBotType: React.Dispatch<React.SetStateAction<BotType>>;
};

const ChatSidebar = (props: ChatSidebarProps) => {
    const { setBotType } = props;
    const [isOpen, setIsOpen] = React.useState(true);
    const [selectedCoach, setSelectedCoach] = React.useState<string | null>(
        '1'
    );

    const handleSelectCoach = (botType: BotType, index: string) => {
        setBotType(botType);
        setSelectedCoach(index);
    };

    return isOpen ? (
        <aside className="w-3/4 z-10 fixed bg-[var(--sidebar)] h-screen md:relative md:w-1/2 lg:relative lg:w-1/4">
            <div className="flex flex-col gap-2 h-full justify-start mt-6 px-4">
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

                <Separator orientation="horizontal" />

                <div className="flex flex-col items-center justify-between mt-2">
                    <span className="font-bold uppercase text-primary text-md text-center">
                        Meet your Coaches
                    </span>
                </div>

                {/* Coach Row 1 */}
                <div className="px-1">
                    <Card
                        className={`cursor-pointer hover:shadow-lg transition-shadow ${
                            selectedCoach === "1" ? "border-blue-400" : ""
                        }`}
                        onClick={() => handleSelectCoach("fitness", "1")}
                    >
                        <CardHeader className="flex flex-row items-center justify-start gap-4">
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-muted-foreground text-sm">
                                Chad, Fitness Coach - Workout, Exercise
                            </p>
                        </CardHeader>
                    </Card>
                </div>

                {/* Coach Row 2 */}
                <div className="px-1">
                    <Card
                        className={`cursor-pointer hover:shadow-lg transition-shadow ${
                            selectedCoach === "2" ? "border-blue-400" : ""
                        }`}
                        onClick={() => handleSelectCoach("nutrition", "2")}
                    >
                        <CardHeader className="flex flex-row items-center justify-start gap-4">
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-muted-foreground text-sm">
                                Cherry, Nutrition Coach - Diet and Food
                            </p>
                        </CardHeader>
                    </Card>
                </div>

                {/* Coach Row 3 */}
                <div className="px-1">
                    <Card
                        className={`cursor-pointer hover:shadow-lg transition-shadow ${
                            selectedCoach === "3" ? "border-blue-400" : ""
                        }`}
                        onClick={() => handleSelectCoach("sports", "3")}
                    >
                        <CardHeader className="flex flex-row items-center justify-start gap-4">
                            <Avatar>
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p className="text-muted-foreground text-sm">
                                Brian, Sports Coach - Rules, Techniques, Facts
                            </p>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </aside>
    ) : (
        <aside className="w-20 bg-[var(--sidebar)] h-screen">
            <div className="flex flex-col gap-2 h-full justify-start mt-6 px-4">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PanelRightClose
                                strokeWidth={2}
                                onClick={() => setIsOpen(!isOpen)}
                                className="ml-4 mb-2 cursor-pointer"
                            />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Open Sidebar</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <Separator orientation="horizontal" />

                {/* Coach Row 1 */}
                <div className="px-4 mt-12 flex flex-col items-center justify-center gap-12">
                    <Avatar
                        className={`cursor-pointer hover:shadow-lg transition-shadow ${
                            selectedCoach === "1"
                                ? "ring-2 ring-blue-400 ring-offset-1"
                                : ""
                        }`}
                        onClick={() => handleSelectCoach("fitness", "1")}
                    >
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <Avatar
                        className={`cursor-pointer hover:shadow-lg transition-shadow ${
                            selectedCoach === "2"
                                ? "ring-2 ring-blue-400 ring-offset-1"
                                : ""
                        }`}
                        onClick={() => handleSelectCoach("nutrition", "2")}
                    >
                        <AvatarImage
                            src="https:///github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <Avatar
                        className={`cursor-pointer hover:shadow-lg transition-shadow ${
                            selectedCoach === "3"
                                ? "ring-2 ring-blue-400 ring-offset-1"
                                : ""
                        }`}
                        onClick={() => handleSelectCoach("sports", "3")}
                    >
                        <AvatarImage
                            src="https:///github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </aside>
    );
};

export default ChatSidebar;
