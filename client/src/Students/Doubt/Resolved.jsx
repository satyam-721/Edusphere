export default function Resolved({doubtData}) {
    return(

        <div class="doubt-card fade-in" data-status="resolved">
            <div class="doubt-header">
                <div class="doubt-meta">
                    <span class="subject-badge">{doubtData.subject}</span>
                    <span class="doubt-time">3 days ago</span>
                </div>
                <span class="status-badge resolved">Resolved</span>
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
        </div>
    )
}