export default function SectionCard(){
    return(
        <div class="section-card">
                    <div class="section-header">
                        <h2 class="section-title">Today's Classes</h2>
                        <a href="#" class="section-action">View All</a>
                    </div>
                    <div class="class-item">
                        <div class="class-avatar">M</div>
                        <div class="class-info">
                            <div class="class-name">Mathematics 101</div>
                            <div class="class-details">24 students • Room 205</div>
                        </div>
                        <div class="class-time">
                            <div class="class-time-main">2:00 PM</div>
                            <div class="class-time-sub soon">In 30 min</div>
                        </div>
                    </div>
                    <div class="class-item">
                        <div class="class-avatar">P</div>
                        <div class="class-info">
                            <div class="class-name">Physics Advanced</div>
                            <div class="class-details">18 students • Lab A</div>
                        </div>
                        <div class="class-time">
                            <div class="class-time-main">4:15 PM</div>
                            <div class="class-time-sub later">In 2h 45m</div>
                        </div>
                    </div>
                    <div class="class-item">
                        <div class="class-avatar">C</div>
                        <div class="class-info">
                            <div class="class-name">Chemistry Lab</div>
                            <div class="class-details">22 students • Lab B</div>
                        </div>
                        <div class="class-time">
                            <div class="class-time-main">6:00 PM</div>
                            <div class="class-time-sub later">In 4h 30m</div>
                        </div>
                    </div>
                </div>
    )
}