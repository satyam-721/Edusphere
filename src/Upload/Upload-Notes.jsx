export default function UploadNotes({proceedToAI,cancelUpload,toggleAIEnhancement}){



    


    return(
        // <!-- Step 2: Upload Form for Notes -->
        <div class="upload-form" id="notesForm" >
            <h2 class="section-title">📘 Upload Notes</h2>
            
            <div class="form-group">
                <label class="form-label">Title <span class="required">*</span></label>
                <input type="text" class="form-input" id="notesTitle" placeholder="e.g., Newton's Laws of Motion - Complete Guide" required></input>
            </div>

            <div class="form-group">
                <label class="form-label">Upload Method</label>
                <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                    <button class="btn btn-secondary" onclick="toggleUploadMethod('file')" id="fileMethodBtn">Upload File</button>
                    <button class="btn btn-secondary" onclick="toggleUploadMethod('editor')" id="editorMethodBtn">Use Rich Text Editor</button>
                </div>
            </div>

            <div class="form-group" id="fileUploadArea">
                <div class="upload-area" id="notesUploadArea" onclick="document.getElementById('notesFileInput').click()">
                    <div class="upload-icon">📎</div>
                    <div class="upload-text">Click to upload or drag and drop</div>
                    <div class="upload-hint">PDF, Word, PowerPoint (Max 25MB)</div>
                </div>
                <input type="file" id="notesFileInput" accept=".pdf,.doc,.docx,.ppt,.pptx" onchange="handleFileUpload(this, 'notes')"></input>
                <div class="file-preview" id="notesFilePreview">
                    <div class="file-info">
                        <div class="file-name" id="notesFileName"></div>
                        <div class="file-size" id="notesFileSize"></div>
                    </div>
                    <button class="remove-file-btn" onclick="removeFile('notes')">Remove</button>
                </div>
            </div>

            <div class="form-group" id="richEditorArea" style={{display: 'none'}}>
                <label class="form-label">Content</label>
                <div class="rich-editor">
                    <div class="editor-toolbar">
                        <button class="editor-btn" onclick="formatText('bold')"><strong>B</strong></button>
                        <button class="editor-btn" onclick="formatText('italic')"><em>I</em></button>
                        <button class="editor-btn" onclick="formatText('underline')"><u>U</u></button>
                        <button class="editor-btn" onclick="formatText('insertUnorderedList')">• List</button>
                        <button class="editor-btn" onclick="formatText('insertOrderedList')">1. List</button>
                        <button class="editor-btn" onclick="formatText('justifyLeft')">Left</button>
                        <button class="editor-btn" onclick="formatText('justifyCenter')">Center</button>
                    </div>
                    <div class="editor-content" id="editorContent" contenteditable="true"></div>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Subject <span class="required">*</span></label>
                <select class="form-select" id="notesSubject" required>
                    <option value="">Select subject</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="biology">Biology</option>
                    <option value="english">English</option>
                    <option value="history">History</option>
                    <option value="computer">Computer Science</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Class/Grade <span class="required">*</span></label>
                <select class="form-select" id="notesClass" required>
                    <option value="">Select class</option>
                    <option value="grade8">Grade 8</option>
                    <option value="grade9">Grade 9</option>
                    <option value="grade10">Grade 10</option>
                    <option value="grade11">Grade 11</option>
                    <option value="grade12">Grade 12</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Topic/Chapter</label>
                <input type="text" class="form-input" id="notesTopic" placeholder="e.g., Forces and Motion"></input>
            </div>

            <div class="form-group">
                <label class="form-label">Tags (Press Enter to add)</label>
                <div class="tags-container" id="notesTagsContainer">
                    <input type="text" class="tag-input" id="notesTagInput" placeholder="Add tags..." onkeypress="handleTagInput(event, 'notes')"></input>
                </div>
            </div>

            {/* <!-- AI Enhancement Toggle --> */}
            <div class="ai-enhancement" onClick={toggleAIEnhancement}>
                <div class="ai-icon">✨</div>
                <div class="ai-text">
                    <div class="ai-title">AI-Powered Quiz Generation</div>
                    <div class="ai-desc">Automatically generate practice questions from your content</div>
                </div>
                <div class="ai-toggle" id="aiToggle">
                    <div class="ai-toggle-circle"></div>
                </div>
            </div>

            <div class="action-buttons">
                <button class="btn btn-secondary" onClick={cancelUpload}>Cancel</button>
                <button class="btn btn-primary" onClick={proceedToAI}>Next: AI Enhancement</button>
            </div>
        </div>
    )
}