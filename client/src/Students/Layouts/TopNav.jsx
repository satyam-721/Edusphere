import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../Auth/SupabaseClient"; 
import { useNavigate } from 'react-router-dom';


export default function TopNav({loadAiChat}) {

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
                    <div className="aichaticon">
                    {/* AI chat icon */}
                        <style>{`
                            .ai-chat-icon {
                                background: #f1f3f4;
                                padding: 6px;
                                border-radius: 8px;
                                box-shadow: 0 1px 3px rgba(0,0,0,0.08);
                                transition: transform .15s ease, box-shadow .15s ease, background .15s ease, color .15s ease;
                                display: inline-flex;
                                align-items: center;
                                opacity:0.3;
                            }
                            .ai-chat-icon:hover {
                                transform: translateY(-3px);
                                box-shadow: 0 6px 18px rgba(0,0,0,0.12);
                                background: #e8f0fe;
                                color: #0b63d6;
                            }
                            .ai-chat-icon svg { display: block; }
                        `}</style>
                        <div
                            className="ai-chat-icon"
                            title="AI Chat"
                            style={{ marginRight: 16, cursor: "pointer", color: "#1a73e8" }}
                            role="button"
                            onClick={loadAiChat}
                        >
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-label="AI Chat"
                                role="img"
                            >
                                <path
                                    d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                />
                                {/* neural nodes */}
                                <circle cx="9.5" cy="9.5" r="1.2" fill="currentColor" />
                                <circle cx="14.5" cy="7.5" r="1.2" fill="currentColor" />
                                <circle cx="14.5" cy="12.5" r="1.2" fill="currentColor" />
                                {/* connections */}
                                <path d="M9.9 9.4L13.1 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.1 9.6L13.6 12.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
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
