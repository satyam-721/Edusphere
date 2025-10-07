export default function Answered() {
    return (
        <div className="doubt-card fade-in" data-status="answered">
            <div className="doubt-header">
                <div className="doubt-meta">
                    <span className="subject-badge">Physics</span>
                    <span className="doubt-time">2 hours ago</span>
                </div>
                <span className="status-badge answered">Answered</span>
            </div>
            <div className="doubt-question">
                How do I calculate force using F=ma when the mass is given in grams? Do I need to convert it first?
            </div>
            <div className="doubt-answer">
                <div className="answer-header">
                    <span>✓</span>
                    <span>Teacher's Answer</span>
                </div>
                <div className="answer-text">
                    Yes, you need to convert grams to kilograms first. The SI unit for mass is kilograms (kg). 
                    Simply divide the mass in grams by 1000. For example, 500g = 0.5kg. 
                    Then apply F = ma with mass in kg and acceleration in m/s².
                </div>
            </div>
            <div className="doubt-actions">
                <button className="action-btn primary" onclick="markResolved(this)">Mark as Resolved</button>
                <button className="action-btn" onclick="askFollowUp(this)">Ask Follow-up</button>
            </div>
        </div>
    )
}