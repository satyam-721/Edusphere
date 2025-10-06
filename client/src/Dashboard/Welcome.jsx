export default function Welcome(){
    return (
            <div className="welcome-section">
                <div className="welcome-content">
                    <h1>Welcome back, John!</h1>
                    <p>You have 3 classes today and 12 assignments pending review.</p>
                    <div className="quick-actions">
                        <button className="quick-btn">
                            <div className="quick-btn-icon">+</div>
                            Create Assignment
                        </button>
                        <button className="quick-btn">
                            <div className="quick-btn-icon">▶</div>
                            Start Live Class
                        </button>
                        <button className="quick-btn">
                            <div className="quick-btn-icon">📊</div>
                            View Reports
                        </button>
                    </div>
                </div>
            </div>
    )
}