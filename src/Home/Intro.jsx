
export default function Intro(){
    
    return(
         <section class="hero" id="home">
        <div class="hero-content">
            <div class="hero-text">
                <h1>Teaching and Learning Made Simple</h1>
                <p>Connect, collaborate, and learn with our comprehensive educational platform designed for modern classrooms and remote learning.</p>
                <div class="hero-buttons">
                    <a href="#" class="btn-primary">
                        <span>Start Teaching</span>
                        <span>→</span>
                    </a>
                    <a href="#" class="btn-secondary">
                        <span>Join as Student</span>
                    </a>
                </div>
            </div>
            <div class="hero-visual">
                <div class="classroom-mockup">
                    <div class="mockup-header">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                    <div class="course-card">
                        <div class="course-title">Mathematics 101</div>
                        <div class="course-info">Next class: Today 2:00 PM • 24 students</div>
                    </div>
                    <div class="course-card">
                        <div class="course-title">Physics Advanced</div>
                        <div class="course-info">Assignment due: Tomorrow • 18 students</div>
                    </div>
                    <div class="course-card">
                        <div class="course-title">Computer Science</div>
                        <div class="course-info">New material posted • 32 students</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}