export default function Dashboard(){
    return(
        <section class="quick-access">
        <div class="container">
            <h2 class="section-title">Experience the Dashboard</h2>
            <div class="role-selector">
                <button class="role-button active" data-preview="teacher">Teacher View</button>
                <button class="role-button" data-preview="student">Student View</button>
            </div>
            <div class="dashboard-preview">
                <div class="preview-tabs">
                    <div class="tab active">Dashboard</div>
                    <div class="tab">Classes</div>
                    <div class="tab">Assignments</div>
                    <div class="tab">Grades</div>
                </div>
                <div class="preview-content" id="preview-content">
                    <div class="mini-card">
                        <h4>Active Classes</h4>
                        <p>3 classes • 78 total students</p>
                    </div>
                    <div class="mini-card">
                        <h4>Pending Assignments</h4>
                        <p>12 submissions to grade</p>
                    </div>
                    <div class="mini-card">
                        <h4>Upcoming Classes</h4>
                        <p>Math 101 - Today 2:00 PM</p>
                    </div>
                    <div class="mini-card">
                        <h4>Recent Activity</h4>
                        <p>5 new forum posts</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}