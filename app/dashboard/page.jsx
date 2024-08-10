import { createClient } from '@/utils/supabase/server'
import React from 'react'

async function Dashboard() {

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("user", user);

  return (
    <div>
      in Dashboard
    </div>
  )
}

export default Dashboard
