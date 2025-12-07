import { useEffect, useState } from "react";

export default function Content( {id}) {
    id=id-1;
    const [fetchedNotes, setFetchedNotes] = useState(null);
    console.log("LESSON ID: "+id);

    // fetch from backend
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://localhost:5000/assignmentnotesfetch", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error(`Fetch failed: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched notes:", data[id]);
                setFetchedNotes(data[id]); // store DB result
            } catch (err) {
                console.error("Error fetching doubt types:", err);
            }
        })();
    }, []);

    function switchContent(type) {
        const notesEl = document.getElementById('notesContent');
        const videoEl = document.getElementById('videoContent');
        const assignmentEl = document.getElementById('assignmentContent');

        if (notesEl) notesEl.style.display = 'none';
        if (videoEl) videoEl.style.display = 'none';
        if (assignmentEl) assignmentEl.style.display = 'none';

        if (type === 'notes' && notesEl) {
            notesEl.style.display = 'block';
        } else if (type === 'video' && videoEl) {
            videoEl.style.display = 'block';
        } else if (type === 'assignment' && assignmentEl) {
            assignmentEl.style.display = 'block';
        }
    }

    return(
        <div className="content-section" id="contentSection">
            <h2 className="section-title">📖 Lesson Content</h2>
            
            {/* Notes Content (Default) */}
            <div className="content-viewer" id="notesContent">
                <div style={{ padding: "2rem" }}>
                    {fetchedNotes ? (
                        // Render editorContent (HTML string) from the fetched response
                        <div dangerouslySetInnerHTML={{ __html: fetchedNotes.editorContent }} />
                    ) : (
                        <p style={{ color: "#5f6368" }}>Loading notes...</p>
                    )}
                </div>
            </div>

            {/* Video Content (Hidden by default) */}
            <div className="video-player" id="videoContent" style={{ display: "none" }}>
                <iframe src="https://www.youtube.com/embed/WUvTyaaNkzM" allowFullScreen></iframe>
            </div>

            {/* Assignment Content (Hidden by default) */}
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

            {/* Toggle Buttons */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e0e0e0" }}>
                <button className="quiz-nav-btn secondary" onClick={() => switchContent('notes')}>📖 Notes</button>
                <button className="quiz-nav-btn secondary" onClick={() => switchContent('video')}>🎥 Video</button>
                <button className="quiz-nav-btn secondary" onClick={() => switchContent('assignment')}>📝 Assignment</button>
            </div>
        </div>
    )
}
