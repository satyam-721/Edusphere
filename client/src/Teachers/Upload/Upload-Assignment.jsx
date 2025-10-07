export default function UploadAssignment({cancelUpload,handleFileUpload,removeFile,toggleAIEnhancement}){
    return(
        // <!-- Step 2: Upload Form for Assignment -->
        <div className="upload-form" id="assignmentForm">
            <h2 className="section-title">📝 Create Assignment</h2>
            
            <div className="form-group">
                <label className="form-label">Assignment Title <span className="required">*</span></label>
                <input type="text" className="form-input" id="assignmentTitle" placeholder="e.g., Chapter 5 - Problem Set" required></input>
            </div>

            <div className="form-group">
                <label className="form-label">Instructions</label>
                <textarea className="form-textarea" id="assignmentInstructions" placeholder="Provide clear instructions for students..."></textarea>
            </div>

            <div className="form-group">
                <div className="upload-area" id="assignmentUploadArea" onClick={()=>document.getElementById('assignmentFileInput').click()}>
                    <div className="upload-icon">📎</div>
                    <div className="upload-text">Upload Assignment File</div>
                    <div className="upload-hint">PDF, Word (Max 25MB)</div>
                </div>
                <input type="file" id="assignmentFileInput" accept=".pdf,.doc,.docx" onChange={()=>handleFileUpload(this, 'assignment')}></input>
                <div className="file-preview" id="assignmentFilePreview">
                    <div className="file-info">
                        <div className="file-name" id="assignmentFileName"></div>
                        <div className="file-size" id="assignmentFileSize"></div>
                    </div>
                    <button className="remove-file-btn" onClick={()=>removeFile('assignment')}>Remove</button>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Subject <span className="required">*</span></label>
                <select className="form-select" id="assignmentSubject" required>
                    <option value="">Select subject</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="biology">Biology</option>
                    <option value="english">English</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Class/Grade <span className="required">*</span></label>
                <select className="form-select" id="assignmentClass" required>
                    <option value="">Select class</option>
                    <option value="grade8">Grade 8</option>
                    <option value="grade9">Grade 9</option>
                    <option value="grade10">Grade 10</option>
                    <option value="grade11">Grade 11</option>
                    <option value="grade12">Grade 12</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Due Date & Time <span className="required">*</span></label>
                <input type="datetime-local" className="form-input" id="assignmentDeadline" required></input>
            </div>

            <div className="form-group">
                <label className="form-label">Total Points</label>
                <input type="number" className="form-input" id="assignmentPoints" placeholder="100" min="1"></input>
            </div>

            <div className="form-group">
                <label className="form-label">Tags (Press Enter to add)</label>
                <div className="tags-container" id="assignmentTagsContainer">
                    <input type="text" className="tag-input" id="assignmentTagInput" placeholder="Add tags..." ></input>
                </div>
            </div>

            <div className="ai-enhancement" onClick={toggleAIEnhancement}>
                <div className="ai-icon">✨</div>
                <div className="ai-text">
                    <div className="ai-title">AI-Powered Auto-Grading</div>
                    <div className="ai-desc">Enable AI to help grade objective questions automatically</div>
                </div>
                <div className="ai-toggle" id="aiToggleAssignment">
                    <div className="ai-toggle-circle"></div>
                </div>
            </div>

            <div className="action-buttons">
                <button className="btn btn-secondary" onClick={cancelUpload}>Cancel</button>
                <button className="btn btn-primary" 
                // onClick={previewContent}
                >Next: Preview</button>
            </div>
        </div>
    )
}