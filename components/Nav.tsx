import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Activity, Menu, LucideLogOut } from "lucide-react";
import Logout from "./Logout";
import { createClient } from "@/utils/supabase/server";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Nav = async () => {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <header className="flex flex-row w-full items-center justify-between px-12 py-4 shadow-md">
            <Link href="/" className="flex flex-row gap-2 items-center">
                <Activity
                    size={24}
                    strokeWidth={3}
                    className="font-bold text-primary"
                />
                <h1 className="text-2xl font-bold">SweatAI</h1>
            </Link>
            <nav className="hidden items-center gap-8 space-x-4 sm:flex">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/dashboard">Team</Link>

                {user === null ? (
                    <Link href="/login">
                        <Button className="text-md">Get Started</Button>
                    </Link>
                ) : (
                    <Logout />
                )}
            </nav>
            <div className="flex items-center sm:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Menu />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side="bottom"
                        sideOffset={12}
                        align="end"
                        className="w-[200px]"
                    >
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="/dashboard">Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/dashboard">Team</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            {user === null ? (
                                <Link href="/login">
                                    <Button className="text-md">
                                        Get Started
                                    </Button>
                                </Link>
                            ) : (
                                <Logout />
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Nav;
