export default function UploadVideo(){
    return(
        // <!-- Step 2: Upload Form for Video -->
        <div class="upload-form" id="videoForm">
            <h2 class="section-title">🎥 Share Video Content</h2>
            
            <div class="form-group">
                <label class="form-label">Video Title <span class="required">*</span></label>
                <input type="text" class="form-input" id="videoTitle" placeholder="e.g., Introduction to Calculus" required></input>
            </div>

            <div class="form-group">
                <label class="form-label">YouTube Link <span class="required">*</span></label>
                <input type="url" class="form-input" id="videoLink" placeholder="https://www.youtube.com/watch?v=..." onchange="extractVideoInfo()" required></input>
                <div style={{marginTop: "0.5rem", color: '#5f6368', fontSize: '0.85rem'}}>
                    💡 Tip: The video will be embedded for easy viewing
                </div>
            </div>

            <div id="videoPreview" style={{marginTop: '1rem', display: 'none'}}>
                <div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px'}}>
                    <iframe id="videoIframe" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none'}} allowfullscreen></iframe>
                </div>
            </div>

            <div class="form-group">
                <label class="form-label">Description</label>
                <textarea class="form-textarea" id="videoDescription" placeholder="Brief description of what students will learn..."></textarea>
            </div>

            <div class="form-group">
                <label class="form-label">Subject <span class="required">*</span></label>
                <select class="form-select" id="videoSubject" required>
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
                <select class="form-select" id="videoClass" required>
                    <option value="">Select class</option>
                    <option value="grade8">Grade 8</option>
                    <option value="grade9">Grade 9</option>
                    <option value="grade10">Grade 10</option>
                    <option value="grade11">Grade 11</option>
                    <option value="grade12">Grade 12</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label">Tags (Press Enter to add)</label>
                <div class="tags-container" id="videoTagsContainer">
                    <input type="text" class="tag-input" id="videoTagInput" placeholder="Add tags..." onkeypress="handleTagInput(event, 'video')"></input>
                </div>
            </div>

            <div class="ai-enhancement" onclick="toggleAIEnhancement()">
                <div class="ai-icon">✨</div>
                <div class="ai-text">
                    <div class="ai-title">AI Video Comprehension Quiz</div>
                    <div class="ai-desc">Generate questions based on video content</div>
                </div>
                <div class="ai-toggle" id="aiToggleVideo">
                    <div class="ai-toggle-circle"></div>
                </div>
            </div>

            <div class="action-buttons">
                <button class="btn btn-secondary" onclick="cancelUpload()">Cancel</button>
                <button class="btn btn-primary" onclick="proceedToAI()">Next: AI Enhancement</button>
            </div>
        </div>
    )
}