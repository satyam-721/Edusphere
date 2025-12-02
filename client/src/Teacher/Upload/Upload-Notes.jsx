export default function UploadNotes({
  proceedToAI,
  cancelUpload,
  toggleAIEnhancement,
  toggleStyle,
  toggleUploadMethod,
  handleFileUpload,
  removeFile,
  formatText
}) {

  // Collect the fields and print them (excluding file content)
  // Replace your handlePreview with this version
const handlePreview = async (ev) => {
  // read inputs (same as before)
  const titleEl = document.getElementById('notesTitle');
  const editorEl = document.getElementById('editorContent');
  const subjectEl = document.getElementById('notesSubject');
  const classEl = document.getElementById('notesClass');
  const topicEl = document.getElementById('notesTopic');
  const tagsContainer = document.getElementById('notesTagsContainer');
  const tagInput = document.getElementById('notesTagInput');

  const title = titleEl ? titleEl.value.trim() : '';
  const editorContent = editorEl ? editorEl.innerHTML : ''; // HTML preserved
  const subject = subjectEl ? subjectEl.value : '';
  const classGrade = classEl ? classEl.value : '';
  const topic = topicEl ? topicEl.value.trim() : '';

  // collect tags
  const tags = [];
  if (tagsContainer) {
    const possibleTagEls = tagsContainer.querySelectorAll('[data-tag], .tag, .tag-item, .tag-badge');
    possibleTagEls.forEach(t => {
      const txt = (t.dataset && t.dataset.tag) ? t.dataset.tag : t.textContent;
      if (txt && txt.trim()) tags.push(txt.trim());
    });
  }
  if (tagInput && tagInput.value && tagInput.value.trim()) {
    tags.push(tagInput.value.trim());
  }
  const cleanTags = Array.from(new Set(tags.filter(t => t && t.length)));

  const payload = {
    title,
    editorContent,    // HTML string
    subject,
    classGrade,
    topic,
    tags: cleanTags
  };

  try {
    const res = await fetch('http://localhost:5000/assignmentnotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      // backend returned error status
      const text = await res.text();
      console.error('Failed to send notes to backend:', res.status, text);
      // optional: show user feedback here
    } else {
      const data = await res.json().catch(()=>null);
      console.log('Successfully sent notes to backend', data);
    }
  } catch (err) {
    console.error('Network or CORS error while sending notes to backend:', err);
    // optional: show user feedback here
  }

  // continue existing flow regardless (or move this inside success branch if you prefer)
  if (typeof proceedToAI === 'function') proceedToAI(ev);
};


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
                <button class="btn btn-secondary" onClick={()=>toggleUploadMethod('file')} id="fileMethodBtn">Upload File</button>
                <button class="btn btn-secondary" onClick={()=>toggleUploadMethod('editor')} id="editorMethodBtn">Use Rich Text Editor</button>
            </div>
        </div>

        <div class="form-group" id="fileUploadArea">
            <div class="upload-area" id="notesUploadArea" onClick={()=>document.getElementById('notesFileInput').click()}>
                <div class="upload-icon">📎</div>
                <div class="upload-text">Click to upload or drag and drop</div>
                <div class="upload-hint">PDF, Word, PowerPoint (Max 25MB)</div>
            </div>
            <input type="file" id="notesFileInput" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={(e)=>handleFileUpload(e, 'notes')}></input>
            <div class="file-preview" id="notesFilePreview">
                <div class="file-info">
                    <div class="file-name" id="notesFileName"></div>
                    <div class="file-size" id="notesFileSize"></div>
                </div>
                <button class="remove-file-btn" onClick={()=>removeFile('notes')}>Remove</button>
            </div>
        </div>

        <div class="form-group" id="richEditorArea" style={{display: 'none'}}>
            <label class="form-label">Content</label>
            <div class="rich-editor">
                <div class="editor-toolbar">
                    <button class="editor-btn" onClick={()=>formatText('bold')}><strong>B</strong></button>
                    <button class="editor-btn" onClick={()=>formatText('italic')}><em>I</em></button>
                    <button class="editor-btn" onClick={()=>formatText('underline')}><u>U</u></button>
                    <button class="editor-btn" onClick={()=>formatText('insertUnorderedList')}>• List</button>
                    <button class="editor-btn" onClick={()=>formatText('insertOrderedList')}>1. List</button>
                    <button class="editor-btn" onClick={()=>formatText('justifyLeft')}>Left</button>
                    <button class="editor-btn" onClick={()=>formatText('justifyCenter')}>Center</button>
                </div>
                <div class="editor-content" id="editorContent" contenteditable="true"></div>  {/* Editable area */}
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
                <input type="text" class="tag-input" id="notesTagInput" placeholder="Add tags..."></input>
            </div>
        </div>

        {/* <!-- AI Enhancement Toggle --> */}
        <div class="ai-enhancement" onClick={(event)=>toggleAIEnhancement(event)}>
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
            <button class="btn btn-primary" id="nextStep" onClick={handlePreview}>Next: Preview</button>
        </div>
    </div>
  )
}
