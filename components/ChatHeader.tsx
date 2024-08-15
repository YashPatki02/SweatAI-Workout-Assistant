import React from "react";
import { Activity, LucideLogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface ChatHeaderProps {
    botType: "fitness" | "nutrition" | "sports";
}

const ChatHeader = ({ botType }: ChatHeaderProps) => {
    const supabase = createClient();
    const router = useRouter();
    
    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            router.push("/");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    }

    return (
        <div className="flex flex-row items-center justify-between p-4 px-6 w-full border-border bg-[var(--chat)]">
            <Link href="/">
                <div className="flex flex-row gap-2 items-center justify-center">
                    <Activity
                        size={20}
                        strokeWidth={3}
                        className="font-bold text-primary"
                    />
                    <h1 className="text-2xl font-bold">SweatAI</h1>
                </div>
            </Link>
            <h3 className="text-md text-center text-muted-foreground">
                {botType === "fitness"
                    ? "Fitness"
                    : botType === "nutrition"
                    ? "Nutrition"
                    : "Sports"}
            </h3>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    sideOffset={12}
                    align="end"
                    className="w-[200px]"
                >
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                        <LucideLogOut size={15} className="mr-2" /> Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ChatHeader;
