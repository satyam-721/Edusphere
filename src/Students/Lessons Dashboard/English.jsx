export default function English({toggleSubject,viewContent}){
    return(
        <div className="subject-card" id="english-card">
            <div className="subject-header"  onClick={() => toggleSubject('english-card')} >
                <div className="subject-info">
                    <div className="subject-icon">📖</div>
                    <div className="subject-details">
                        <div className="subject-name">English</div>
                        <div className="subject-progress-text">8 of 12 lessons completed</div>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div className="subject-progress-bar">
                        <div
                            className="subject-progress-fill"
                            style={{
                                width: "67%",
                                background: "linear-gradient(90deg, #9c27b0, #e91e63)"
                            }}
                        ></div>
                    </div>
                    <strong style={{ color: "#9c27b0", minWidth: "45px" }}>67%</strong>
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
                            <td>Grammar - Tenses</td>
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
                                    <div className="type-icon assignment">📝</div>
                                    <span>Assignment</span>
                                </div>
                            </td>
                            <td>Essay Writing Practice</td>
                            <td><span className="status-badge pending">🕓 Pending</span></td>
                            <td>
                                <button className="action-btn"  onClick={(e) => viewContent('assignment',e)} >
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
                            <td>Poetry Analysis Tutorial</td>
                            <td><span className="status-badge completed">✅ Completed</span></td>
                            <td>
                                <button className="action-btn"  onClick={(e) => viewContent('video',e)} >
                                    Watch
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}