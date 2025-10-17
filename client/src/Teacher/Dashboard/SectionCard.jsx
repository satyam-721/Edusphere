export default function SectionCard(){
    return(
        <div className="section-card">
                    <div className="section-header">
                        <h2 className="section-title">Today's Classes</h2>
                        <a href="#" className="section-action">View All</a>
                    </div>
                    <div className="class-item">
                        <div className="class-avatar">M</div>
                        <div className="class-info">
                            <div className="class-name">Mathematics 101</div>
                            <div className="class-details">24 students • Room 205</div>
                        </div>
                        <div className="class-time">
                            <div className="class-time-main">2:00 PM</div>
                            <div className="class-time-sub soon">In 30 min</div>
                        </div>
                    </div>
                    <div className="class-item">
                        <div className="class-avatar">P</div>
                        <div className="class-info">
                            <div className="class-name">Physics Advanced</div>
                            <div className="class-details">18 students • Lab A</div>
                        </div>
                        <div className="class-time">
                            <div className="class-time-main">4:15 PM</div>
                            <div className="class-time-sub later">In 2h 45m</div>
                        </div>
                    </div>
                    <div className="class-item">
                        <div className="class-avatar">C</div>
                        <div className="class-info">
                            <div className="class-name">Chemistry Lab</div>
                            <div className="class-details">22 students • Lab B</div>
                        </div>
                        <div className="class-time">
                            <div className="class-time-main">6:00 PM</div>
                            <div className="class-time-sub later">In 4h 30m</div>
                        </div>
                    </div>
                </div>
    )
}