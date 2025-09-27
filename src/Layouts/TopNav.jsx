
export default function TopNav(){
    return(
    <header className="header">
        <nav className="nav">
            <div className="nav-left">
                <a href="#" className="logo">EduFlow</a>
                <div className="breadcrumb">Teacher Dashboard</div>
            </div>
            <div className="nav-right">
                <button className="nav-button notifications" title="Notifications">
                    <span className="badge">3</span>
                </button>
                <button className="nav-button messages" title="Messages">
                    <span className="badge">5</span>
                </button>
                <button className="nav-button settings" title="Settings"></button>
                <div className="profile-menu">
                    <div className="profile-avatar">JD</div>
                    <span style={{fontWeight:500, color: "#202124"}}>John Doe</span>
                    <span style={{color: "#5f6368", marginLeft: "0.25rem"}}>▼</span>
                </div>
            </div>
        </nav>
    </header>
    )
}