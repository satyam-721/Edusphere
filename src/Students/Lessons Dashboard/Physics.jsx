export default function Physics({toggleSubject,viewContent}){
    return(
        <div className="subject-card" id="physics-card">
            <div className="subject-header"  onClick={() => toggleSubject('physics-card')} >
                <div className="subject-info">
                    <div className="subject-icon">🔬</div>
                    <div className="subject-details">
                        <div className="subject-name">Physics</div>
                        <div className="subject-progress-text">5 of 10 lessons completed</div>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div className="subject-progress-bar">
                        <div
                            className="subject-progress-fill"
                            style={{
                                width: "50%",
                                background: "linear-gradient(90deg, #fbbc04, #fdd835)"
                            }}
                        ></div>
                    </div>
                    <strong style={{ color: "#fbbc04", minWidth: "45px" }}>50%</strong>
                    <div className="expand-icon">▼</div>
                </div>
            </div>
            <div className="subject-content">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="content-type">
                                    <div className="type-icon notes">📘</div>
                                    <span>Notes</span>
                                </div>
                            </td>
                            <td>Newton's Laws of Motion</td>
                            <td><span className="status-badge completed">✅ Completed</span></td>
                            <td>
                                <button className="action-btn"  onClick={(e) => viewContent('notes',e)} >
                                    View
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="content-type">
                                    <div className="type-icon video">🎥</div>
                                    <span>Video</span>
                                </div>
                            </td>
                            <td>Force and Acceleration Demo</td>
                            <td><span className="status-badge pending">🕓 Pending</span></td>
                            <td>
                                <button className="action-btn"  onClick={(e) => viewContent('video',e)} >
                                    Watch
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="content-type">
                                    <div className="type-icon assignment">📝</div>
                                    <span>Assignment</span>
                                </div>
                            </td>
                            <td>Motion Problems Worksheet</td>
                            <td><span className="status-badge pending">🕓 Pending</span></td>
                            <td>
                                <button className="action-btn"  onClick={(e) => viewContent('assignment',e)} >
                                    View
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}