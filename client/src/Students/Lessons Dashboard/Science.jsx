export default function Science({toggleSubject,viewContent}){
    return(
        <div className="subject-card" id="science-card">
            <div className="subject-header"  onClick={() => toggleSubject('science-card')} >
                <div className="subject-info">
                    <div className="subject-icon">⚗️</div>
                    <div className="subject-details">
                        <div className="subject-name">Science</div>
                        <div className="subject-progress-text">12 of 14 lessons completed</div>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div className="subject-progress-bar">
                        <div
                            className="subject-progress-fill"
                            style={{
                                width: "86%",
                                background: "linear-gradient(90deg, #34a853, #46d160)"
                            }}
                        ></div>
                    </div>
                    <strong style={{ color: "#34a853", minWidth: "45px" }}>86%</strong>
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
                            <td>Photosynthesis Worksheet</td>
                            <td><span className="status-badge pending">🕓 Pending</span></td>
                            <td>
                                <button className="action-btn" onClick={(e) => viewContent('assignment',e)} >
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
                            <td>Plant Cell Structure</td>
                            <td><span className="status-badge completed">✅ Completed</span></td>
                            <td>
                                <button className="action-btn" onClick={(e) => viewContent('notes',e)} >
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
                            <td>Light & Reflection</td>
                            <td><span className="status-badge partial">🟡 Partially Completed</span></td>
                            <td>
                                <button className="action-btn"  onClick={(e) => viewContent('video',e)} >
                                    Watch
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
                            <td>Chemical Reactions</td>
                            <td><span className="status-badge completed">✅ Completed</span></td>
                            <td>
                                <button className="action-btn" onClick={(e) => viewContent('notes',e)} >
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