export default function Preview(){
    return(
        // <!-- Step 4: Preview Section -->
        <div class="preview-section" id="previewSection">
            <div class="preview-header">
                <div>
                    <h2 class="section-title">📋 Preview Your Content</h2>
                    <p style={{color: '#5f6368', fontSize: '0.9rem'}}>Review everything before publishing to students</p>
                </div>
            </div>

            <div class="preview-meta" id="previewMeta">
                {/* <!-- Meta information will be populated here --> */}
            </div>

            <div class="preview-content" id="previewContent">
                {/* <!-- Content preview will be populated here --> */}
            </div>

            <div id="previewQuestions" style={{marginTop: '2rem', display: 'none'}}>
                <h3 style={{marginBottom: '1rem', color: '#202124'}}>📝 Practice Questions (<span id="questionCount">0</span>)</h3>
                <div id="previewQuestionsList"></div>
            </div>

            <div class="action-buttons">
                <button class="btn btn-secondary" onclick="backToAI()">← Back to Edit</button>
                <button class="btn btn-secondary" onclick="saveDraft()">💾 Save as Draft</button>
                <button class="btn btn-success" onclick="publishContent()">🚀 Publish Now</button>
            </div>
        </div>
    )
}