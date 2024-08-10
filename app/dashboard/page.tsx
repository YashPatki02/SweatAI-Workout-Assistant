"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Console } from "console";

function Dashboard() {
  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    console.log('log out')
    return redirect("/login");
  };
  const [user, setUser] = useState<Object | null>(null);
  //   const [data, setData] = useState<any[]>([]); // Adjust type based on your actual data structure
  const [loading, setLoading] = useState(true); // Added loading state
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // If not authenticated, redirect to login
        router.push("/login");
      } else {
        console.log(session.user.email);
        setUser(session.user);
        setLoading(false);
        // Implement fetch data from the backend
      }
    };

    checkUser();
  }, [router, supabase]);

  if (loading) {
    return <p>Loading...</p>; // show loading page
  }
  return (
    <div>
      <h1>Welcome to your Dashboard, {user?.email}</h1>
      <div>Render data here</div>

      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  );
}

export default Dashboard;
