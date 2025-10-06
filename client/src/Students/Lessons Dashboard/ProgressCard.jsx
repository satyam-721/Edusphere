export default function ProgressCard() {
    return(
        <div className="subjects-section">
            <h2 className="section-title">📈 Subject Progress Overview</h2>
            <div className="subject-progress-cards">
                <div className="progress-card">
                    <div className="circular-progress">
                        <svg width="120" height="120">
                            <circle cx="60" cy="60" r="52" className="circle-bg"></circle>
                            <circle cx="60" cy="60" r="52" className="circle-progress" 
                                    style={{ stroke: "#1a73e8", strokeDasharray: 327, strokeDashoffset: 104.64 }}></circle>
                        </svg>
                        <div className="progress-text">68%</div>
                    </div>
                    <div className="progress-card-title">🔢 Mathematics</div>
                    <div className="progress-card-desc">10/15 lessons completed</div>
                </div>

                <div className="progress-card">
                    <div className="circular-progress">
                        <svg width="120" height="120">
                            <circle cx="60" cy="60" r="52" className="circle-bg"></circle>
                            <circle cx="60" cy="60" r="52" className="circle-progress" 
                                    style={{ stroke: "#34a853", strokeDasharray: 327, strokeDashoffset: 45.78 }}></circle>
                        </svg>
                        <div className="progress-text">86%</div>
                    </div>
                    <div className="progress-card-title">⚗️ Science</div>
                    <div className="progress-card-desc">12/14 lessons completed</div>
                </div>

                <div className="progress-card">
                    <div className="circular-progress">
                        <svg width="120" height="120">
                            <circle cx="60" cy="60" r="52" className="circle-bg"></circle>
                            <circle cx="60" cy="60" r="52" className="circle-progress" 
                                    style={{ stroke: "#fbbc04", strokeDasharray: 327, strokeDashoffset: 163.5 }}></circle>
                        </svg>
                        <div className="progress-text">50%</div>
                    </div>
                    <div className="progress-card-title">🔬 Physics</div>
                    <div className="progress-card-desc">5/10 lessons completed</div>
                </div>

                <div className="progress-card">
                    <div className="circular-progress">
                        <svg width="120" height="120">
                            <circle cx="60" cy="60" r="52" className="circle-bg"></circle>
                            <circle cx="60" cy="60" r="52" className="circle-progress" 
                                    style={{ stroke: "#9c27b0", strokeDasharray: 327, strokeDashoffset: 107.91 }}></circle>
                        </svg>
                        <div className="progress-text">67%</div>
                    </div>
                    <div className="progress-card-title">📖 English</div>
                    <div className="progress-card-desc">8/12 lessons completed</div>
                </div>
            </div>
        </div>
    )
}