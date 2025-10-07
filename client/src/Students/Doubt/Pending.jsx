export default function Pending({currDoubt}){
    return(

        <div className="doubt-card fade-in" data-status="pending">
            <div className="doubt-header">
                <div className="doubt-meta">
                    <span className="subject-badge">{currDoubt.subject}</span>
                    <span className="doubt-time">5 hours ago</span>
                </div>
                <span className="status-badge pending">Pending</span>
            </div>
            <div className="doubt-question">
                {currDoubt.doubt}
            </div>
            <div className="doubt-actions">
                <button className="action-btn" onclick="editDoubt(this)">Edit</button>
                <button className="action-btn" onclick="deleteDoubt(this)">Delete</button>
            </div>
        </div>
    )
}