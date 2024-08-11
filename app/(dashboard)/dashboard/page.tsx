"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Sidebar } from "lucide-react";
import ChatSidebar from "@/components/ChatSidebar";
import ChatHeader from "@/components/ChatHeader";
import Chat from "@/components/Chat";

function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false); // Set back to true later
    const router = useRouter();
    const supabase = createClient();

    const [botType, setBotType] = useState("fitness");

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         setLoading(true);
    //         const {
    //             data: { user },
    //         } = await supabase.auth.getUser();
    //         setUser(user);
    //         setLoading(false);

    //         if (!user) {
    //             router.push("/login"); // Redirect to login if no user
    //         }
    //     };

    //     fetchUser();
    // }, [router, supabase]);

    if (loading) {
        return <p>Loading...</p>; // Show loading page
    }

    return (
        <div className="flex flex-row justify-start items-start overflow-hidden">
            <ChatSidebar setBotType={setBotType} />
            <div className="flex flex-col flex-1">
                <ChatHeader />
                <Chat botType={botType} />
            </div>
        </div>
    );
}

export default Dashboard;
