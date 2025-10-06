export default function ProgressBar() {
    return(
        <div className="overall-progress">
            <div className="progress-header">
                <h3 className="progress-title">📊 Overall Learning Progress</h3>
                <div className="progress-percentage">75%</div>
            </div>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: "75%" }}></div>
            </div>
            <div className="progress-stats">
                <div className="stat-item">
                    <div className="stat-value">24</div>
                    <div className="stat-label">Lessons Completed</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">8</div>
                    <div className="stat-label">Pending Items</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">18</div>
                    <div className="stat-label">Quizzes Passed</div>
                </div>
                <div className="stat-item">
                    <div className="stat-value">12</div>
                    <div className="stat-label">Assignments Done</div>
                </div>
            </div>
        </div>
    )
}