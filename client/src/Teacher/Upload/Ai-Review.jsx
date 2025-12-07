import React, { useEffect, useState } from 'react';
import { use } from 'react';

export default function AiReview({showNotification,setSampleQuestions,sampleQuestions,generatedQuestions,approvedQuestions,displayAIQuestions,buildPreview,currentContentType,updateStep}){

    const [showCustomModal, setShowCustomModal] = useState(false);
    const [questionType, setQuestionType] = useState("mcq");
    const [questionText, setQuestionText] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [correctIndex, setCorrectIndex] = useState(1);
    const [tfAnswer, setTfAnswer] = useState(true);

    function addCustomQuestion() {
        setShowCustomModal(true);
    }
    function saveCustomQuestion() {
        let newQuestion;

        if (questionType === "mcq") {
            newQuestion = {
                id: 1,
                question: questionText,
                options: options,
                correct: correctIndex,
                type: "mcq"
            };
        }

        if (questionType === "truefalse") {
            newQuestion = {
                id: 1,
                question: questionText,
                answer: tfAnswer,
                type: "truefalse"
            };
        }

        if (questionType === "short") {
            newQuestion = {
                id: 1,
                question: questionText,
                type: "short"
            };
        }

        console.log("CUSTOM QUESTION ADDED:", newQuestion);
        setSampleQuestions([...sampleQuestions, newQuestion]);

        showNotification("success", "Custom question created!");

        setShowCustomModal(false);
    }



    // useEffect(() => {
    //     console.log("Fetching sample AI questions...");

    //     (async () => {
    //         try {
    //             const response = await fetch("http://localhost:5000/fetchaiquestions", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             });
    //             if (!response.ok) {
    //                 throw new Error(`Fetch failed: ${response.status}`);
    //             }
    //             const data = await response.json();
    //             console.log("Fetched QUESTIONS:", data);
    //             setSampleQuestions(data); 
                
    //         } catch (err) {
    //             console.error("Error fetching doubt types:", err);
    //         }
    //     })();
    // }, []);


    
    function regenerateQuestions() {
        showNotification('info', 'Regenerating questions with AI...');
        setTimeout(() => {
            // Shuffle or generate new questions
            generatedQuestions = generatedQuestions.sort(() => Math.random() - 0.5);
            approvedQuestions.clear();
            displayAIQuestions();
            showNotification('success', 'Questions regenerated!');
        }, 1000);
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
        <>
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
                </div>

                <div style={{marginTop: '1.5rem'}}>
                    <button class="btn btn-secondary" onClick={addCustomQuestion}>➕ Add Custom Question</button>
                </div>

                <div class="action-buttons">
                    <button class="btn btn-secondary" onClick={backToForm}>← Back to Edit</button>
                    <button class="btn btn-primary" onClick={proceedToPreview}>Next: Preview & Publish</button>
                </div>

            </div>
            {showCustomModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h3>Create Custom Question</h3>

                        {/* Question Text */}
                        <label className="modal-label">Question</label>
                        <textarea 
                            className="modal-input"
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                        ></textarea>

                        {/* Question Type */}
                        <label className="modal-label">Type</label>
                        <select 
                            className="modal-input"
                            value={questionType}
                            onChange={(e) => setQuestionType(e.target.value)}
                        >
                            <option value="mcq">MCQ</option>
                            <option value="truefalse">True / False</option>
                            <option value="short">Short Answer</option>
                        </select>

                        {/* MCQ UI */}
                        {questionType === "mcq" && (
                            <div>
                                <label className="modal-label">Options</label>
                                {options.map((opt, idx) => (
                                    <input 
                                        key={idx}
                                        className="modal-input"
                                        placeholder={`Option ${idx + 1}`}
                                        value={opt}
                                        onChange={(e) => {
                                            const newOpts = [...options];
                                            newOpts[idx] = e.target.value;
                                            setOptions(newOpts);
                                        }}
                                    />
                                ))}

                                <label className="modal-label">Correct Option (1–4)</label>
                                <input 
                                    className="modal-input"
                                    type="number"
                                    min="1"
                                    max="4"
                                    value={correctIndex}
                                    onChange={(e) => setCorrectIndex(Number(e.target.value))}
                                />
                            </div>
                        )}

                        {questionType === "truefalse" && (
                            <div>
                                <label className="modal-label">Correct Answer</label>
                                <select 
                                    className="modal-input"
                                    value={tfAnswer}
                                    onChange={(e) => setTfAnswer(e.target.value === "true")}
                                >
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="modal-actions">
                            <button className="modal-btn cancel" onClick={() => setShowCustomModal(false)}>Cancel</button>
                            <button className="modal-btn save" onClick={saveCustomQuestion}>Save</button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}