import { Link } from "react-router-dom";

export default function Welcome(){
    return (
            <div className="welcome-section">
                <div className="welcome-content">
                    <h1>Welcome back, John!</h1>
                    <p>You have 3 classes today and 12 assignments pending review.</p>
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
                        <button className="quick-btn">
                            <div className="quick-btn-icon">📊</div>
                            View Reports
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
    )
}