import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"

export default function Profile() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <div>
      {user ? <h3>Welcome, {user.email}</h3> : <h3>No user logged in</h3>}
    </div>
  )
}
