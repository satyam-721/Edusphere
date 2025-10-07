import React, { useEffect, useState } from "react";
export default function AskDoubt({onSubmit}){
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [doubt, setDoubt] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ subject, topic, doubt }); 
    };

  


    return(
        <div className="ask-doubt-section">
                    <h2 className="section-title">✍️ Ask a New Doubt</h2>
                    
                    <form id="doubtForm" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Subject *</label>
                            <select className="form-select" id="subjectSelect" onChange={(e)=>setSubject(e.target.value)}  required  >
                                <option value="">Select a subject</option>
                                <option value="mathematics">Mathematics</option>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="biology">Biology</option>
                                <option value="english">English</option>
                                <option value="history">History</option>
                                <option value="computer">Computer Science</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Topic (Optional)</label>
                            <input type="text" className="form-input" id="topicInput" placeholder="e.g., Newton's Laws, Quadratic Equations"
                            onChange={(e)=>setTopic(e.target.value)}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Your Doubt *</label>
                            <textarea 
                                className="form-textarea" 
                                id="doubtText" 
                                placeholder="Describe your doubt in detail. The more specific you are, the better help you'll receive!"
                                maxLength="1000"
                                required
                                onChange={(e)=>setDoubt(e.target.value)}
                            ></textarea>
                            <div className="char-count">
                                <span id="charCount">0</span> / 1000 characters
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Attach Image (Optional)</label>
                            <div className="attachment-area" id="attachmentArea" onClick={()=>document.getElementById('fileInput').click()}>
                                <div className="attachment-icon">📎</div>
                                <div className="attachment-text">Click to upload or drag and drop</div>
                                <div className="attachment-text" style={{fontSize: '0.8rem', marginTop: '0.25rem'}}>PNG, JPG, PDF (Max 5MB)</div>
                            </div>
                            <input type="file" id="fileInput" accept="image/*,.pdf"

                            //  onChange="handleFileSelect(this)"
                             ></input>
                            <div className="attachment-preview" id="attachmentPreview">
                                <span className="preview-filename" id="previewFilename"></span>
                                <button type="button" className="remove-file" onclick="removeFile()">Remove</button>
                            </div>
                        </div>

                        <button type="submit" className="submit-btn" id="submitBtn">
                            Submit Doubt
                        </button>
                    </form>
                </div>
    )
}