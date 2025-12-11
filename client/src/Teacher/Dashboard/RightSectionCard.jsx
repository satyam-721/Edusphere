export default function RightSectionCard(){
    return(
        <div style={{display: 'grid', gap: '1.5rem'}}>
                    
            <div className="section-card">
                <div className="section-header">
                    <h2 className="section-title">Recent Activity</h2>
                </div>
                <div className="activity-item">
                    <div className="activity-icon assignment">A</div>
                    <div className="activity-content">
                        <div className="activity-text">New assignment submitted by Sarah Johnson</div>
                        <div className="activity-time">5 minutes ago</div>
                    </div>
                </div>
                <div className="activity-item">
                    <div className="activity-icon grade">✓</div>
                    <div className="activity-content">
                        <div className="activity-text">Graded 8 assignments for Physics class</div>
                        <div className="activity-time">1 hour ago</div>
                    </div>
                </div>
                <div className="activity-item">
                    <div className="activity-icon message">M</div>
                    <div className="activity-content">
                        <div className="activity-text">Message from parent: Mike Chen</div>
                        <div className="activity-time">2 hours ago</div>
                    </div>
                </div>
                <div className="activity-item">
                    <div className="activity-icon class">C</div>
                    <div className="activity-content">
                        <div className="activity-text">Completed live session: Math 101</div>
                        <div className="activity-time">Yesterday</div>
                    </div>
                </div>
            </div>
        </div>
    )
}