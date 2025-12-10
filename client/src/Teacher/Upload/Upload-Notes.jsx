import React, { useEffect, useState } from 'react';

export default function UploadNotes({
  proceedToAI,
  cancelUpload,
  toggleAIEnhancement,
  toggleStyle,
  toggleUploadMethod,
  handleFileUpload,
  removeFile,
  formatText,
  setSampleQuestions
}) {

  // --- NEW local preview state (keeps everything else intact) ---
  const [localFile, setLocalFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [localFileName, setLocalFileName] = useState('');
  const [localFileSize, setLocalFileSize] = useState('');

  // revoke object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // Local file-change handler: creates preview but DOES NOT upload to server immediately
  const handleLocalFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;

    // revoke previous
    if (previewUrl) {
      try { URL.revokeObjectURL(previewUrl); } catch (err) {}
    }

    const url = URL.createObjectURL(f);
    setLocalFile(f);
    setPreviewUrl(url);
    setLocalFileName(f.name);
    setLocalFileSize(formatBytes(f.size));

    // keep original behavior: do not call handleFileUpload automatically
    // if (typeof handleFileUpload === 'function') handleFileUpload({ target: { files: [f]} }, 'notes');
  };

  // helper to format size
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // local remove that also calls provided removeFile('notes') so UI + backend-state stays consistent
  const removeLocalFile = () => {
    if (previewUrl) {
      try { URL.revokeObjectURL(previewUrl); } catch (e) {}
    }
    setLocalFile(null);
    setPreviewUrl(null);
    setLocalFileName('');
    setLocalFileSize('');
    if (typeof removeFile === 'function') removeFile('notes'); // keep existing behaviour
    // also clear the input value so re-uploading same file triggers onChange again
    const inputEl = document.getElementById('notesFileInput');
    if (inputEl) inputEl.value = '';
  };

  // read a File object -> base64 Data URL string
  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result); // data:<mime>;base64,...
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  // Collect the fields and print them (excluding file content)
  // Now: include file data (base64) in payload.file if localFile exists
  const handlePreview = async (ev) => {
    // read inputs (same as before)
    const titleEl = document.getElementById('notesTitle');
    const editorEl = document.getElementById('editorContent');
    const subjectEl = document.getElementById('notesSubject');
    const classEl = document.getElementById('notesClass');
    const topicEl = document.getElementById('notesTopic');
    const tagsContainer = document.getElementById('notesTagsContainer');
    const tagInput = document.getElementById('notesTagInput');
    const ytlinkEl=document.getElementById('notesLink');

    const title = titleEl ? titleEl.value.trim() : '';
    const editorContent = editorEl ? editorEl.innerHTML : ''; // HTML preserved
    const subject = subjectEl ? subjectEl.value : '';
    const classGrade = classEl ? classEl.value : '';
    const topic = topicEl ? topicEl.value.trim() : '';
    const ytlink=ytlinkEl ? ytlinkEl.value.trim() :'';

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

    // base payload (keeps exactly the shape you used previously)
    const payload = {
      title,
      editorContent,    // HTML string
      subject,
      classGrade,
      topic,
      tags: cleanTags,
      ytlink
    };

    // If a local file exists, convert it to base64 Data URL and attach under `file`
    if (localFile) {
      try {
        const dataUrl = await fileToDataUrl(localFile); // e.g., "data:application/pdf;base64,JVBERi0xL..."
        // attach file metadata and data while keeping payload as JSON
        payload.file = {
          name: localFile.name,
          type: localFile.type || 'application/octet-stream',
          size: localFile.size,
          data: dataUrl // full data URL; backend can strip prefix if it wants raw base64
        };
      } catch (err) {
        console.error('Failed to read selected file as base64:', err);
        // If reading fails, continue without file (or you could abort). We'll continue to keep UX consistent.
      }
    }

    // Send payload to your existing endpoint as JSON (Content-Type: application/json)
    try {
      console.log('Payload to Send:', payload);
      const res = await fetch('http://localhost:5000/assignmentnotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        // backend returned error status
        const text = await res.text().catch(()=>null);
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

    // Now fetch AI questions using the SAME payload shape (including file when present)
    try {
      console.log('Content to Fetch:', payload.editorContent);
      const aiRes = await fetch('http://localhost:5000/fetchaiquestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!aiRes.ok) {
        const text = await aiRes.text().catch(() => '');
        console.error('Failed to fetch AI questions:', aiRes.status, text);
      } else {
        const aiData = await aiRes.json().catch(() => null);
        console.log('Fetched AI questions:', aiData);
        if (typeof setSampleQuestions === 'function') setSampleQuestions(aiData);
      }
    } catch (err) {
      console.error('Network/CORS error while fetching AI questions:', err);
    }
  };

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
            <div
              className="upload-area"
              id="notesUploadArea"
              onClick={()=>document.getElementById('notesFileInput').click()}
              style={{cursor: 'pointer'}}
            >
                <div className="upload-icon">📎</div>
                <div className="upload-text">Click to upload or drag and drop</div>
                <div className="upload-hint">PDF, Word, PowerPoint (Max 25MB)</div>
            </div>

            {/* NOTE: onChange now handled locally to create preview. We intentionally DO NOT call handleFileUpload to avoid server upload. */}
            <input
              type="file"
              id="notesFileInput"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              onChange={handleLocalFileChange}
              style={{display: 'none'}}
            ></input>

            {/* File preview area - shows when a local file is selected */}
            <div
              className="file-preview"
              id="notesFilePreview"
              style={{ display: localFile ? 'block' : 'none', marginTop: '0.75rem' }}
            >
                <div className="file-info" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div className="file-name" id="notesFileName">{localFileName}</div>
                    <div className="file-size" id="notesFileSize">{localFileSize}</div>
                </div>

                <button className="remove-file-btn" onClick={removeLocalFile} style={{marginTop: '0.5rem'}}>Remove</button>

                {/* Inline PDF preview (embedded). This will not be uploaded to server — it's an object URL. */}
                { previewUrl && (
                  <div style={{marginTop: '0.75rem', border: '1px solid #ddd', borderRadius: 6, overflow: 'hidden'}}>
                    <iframe
                      title="pdf-preview"
                      src={previewUrl}
                      style={{width: '100%', height: 400, border: 0}}
                    />
                  </div>
                )}
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
                <div className="editor-content" id="editorContent" contentEditable="true"></div>  {/* Editable area */}
            </div>
        </div>

        <div className="form-group">
            <label className="form-label">Video Link</label>
            <input type="text" className="form-input" id="notesLink" placeholder="e.g., https://youtu.be/WUvTyaaNkzM"></input>
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
            <button className="btn btn-primary" id="nextStep" onClick={handlePreview}>Next: Preview</button>
        </div>
    </div>
  );
}
