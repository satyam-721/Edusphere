export default function Pending({currDoubt}){
    return(

        <div class="doubt-card fade-in" data-status="pending">
            <div class="doubt-header">
                <div class="doubt-meta">
                    <span class="subject-badge">{currDoubt.subject}</span>
                    <span class="doubt-time">5 hours ago</span>
                </div>
                <span class="status-badge pending">Pending</span>
            </div>
            <div class="doubt-question">
                {currDoubt.doubt}
            </div>
            <div class="doubt-actions">
                <button class="action-btn" onclick="editDoubt(this)">Edit</button>
                <button class="action-btn" onclick="deleteDoubt(this)">Delete</button>
            </div>
        </div>
    )
}