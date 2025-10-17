export default function Resolved() {
    return(

        <div class="doubt-card fade-in" data-status="resolved">
            <div class="doubt-header">
                <div class="doubt-meta">
                    <span class="subject-badge">Biology</span>
                    <span class="doubt-time">3 days ago</span>
                </div>
                <span class="status-badge resolved">Resolved</span>
            </div>
            <div class="doubt-question">
                Can you explain the process of photosynthesis step by step?
            </div>
            <div class="doubt-answer">
                <div class="answer-header">
                    <span>✓</span>
                    <span>Teacher's Answer</span>
                </div>
                <div class="answer-text">
                    Photosynthesis occurs in two main stages:
                    Light-dependent reactions (in thylakoid membranes) - capture light energy and produce ATP and NADPH.
                    Calvin Cycle (in stroma) - uses ATP and NADPH to convert CO2 into glucose.
                    Overall equation: 6CO2 + 6H2O + light → C6H12O6 + 6O2
                </div>
            </div>
        </div>
    )
}