

export default function AiReview(){



    
    return(
        // <!-- Step 3: AI Review Panel -->
        <div class="ai-review-panel" id="aiReviewPanel">
            <div class="ai-review-header">
                <div class="ai-review-title">
                    AI Generated Questions
                    <span class="ai-badge">AI Powered</span>
                </div>
                <button class="regenerate-btn" onclick="regenerateQuestions()">
                    🔄 Regenerate All
                </button>
            </div>

            <div style={{marginBottom: '1.5rem', padding: '1rem', background: 'rgba(156, 39, 176, 0.1)', borderRadius: '8px', color:'#9c27b0'}}>
                <strong>Review Instructions:</strong> Check each question below. You can approve ✓, edit ✏️, or remove ✗ questions. Click "Add Question" to create custom ones.
            </div>

            <div class="questions-list" id="aiQuestionsList">
                {/* <!-- Questions will be populated here --> */}
            </div>

            <div style={{marginTop: '1.5rem'}}>
                <button class="btn btn-secondary" onclick="addCustomQuestion()">➕ Add Custom Question</button>
            </div>

            <div class="action-buttons">
                <button class="btn btn-secondary" onclick="backToForm()">← Back to Edit</button>
                <button class="btn btn-primary" onclick="proceedToPreview()">Next: Preview & Publish</button>
            </div>
        </div>
    )
}