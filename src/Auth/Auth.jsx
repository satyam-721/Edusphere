import React, { useState } from "react"
import { supabase } from "./supabaseClient"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    if (error) setMessage(error.message)
    else setMessage("Check your email to confirm sign-up!")
  }

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) setMessage(error.message)
    else setMessage("Logged in successfully!")
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Supabase Auth</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleSignUp}>Sign Up</button>
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  )
}
