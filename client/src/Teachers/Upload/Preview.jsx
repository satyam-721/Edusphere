export default function Preview({showNotification,updateStep,aiEnabled,currentContentType,resetForm}) {
    function backToAI() {
        document.getElementById('previewSection').classList.remove('active');
        if (aiEnabled) {
            document.getElementById('aiReviewPanel').scrollIntoView({ behavior: 'smooth' });
            updateStep(3);
        } else {
            document.querySelector(`#${currentContentType}Form`).scrollIntoView({ behavior: 'smooth' });
            updateStep(2);
        }
    }

    function saveDraft() {
        showNotification('info', 'Saving draft...');
        
        setTimeout(() => {
            showNotification('success', 'Content saved as draft! You can publish it later.');
        }, 1500);
    }

    // Publish content
    function publishContent(event) {
        if (!confirm('Publish this content to students now?')) {
            return;
        }

        const btn = event.currentTarget;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span className="spinner"></span> Publishing...';
        btn.disabled = true;

        setTimeout(() => {
            showNotification('success', '🎉 Content published successfully! Students can now access it.');
            
            // Reset everything
            setTimeout(() => {
                resetForm();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }, 2000);
    }














    return(
    
        // <!-- Step 4: Preview Section -->
        <div className="preview-section" id="previewSection">
            <div className="preview-header">
                <div>
                    <h2 className="section-title">📋 Preview Your Content</h2>
                    <p style={{color: '#5f6368', fontSize: '0.9rem'}}>Review everything before publishing to students</p>
                </div>
            </div>

            <div className="preview-meta" id="previewMeta">
                {/* <!-- Meta information will be populated here --> */}
            </div>

            <div className="preview-content" id="previewContent">
                {/* <!-- Content preview will be populated here --> */}
            </div>

            <div id="previewQuestions" style={{marginTop: '2rem', display: 'none'}}>
                <h3 style={{marginBottom: '1rem', color: '#202124'}}>📝 Practice Questions (<span id="questionCount">0</span>)</h3>
                <div id="previewQuestionsList"></div>
            </div>

            <div className="action-buttons">
                <button className="btn btn-secondary" onClick={backToAI}>← Back to Edit</button>
                <button className="btn btn-secondary" onClick={saveDraft}>💾 Save as Draft</button>
                <button className="btn btn-success" onClick={(e)=>publishContent(e)}>🚀 Publish Now</button>
            </div>
        </div>
    )
}