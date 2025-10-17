export default function Status(){
    return(
        <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon total">📊</div>
                    </div>
                    <div class="stat-value">12</div>
                    <div class="stat-label">Total Doubts</div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon pending">⏳</div>
                    </div>
                    <div class="stat-value">3</div>
                    <div class="stat-label">Pending</div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon answered">✅</div>
                    </div>
                    <div class="stat-value">7</div>
                    <div class="stat-label">Answered</div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-icon resolved">✓</div>
                    </div>
                    <div class="stat-value">2</div>
                    <div class="stat-label">Resolved</div>
                </div>
            </div>
    )
}