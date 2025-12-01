export default function Answered({doubtData}) {
    async function markResolved(button) {
        console.log(doubtData.doubt);
        const response = await fetch("http://localhost:5000/doubttype", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: doubtData.doubt,
            })
        });
        console.log(response);
            
    }

    return (
        <div class="doubt-card fade-in" data-status="answered">
            <div class="doubt-header">
                <div class="doubt-meta">
                    <span class="subject-badge">{doubtData.subject}</span>
                    <span class="doubt-time">2 hours ago</span>
                </div>
                <span class="status-badge answered">Answered</span>
            </div>
            <div class="doubt-question">
                {doubtData.doubt}
            </div>
            <div class="doubt-answer">
                <div class="answer-header">
                    <span>✓</span>
                    <span>Teacher's Answer</span>
                </div>
                <div class="answer-text">
                    {doubtData.answer}
                </div>
            </div>
            <div class="doubt-actions">
                <button class="action-btn primary" onClick={()=>markResolved(this)}>Mark as Resolved</button>
                {/* <button class="action-btn" onclick="askFollowUp(this)">Ask Follow-up</button> */}
            </div>
        </div>
    )
}