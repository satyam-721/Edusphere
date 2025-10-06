export default function Mathematics({toggleSubject,viewContent}) {
    return(
        <div className="subject-card" id="math-card">
            <div className="subject-header"  onClick={() => toggleSubject('math-card')} >
                <div className="subject-info">
                    <div className="subject-icon">🔢</div>
                    <div className="subject-details">
                        <div className="subject-name">Mathematics</div>
                        <div className="subject-progress-text">10 of 15 lessons completed</div>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div className="subject-progress-bar">
                        <div
                            className="subject-progress-fill"
                            style={{
                                width: "68%",
                                background: "linear-gradient(90deg, #1a73e8, #4285f4)"
                            }}
                        ></div>
                    </div>
                    <strong style={{ color: "#1a73e8", minWidth: "45px" }}>68%</strong>
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
                                    <div className="type-icon assignment">📝</div>
                                    <span>Assignment</span>
                                </div>
                            </td>
                            <td>Quadratic Equations Problem Set</td>
                            <td><span className="status-badge pending">🕓 Pending</span></td>
                            <td>
                                <button className="action-btn" onClick={(e) => viewContent('assignment',e)}>
                                    View
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="content-type">
                                    <div className="type-icon notes">📘</div>
                                    <span>Notes</span>
                                </div>
                            </td>
                            <td>Trigonometry Basics</td>
                            <td><span className="status-badge completed">✅ Completed</span></td>
                            <td>
                                <button className="action-btn" onClick={(e) => viewContent('notes',e)}>
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