export default function UploadAssignment({cancelUpload,handleFileUpload,removeFile,toggleAIEnhancement}){
    return(
        // <!-- Step 2: Upload Form for Assignment -->
        <div class="upload-form" id="assignmentForm">
            <h2 class="section-title">📝 Create Assignment</h2>
            
            <div class="form-group">
                <label class="form-label">Assignment Title <span class="required">*</span></label>
                <input type="text" class="form-input" id="assignmentTitle" placeholder="e.g., Chapter 5 - Problem Set" required></input>
            </div>

            <div class="form-group">
                <label class="form-label">Instructions</label>
                <textarea class="form-textarea" id="assignmentInstructions" placeholder="Provide clear instructions for students..."></textarea>
            </div>

            <div class="form-group">
                <div class="upload-area" id="assignmentUploadArea" onClick={()=>document.getElementById('assignmentFileInput').click()}>
                    <div class="upload-icon">📎</div>
                    <div class="upload-text">Upload Assignment File</div>
                    <div class="upload-hint">PDF, Word (Max 25MB)</div>
                </div>
                <input type="file" id="assignmentFileInput" accept=".pdf,.doc,.docx" onChange={()=>handleFileUpload(this, 'assignment')}></input>
                <div class="file-preview" id="assignmentFilePreview">
                    <div class="file-info">
                        <div class="file-name" id="assignmentFileName"></div>
                        <div class="file-size" id="assignmentFileSize"></div>
                    </div>
                    <button class="remove-file-btn" onClick={()=>removeFile('assignment')}>Remove</button>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Subject <span class="required">*</span></label>
                <select class="form-select" id="assignmentSubject" required>
                    <option value="">Select subject</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="biology">Biology</option>
                    <option value="english">English</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Class/Grade <span class="required">*</span></label>
                <select class="form-select" id="assignmentClass" required>
                    <option value="">Select class</option>
                    <option value="grade8">Grade 8</option>
                    <option value="grade9">Grade 9</option>
                    <option value="grade10">Grade 10</option>
                    <option value="grade11">Grade 11</option>
                    <option value="grade12">Grade 12</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Due Date & Time <span class="required">*</span></label>
                <input type="datetime-local" class="form-input" id="assignmentDeadline" required></input>
            </div>

            <div class="form-group">
                <label class="form-label">Total Points</label>
                <input type="number" class="form-input" id="assignmentPoints" placeholder="100" min="1"></input>
            </div>

            <div class="form-group">
                <label class="form-label">Tags (Press Enter to add)</label>
                <div class="tags-container" id="assignmentTagsContainer">
                    <input type="text" class="tag-input" id="assignmentTagInput" placeholder="Add tags..." ></input>
                </div>
            </div>

            <div class="ai-enhancement" onClick={toggleAIEnhancement}>
                <div class="ai-icon">✨</div>
                <div class="ai-text">
                    <div class="ai-title">AI-Powered Auto-Grading</div>
                    <div class="ai-desc">Enable AI to help grade objective questions automatically</div>
                </div>
                <div class="ai-toggle" id="aiToggleAssignment">
                    <div class="ai-toggle-circle"></div>
                </div>
            </div>

            <div class="action-buttons">
                <button class="btn btn-secondary" onClick={cancelUpload}>Cancel</button>
                <button class="btn btn-primary" 
                // onClick={previewContent}
                >Next: Preview</button>
            </div>
        </div>
    )
}