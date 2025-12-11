import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../Auth/SupabaseClient"; 
import { useNavigate } from 'react-router-dom';


export default function TopNav() {
    const navigate = useNavigate();
    async function handleLogout() {
        await supabase.auth.signOut();  
        navigate('/');     
    }             
    const [open, setOpen] = useState(false);

    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-left">
                    <Link style={{ textDecoration:'none', color:'inherit' }} to="/student" className="logo">LearnSphere</Link>
                    <div className="breadcrumb">Student Dashboard</div>
                </div>

                <div className="nav-right">
                    <div 
                        className="profile-menu"
                        onClick={() => setOpen(!open)}
                        style={{ cursor: "pointer", position: "relative" }}
                    >
                        <div className="profile-avatar">DT</div>
                        <span style={{ fontWeight:500, color: "#202124" }}>Satyam</span>
                        {open && (
                            <div className="dropdown">
                                <button className="logout-btn" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
