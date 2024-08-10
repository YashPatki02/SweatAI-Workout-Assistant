import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signOut() {
    "use server";

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect("/error");
    }

    revalidatePath("/", "layout");
    return redirect("/login");
};

