export default function Resolved() {
    return(

        <div className="doubt-card fade-in" data-status="resolved">
            <div className="doubt-header">
                <div className="doubt-meta">
                    <span className="subject-badge">Biology</span>
                    <span className="doubt-time">3 days ago</span>
                </div>
                <span className="status-badge resolved">Resolved</span>
            </div>
            <div className="doubt-question">
                Can you explain the process of photosynthesis step by step?
            </div>
            <div className="doubt-answer">
                <div className="answer-header">
                    <span>✓</span>
                    <span>Teacher's Answer</span>
                </div>
                <div className="answer-text">
                    Photosynthesis occurs in two main stages:
                    Light-dependent reactions (in thylakoid membranes) - capture light energy and produce ATP and NADPH.
                    Calvin Cycle (in stroma) - uses ATP and NADPH to convert CO2 into glucose.
                    Overall equation: 6CO2 + 6H2O + light → C6H12O6 + 6O2
                </div>
            </div>
        </div>
    )
}