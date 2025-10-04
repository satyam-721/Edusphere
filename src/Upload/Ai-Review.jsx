

export default function AiReview({showNotification,generatedQuestions,approvedQuestions,displayAIQuestions,buildPreview,currentContentType,updateStep}){
    function regenerateQuestions() {
        showNotification('info', 'Regenerating questions with AI...');
        setTimeout(() => {
            // Shuffle or generate new questions
            generatedQuestions = generatedQuestions.sort(() => Math.random() - 0.5);
            approvedQuestions.clear();
            displayAIQuestions();
            showNotification('success', 'Questions regenerated!');
        }, 2000);
    }

    function addCustomQuestion() {
        showNotification('info', 'Opening custom question form...');
        // In production, this would open a form to add custom questions
    }

    function backToForm() {
        document.getElementById('aiReviewPanel').classList.remove('active');
        document.querySelector(`#${currentContentType}Form`).scrollIntoView({ behavior: 'smooth' });
        updateStep(2);
    }

    function proceedToPreview() {
        buildPreview();
        document.getElementById('previewSection').classList.add('active');
        document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
        updateStep(4);
        showNotification('success', 'Preview ready! Review before publishing.');
    }


    //The function to  creation of Question are in Types.jsx



    //THE PROBLEM IS WITH DISPLAYAIQUESTIONS WHERE ONCLICK IS NOT SUITABLE WITH REACT

    // function toggleApprove(questionId) {
    //     if (approvedQuestions.has(questionId)) {
    //         approvedQuestions.delete(questionId);
    //     } else {
    //         approvedQuestions.add(questionId);
    //     }
        
    //     const btn = event.currentTarget;
    //     btn.classList.toggle('approved');
        
    //     const status = approvedQuestions.has(questionId) ? 'approved' : 'unapproved';
    //     showNotification('success', `Question ${status}`);
    // }



    // function editQuestion(questionId) {
    //     console.log("runs edit menu")
    //     showNotification('info', 'Opening question editor...');
    //     // In production, this would open an edit modal
    // }

    // // Delete question
    // function deleteQuestion(questionId) {
    //     if (confirm('Remove this question?')) {
    //         generatedQuestions = generatedQuestions.filter(q => q.id !== questionId);
    //         approvedQuestions.delete(questionId);
    //         document.getElementById(`question-${questionId}`).remove();
    //         showNotification('success', 'Question removed');
    //     }
    // }

    // Add custom question
    function addCustomQuestion() {
        showNotification('info', 'Opening custom question form...');
        // In production, this would open a form to add custom questions
    }

    // Regenerate questions
    function regenerateQuestions() {
        showNotification('info', 'Regenerating questions with AI...');
        setTimeout(() => {
            // Shuffle or generate new questions
            generatedQuestions = generatedQuestions.sort(() => Math.random() - 0.5);
            approvedQuestions.clear();
            displayAIQuestions();
            showNotification('success', 'Questions regenerated!');
        }, 2000);
    }











    
    return(
        // <!-- Step 3: AI Review Panel -->
        <div class="ai-review-panel" id="aiReviewPanel">
            <div class="ai-review-header">
                <div class="ai-review-title">
                    AI Generated Questions
                    <span class="ai-badge">AI Powered</span>
                </div>
                <button class="regenerate-btn" onClick={regenerateQuestions}>
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
                <button class="btn btn-secondary" onClick={addCustomQuestion}>➕ Add Custom Question</button>
            </div>

            <div class="action-buttons">
                <button class="btn btn-secondary" onClick={backToForm}>← Back to Edit</button>
                <button class="btn btn-primary" onClick={proceedToPreview}>Next: Preview & Publish</button>
            </div>
        </div>
    )
}