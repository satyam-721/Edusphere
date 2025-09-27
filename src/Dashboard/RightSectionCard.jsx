export default function RightSectionCard(){
    return(
        <div style={{display: 'grid', gap: '1.5rem'}}>
                    <div class="section-card">
                        <div class="section-header">
                            <h2 class="section-title">Upcoming Events</h2>
                            <a href="#" class="section-action">View Calendar</a>
                        </div>
                        <div class="event-item">
                            <div class="event-date">
                                <div class="event-day">25</div>
                                <div class="event-month">Sep</div>
                            </div>
                            <div class="event-details">
                                <div class="event-title">Parent-Teacher Conference</div>
                                <div class="event-info">3:00 PM - 6:00 PM</div>
                            </div>
                        </div>
                        <div class="event-item">
                            <div class="event-date">
                                <div class="event-day">28</div>
                                <div class="event-month">Sep</div>
                            </div>
                            <div class="event-details">
                                <div class="event-title">Math Test - Grade 10</div>
                                <div class="event-info">Period 3 & 4</div>
                            </div>
                        </div>
                        <div class="event-item">
                            <div class="event-date">
                                <div class="event-day">02</div>
                                <div class="event-month">Oct</div>
                            </div>
                            <div class="event-details">
                                <div class="event-title">Science Fair Planning</div>
                                <div class="event-info">After school meeting</div>
                            </div>
                        </div>
                    </div>

                    <div class="section-card">
                        <div class="section-header">
                            <h2 class="section-title">Recent Activity</h2>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon assignment">A</div>
                            <div class="activity-content">
                                <div class="activity-text">New assignment submitted by Sarah Johnson</div>
                                <div class="activity-time">5 minutes ago</div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon grade">✓</div>
                            <div class="activity-content">
                                <div class="activity-text">Graded 8 assignments for Physics class</div>
                                <div class="activity-time">1 hour ago</div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon message">M</div>
                            <div class="activity-content">
                                <div class="activity-text">Message from parent: Mike Chen</div>
                                <div class="activity-time">2 hours ago</div>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-icon class">C</div>
                            <div class="activity-content">
                                <div class="activity-text">Completed live session: Math 101</div>
                                <div class="activity-time">Yesterday</div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}