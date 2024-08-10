import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Activity } from "lucide-react";

const Nav = () => {
    return (
        <header className="flex flex-row w-full items-center justify-between px-16 py-4 shadow-md">
            <Link href="/" className="flex flex-row gap-2 items-center">
                <Activity
                    size={24}
                    strokeWidth={3}
                    className="font-bold text-primary"
                />
                <h1 className="text-2xl font-bold">SweatAI</h1>
            </Link>
            <nav className="flex items-center gap-8 space-x-4">
                <Link href="/dashboard">Docs</Link>
                <Link href="/dashboard">About</Link>
                <Link href="/dashboard">Team</Link>

                <Link href="/login">
                    <Button className="text-md">Get Started</Button>
                </Link>
            </nav>
        </header>
    );
};

export default Nav;
