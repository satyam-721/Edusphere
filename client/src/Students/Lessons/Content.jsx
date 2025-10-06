export default function Content() {


    function switchContent(type) {
            document.getElementById('notesContent').style.display = 'none';
            document.getElementById('videoContent').style.display = 'none';
            document.getElementById('assignmentContent').style.display = 'none';

            if (type === 'notes') {
                document.getElementById('notesContent').style.display = 'block';
            } else if (type === 'video') {
                document.getElementById('videoContent').style.display = 'block';
            } else if (type === 'assignment') {
                document.getElementById('assignmentContent').style.display = 'block';
            }
        }

    return(
        <div className="content-section" id="contentSection">
            <h2 className="section-title">📖 Lesson Content</h2>
            
            {/* <!-- Notes Content (Default) --> */}
            <div className="content-viewer" id="notesContent">
                <div style={{ padding: "2rem" }}>
                    <h3 style={{ marginBottom: "1rem", color: "#1a73e8" }}>Introduction to Linear Equations</h3>
                    <p style={{ marginBottom: "1rem", lineHeight: 1.8 }}>
                        A linear equation is an algebraic equation in which each term is either a constant or the product of a constant and a single variable. 
                        Linear equations can have one or more variables.
                    </p>
                    <h4 style={{ margin: "1.5rem 0 0.75rem 0", color: "#202124" }}>Standard Form</h4>
                    <p style={{ marginBottom: "1rem", lineHeight: 1.8 }}>
                        The standard form of a linear equation in one variable is: <strong>ax + b = 0</strong>, where a and b are constants and x is the variable.
                    </p>
                    <h4 style={{ margin: "1.5rem 0 0.75rem 0", color: "#202124" }}>Key Concepts</h4>
                    <ul style={{ marginLeft: "1.5rem", lineHeight: 2 }}>
                        <li>A linear equation has at most one solution</li>
                        <li>The graph of a linear equation is always a straight line</li>
                        <li>Linear equations can be solved by isolating the variable</li>
                        <li>The solution represents where the line crosses the x-axis</li>
                    </ul>
                    <h4 style={{ margin: "1.5rem 0 0.75rem 0", color: "#202124" }}>Example Problems</h4>
                    <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px", border: "1px solid #e0e0e0", marginBottom: "1rem" }}>
                        <strong>Example 1:</strong> Solve for x: 2x + 6 = 14<br />
                        <em style={{ color: "#5f6368" }}>Solution: x = 4</em>
                    </div>
                    <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px", border: "1px solid #e0e0e0" }}>
                        <strong>Example 2:</strong> Solve for x: 5x - 3 = 2x + 9<br />
                        <em style={{ color: "#5f6368" }}>Solution: x = 4</em>
                    </div>
                </div>
            </div>

            {/* <!-- Video Content (Hidden by default) --> */}
            <div className="video-player" id="videoContent" style={{ display: "none" }}>
                <iframe src="https://www.youtube.com/embed/WUvTyaaNkzM" allowFullScreen></iframe>
            </div>

            {/* <!-- Assignment Content (Hidden by default) --> */}
            <div className="assignment-details" id="assignmentContent" style={{ display: "none" }}>
                <h4 style={{ marginBottom: "1rem" }}>Assignment Instructions</h4>
                <p style={{ marginBottom: "1.5rem", lineHeight: 1.6 }}>
                    Complete the following problems on linear equations. Show all your work and submit your answers before the deadline.
                    This assignment will help you practice solving different types of linear equations.
                </p>
                <div className="detail-row">
                    <span className="detail-label">Due Date</span>
                    <span className="detail-value deadline-badge">Oct 10, 2024 - 11:59 PM</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Total Points</span>
                    <span className="detail-value">100</span>
                </div>
                <div className="detail-row">
                    <span className="detail-label">Submission Status</span>
                    <span className="detail-value" style={{ color: "#fbbc04" }}>Not Submitted</span>
                </div>
                <button className="download-btn">
                    <span>📥</span>
                    <span>Download Assignment PDF</span>
                </button>
            </div>

            {/* <!-- Toggle Buttons --> */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e0e0e0" }}>
                <button className="quiz-nav-btn secondary" onClick={() => switchContent('notes')}>📖 Notes</button>
                <button className="quiz-nav-btn secondary" onClick={() => switchContent('video')}>🎥 Video</button>
                <button className="quiz-nav-btn secondary" onClick={() => switchContent('assignment')}>📝 Assignment</button>
            </div>
        </div>
    )
}