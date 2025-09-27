export default function Welcome(){
    return (
            <div class="welcome-section">
                <div class="welcome-content">
                    <h1>Welcome back, John!</h1>
                    <p>You have 3 classes today and 12 assignments pending review.</p>
                    <div class="quick-actions">
                        <button class="quick-btn">
                            <div class="quick-btn-icon">+</div>
                            Create Assignment
                        </button>
                        <button class="quick-btn">
                            <div class="quick-btn-icon">▶</div>
                            Start Live Class
                        </button>
                        <button class="quick-btn">
                            <div class="quick-btn-icon">📊</div>
                            View Reports
                        </button>
                    </div>
                </div>
            </div>
    )
}