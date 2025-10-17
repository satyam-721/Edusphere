export default function Answered() {
    return (
        <div class="doubt-card fade-in" data-status="answered">
            <div class="doubt-header">
                <div class="doubt-meta">
                    <span class="subject-badge">Physics</span>
                    <span class="doubt-time">2 hours ago</span>
                </div>
                <span class="status-badge answered">Answered</span>
            </div>
            <div class="doubt-question">
                How do I calculate force using F=ma when the mass is given in grams? Do I need to convert it first?
            </div>
            <div class="doubt-answer">
                <div class="answer-header">
                    <span>✓</span>
                    <span>Teacher's Answer</span>
                </div>
                <div class="answer-text">
                    Yes, you need to convert grams to kilograms first. The SI unit for mass is kilograms (kg). 
                    Simply divide the mass in grams by 1000. For example, 500g = 0.5kg. 
                    Then apply F = ma with mass in kg and acceleration in m/s².
                </div>
            </div>
            <div class="doubt-actions">
                <button class="action-btn primary" onclick="markResolved(this)">Mark as Resolved</button>
                <button class="action-btn" onclick="askFollowUp(this)">Ask Follow-up</button>
            </div>
        </div>
    )
}