export default function UploadNotes({proceedToAI,cancelUpload,toggleAIEnhancement,toggleStyle,toggleUploadMethod,handleFileUpload,removeFile,formatText}){



    


    return(
        // <!-- Step 2: Upload Form for Notes -->
        <div className="upload-form" id="notesForm" >
            <h2 className="section-title">📘 Upload Notes</h2>
            
            <div className="form-group">
                <label className="form-label">Title <span className="required">*</span></label>
                <input type="text" className="form-input" id="notesTitle" placeholder="e.g., Newton's Laws of Motion - Complete Guide" required></input>
            </div>

            <div className="form-group">
                <label className="form-label">Upload Method</label>
                <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                    <button className="btn btn-secondary" onClick={()=>toggleUploadMethod('file')} id="fileMethodBtn">Upload File</button>
                    <button className="btn btn-secondary" onClick={()=>toggleUploadMethod('editor')} id="editorMethodBtn">Use Rich Text Editor</button>
                </div>
            </div>

            <div className="form-group" id="fileUploadArea">
                <div className="upload-area" id="notesUploadArea" onClick={()=>document.getElementById('notesFileInput').click()}>
                    <div className="upload-icon">📎</div>
                    <div className="upload-text">Click to upload or drag and drop</div>
                    <div className="upload-hint">PDF, Word, PowerPoint (Max 25MB)</div>
                </div>
                <input type="file" id="notesFileInput" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={()=>handleFileUpload(this, 'notes')}></input>
                <div className="file-preview" id="notesFilePreview">
                    <div className="file-info">
                        <div className="file-name" id="notesFileName"></div>
                        <div className="file-size" id="notesFileSize"></div>
                    </div>
                    <button className="remove-file-btn" onClick={()=>removeFile('notes')}>Remove</button>
                </div>
            </div>

            <div className="form-group" id="richEditorArea" style={{display: 'none'}}>
                <label className="form-label">Content</label>
                <div className="rich-editor">
                    <div className="editor-toolbar">
                        <button className="editor-btn" onClick={()=>formatText('bold')}><strong>B</strong></button>
                        <button className="editor-btn" onClick={()=>formatText('italic')}><em>I</em></button>
                        <button className="editor-btn" onClick={()=>formatText('underline')}><u>U</u></button>
                        <button className="editor-btn" onClick={()=>formatText('insertUnorderedList')}>• List</button>
                        <button className="editor-btn" onClick={()=>formatText('insertOrderedList')}>1. List</button>
                        <button className="editor-btn" onClick={()=>formatText('justifyLeft')}>Left</button>
                        <button className="editor-btn" onClick={()=>formatText('justifyCenter')}>Center</button>
                    </div>
                    <div className="editor-content" id="editorContent" contenteditable="true"></div>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Subject <span className="required">*</span></label>
                <select className="form-select" id="notesSubject" required>
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

            <div className="form-group">
                <label className="form-label">Class/Grade <span className="required">*</span></label>
                <select className="form-select" id="notesClass" required>
                    <option value="">Select class</option>
                    <option value="grade8">Grade 8</option>
                    <option value="grade9">Grade 9</option>
                    <option value="grade10">Grade 10</option>
                    <option value="grade11">Grade 11</option>
                    <option value="grade12">Grade 12</option>
                </select>
            </div>

            <div className="form-group">
                <label className="form-label">Topic/Chapter</label>
                <input type="text" className="form-input" id="notesTopic" placeholder="e.g., Forces and Motion"></input>
            </div>

            <div className="form-group">
                <label className="form-label">Tags (Press Enter to add)</label>
                <div className="tags-container" id="notesTagsContainer">
                    <input type="text" className="tag-input" id="notesTagInput" placeholder="Add tags..."></input>
                </div>
            </div>

            {/* <!-- AI Enhancement Toggle --> */}
            <div className="ai-enhancement" onClick={(event)=>toggleAIEnhancement(event)}>
                <div className="ai-icon">✨</div>
                <div className="ai-text">
                    <div className="ai-title">AI-Powered Quiz Generation</div>
                    <div className="ai-desc">Automatically generate practice questions from your content</div>
                </div>
                <div className="ai-toggle" id="aiToggle">
                    <div className="ai-toggle-circle"></div>
                </div>
            </div>

            <div className="action-buttons">
                <button className="btn btn-secondary" onClick={cancelUpload}>Cancel</button>
                <button className="btn btn-primary" id="nextStep" onClick={proceedToAI}>Next: Preview</button>
            </div>
        </div>
    )
}