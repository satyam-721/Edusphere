export default function Pending({doubtData}){
    return(

        <div class="doubt-card fade-in" data-status="pending">
            <div class="doubt-header">
                <div class="doubt-meta">
                    <span class="subject-badge">{doubtData.subject}</span>
                    <span class="doubt-time">just now</span>
                </div>
                <span class="status-badge pending">Pending</span>
            </div>
            <div class="doubt-question">
                {doubtData.doubt}
            </div>
            <div class="doubt-actions">
                <button class="action-btn" onclick="editDoubt(this)">Edit</button>
                <button class="action-btn" onclick="deleteDoubt(this)">Delete</button>
            </div>
        </div>
    )
}