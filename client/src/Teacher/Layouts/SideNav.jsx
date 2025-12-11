import { Link } from "react-router-dom";

export default function SideNav(){
    return(
        <aside className="sidebar">
            <div className="sidebar-section">
                <div className="sidebar-title">Navigation</div>
               
                    {/* <a href="#" className="sidebar-item active"> */}
                    <Link to="/teacher" className="sidebar-item">
                        <div className="sidebar-icon">□</div>
                        <span>Dashboard</span>
                    </Link>
                    {/* </a> */}

                <Link to="/teacher/upload" className="sidebar-item">
                    <div className="sidebar-icon">▤</div>
                    <span>My Classes</span>
                </Link>
                
                <Link to="/teacher/doubt" className="sidebar-item">
                    <div className="sidebar-icon">○</div>
                    
                    <span>Students Doubts</span>
                </Link>

                <Link to="/teacher/upload" className="sidebar-item">
                    <div className="sidebar-icon">◐</div>
                    <span>Assignments</span>
                </Link>
                {/* <a href="#" className="sidebar-item">
                    <div className="sidebar-icon">◒</div>
                    <span>Gradebook</span>
                </a> */}
            </div>
            {/* <div className="sidebar-section">
                <div className="sidebar-title">Tools</div>
                <a href="#" className="sidebar-item">
                    <div className="sidebar-icon">□</div>
                    <span>Lesson Plans</span>
                </a>
                <a href="#" className="sidebar-item">
                    <div className="sidebar-icon">▤</div>
                    <span>Resources</span>
                </a>
                <a href="#" className="sidebar-item">
                    <div className="sidebar-icon">○</div>
                    <span>Virtual Classroom</span>
                </a>
                <a href="#" className="sidebar-item">
                    <div className="sidebar-icon">◐</div>
                    <span>Analytics</span>
                </a>
            </div> */}
        </aside>
    )
}