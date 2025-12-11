import { Link } from "react-router-dom";

export default function Welcome(){
    
    return (
            <div className="welcome-section stu" style={{background: 'linear-gradient(135deg, #34a853, #46d160)'}}>
                <div className="welcome-content">
                    <h1>Welcome back, Satyam!</h1>
                    <p>.....</p>
                    <div className="quick-actions">
                        <Link to="/student/choice" style={{ textDecoration: 'none',color:'inherit' }}>
                        <button className="quick-btn">
                            <div className="quick-btn-icon">+</div>
                                Check Assignments
                        </button>
                        </Link>
                        {/* <Link to="/teacher/upload" style={{ textDecoration: 'none',color:'inherit' }}>
                        <button className="quick-btn">
                            <div className="quick-btn-icon">▶</div>
                            Create Notes
                        </button>
                        </Link>
                        <Link to="/teacher" style={{ textDecoration: 'none',color:'inherit' }}>
                        <button className="quick-btn" onClick={scrollToView}>
                            <div className="quick-btn-icon" >📊</div>
                            View Status
                        </button>
                        </Link> */}
                    </div>
                </div>
            </div>
    )
}