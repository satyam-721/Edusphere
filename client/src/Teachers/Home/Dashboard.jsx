export default function Dashboard(){
    return(
        <section className="quick-access">
        <div className="container">
            <h2 className="section-title">Experience the Dashboard</h2>
            <div className="role-selector">
                <button className="role-button active" data-preview="teacher">Teacher View</button>
                <button className="role-button" data-preview="student">Student View</button>
            </div>
            <div className="dashboard-preview">
                <div className="preview-tabs">
                    <div className="tab active">Dashboard</div>
                    <div className="tab">Classes</div>
                    <div className="tab">Assignments</div>
                    <div className="tab">Grades</div>
                </div>
                <div className="preview-content" id="preview-content">
                    <div className="mini-card">
                        <h4>Active Classes</h4>
                        <p>3 classes • 78 total students</p>
                    </div>
                    <div className="mini-card">
                        <h4>Pending Assignments</h4>
                        <p>12 submissions to grade</p>
                    </div>
                    <div className="mini-card">
                        <h4>Upcoming Classes</h4>
                        <p>Math 101 - Today 2:00 PM</p>
                    </div>
                    <div className="mini-card">
                        <h4>Recent Activity</h4>
                        <p>5 new forum posts</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}