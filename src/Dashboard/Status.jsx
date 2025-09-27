export default function Status(){
    return(
        <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon students"></div>
                        <div class="stat-change">+12 this week</div>
                    </div>
                    <div class="stat-value">156</div>
                    <div class="stat-label">Total Students</div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon classes"></div>
                        <div class="stat-change">3 today</div>
                    </div>
                    <div class="stat-value">8</div>
                    <div class="stat-label">Active Classes</div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon assignments"></div>
                        <div class="stat-change">12 pending</div>
                    </div>
                    <div class="stat-value">45</div>
                    <div class="stat-label">Assignments</div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon messages"></div>
                        <div class="stat-change">5 unread</div>
                    </div>
                    <div class="stat-value">28</div>
                    <div class="stat-label">Messages</div>
                </div>
            </div>
    )
}