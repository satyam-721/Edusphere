
export default function Intro(){
    
    return(
         <section className="hero" id="home">
        <div className="hero-content">
            <div className="hero-text">
                <h1>Teaching and Learning Made Simple</h1>
                <p>Connect, collaborate, and learn with our comprehensive educational platform designed for modern classrooms and remote learning.</p>
                <div className="hero-buttons">
                    <a href="#" className="btn-primary">
                        <span>Start Teaching</span>
                        <span>→</span>
                    </a>
                    <a href="#" className="btn-secondary">
                        <span>Join as Student</span>
                    </a>
                </div>
            </div>
            <div className="hero-visual">
                <div className="classroom-mockup">
                    <div className="mockup-header">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <div className="course-card">
                        <div className="course-title">Mathematics 101</div>
                        <div className="course-info">Next class: Today 2:00 PM • 24 students</div>
                    </div>
                    <div className="course-card">
                        <div className="course-title">Physics Advanced</div>
                        <div className="course-info">Assignment due: Tomorrow • 18 students</div>
                    </div>
                    <div className="course-card">
                        <div className="course-title">Computer Science</div>
                        <div className="course-info">New material posted • 32 students</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}