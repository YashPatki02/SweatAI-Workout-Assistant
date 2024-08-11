"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);

            if (!user) {
                router.push("/login"); // Redirect to login if no user
            }
        };

        fetchUser();
    }, [router, supabase]);

    if (loading) {
        return <p>Loading...</p>; // Show loading page
    }

    return (
        <div>
            <h1>Welcome to your Dashboard, {user?.email}</h1>
            <div>Render data here</div>
        </div>
    );
}

export default Dashboard;
