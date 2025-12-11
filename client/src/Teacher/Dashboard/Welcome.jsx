import { Link } from "react-router-dom";

export default function Welcome(){

    


    function scrollToView() {
        window.scrollTo({ top: 310, left: 0, behavior: 'smooth' });
        console.log("Scrolled to view");
    }
    return (
            <div className="welcome-section">
                <div className="welcome-content">
                    <h1>Welcome back, Demo Teacher!</h1>
                    <p>.....</p>
                    <div className="quick-actions">
                        <Link to="/teacher/upload" style={{ textDecoration: 'none',color:'inherit' }}>
                        <button className="quick-btn">
                            <div className="quick-btn-icon">+</div>
                                Create Assignment
                        </button>
                        </Link>
                        <Link to="/teacher/upload" style={{ textDecoration: 'none',color:'inherit' }}>
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
                        </Link>
                    </div>
                </div>
            </div>
    )
}