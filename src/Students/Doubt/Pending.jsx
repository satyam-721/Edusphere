export default function Pending(){
    return(

        <div class="doubt-card fade-in" data-status="pending">
            <div class="doubt-header">
                <div class="doubt-meta">
                    <span class="subject-badge">Mathematics</span>
                    <span class="doubt-time">5 hours ago</span>
                </div>
                <span class="status-badge pending">Pending</span>
            </div>
            <div class="doubt-question">
                I'm struggling with understanding how to factorize quadratic equations. Can you explain the steps?
            </div>
            <div class="doubt-actions">
                <button class="action-btn" onclick="editDoubt(this)">Edit</button>
                <button class="action-btn" onclick="deleteDoubt(this)">Delete</button>
            </div>
        </div>
    )
}