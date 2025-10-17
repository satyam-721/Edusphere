import UploadNotes from "./Upload-Notes"
import UploadAssignment from "./Upload-Assignment"
import UploadVideo from "./Upload-Video"
import AiReview from "./Ai-Review";
import Preview from "./Preview";
import { useState } from "react";



export default function Types(){
    let currentContentType = null;
    let currentStep = 1;
    let uploadedFiles = {};
    let aiEnabled = false;
    let generatedQuestions = [];
    let approvedQuestions = new Set();
    let contentTags = { notes: [], assignment: [], video: [] };
    const [toggleStyle, setToggleStyle] = useState('#1a73e8'); 
    // Sample AI-generated questions
    const sampleQuestions = [
        {
            id: 1,
            question: "According to Newton's Second Law, what is the relationship between force, mass, and acceleration?",
            options: ["F = m + a", "F = m × a", "F = m ÷ a", "F = m - a"],
            correct: 1,
            type: "mcq"
        },
        {
            id: 2,
            question: "Which of the following is an example of Newton's Third Law?",
            options: ["A car accelerating", "A rocket propelling upward", "An object at rest", "Friction slowing motion"],
            correct: 1,
            type: "mcq"
        },
        {
            id: 3,
            question: "An object in motion will stay in motion unless acted upon by an external force.",
            answer: true,
            type: "truefalse"
        },
        {
            id: 4,
            question: "Explain Newton's First Law of Motion in your own words.",
            type: "short"
        }
    ];

    function showNotification(type, message) {
        const notification = document.getElementById('notification');
        notification.className = `notification ${type}`;
        
        const icons = { success: '✅', error: '❌', info: 'ℹ️' };
        const labels = { success: 'Success', error: 'Error', info: 'Info' };
        
        notification.innerHTML = `<strong>${icons[type]} ${labels[type]}:</strong> ${message}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, type === 'error' ? 4000 : 3000);
    }

    function updateStep(step) {
            currentStep = step;
            
            for (let i = 1; i <= 4; i++) {
                const stepEl = document.getElementById(`step${i}`);
                stepEl.classList.remove('active', 'completed');
                
                if (i < step) {
                    stepEl.classList.add('completed');
                } else if (i === step) {
                    stepEl.classList.add('active');
                }
            }
        }

    function selectContentType(type) {
        currentContentType = type;
        
        // Update UI
        document.querySelectorAll('.content-type-card').forEach(card => {
            card.classList.remove('selected');
        });
        event.currentTarget.classList.add('selected');

        // Hide all forms
        document.getElementById('notesForm').classList.remove('active');
        document.getElementById('assignmentForm').classList.remove('active');
        document.getElementById('videoForm').classList.remove('active');

        // Show selected form
        setTimeout(() => {
            document.getElementById(`${type}Form`).classList.add('active');
            document.getElementById(`${type}Form`).scrollIntoView({ behavior: 'smooth' });
            updateStep(2);
            showNotification('info', `${capitalizeFirst(type)} form loaded. Fill in the details below.`);
        }, 300);
    }

    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function toggleAIEnhancement(event) {
        const next=document.getElementById('nextStep');
        const toggle = event.currentTarget.querySelector('.ai-toggle');
        aiEnabled = !aiEnabled;
        toggle.classList.toggle('active');
        
        if (aiEnabled) {
            showNotification('success', 'AI enhancement enabled! Questions will be generated after upload.');
            setToggleStyle('#1ae873ff');
            next.textContent="Next: AI Enhancement";

        } else {
            showNotification('info', 'AI enhancement disabled.');
            setToggleStyle('#1a73e8');
            next.textContent="Next: Preview";
        }
    }
    function cancelUpload() {
        if (confirm('Cancel upload? All progress will be lost.')) {
            resetForm();
            showNotification('info', 'Upload cancelled');
        }
    }

    function resetForm() {
        currentContentType = null;
        currentStep = 1;
        uploadedFiles = {};
        aiEnabled = false;
        generatedQuestions = [];
        approvedQuestions.clear();
        contentTags = { notes: [], assignment: [], video: [] };

        // Reset UI
        document.querySelectorAll('.content-type-card').forEach(card => {
            card.classList.remove('selected');
        });
        document.querySelectorAll('.upload-form').forEach(form => {
            form.classList.remove('active');
            form.querySelectorAll('input, select, textarea').forEach(input => {
                input.value = '';
            });
        });
        document.getElementById('aiReviewPanel').classList.remove('active');
        document.getElementById('previewSection').classList.remove('active');
        
        updateStep(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function proceedToAI() {
        if (!validateCurrentForm()) {
            return;
        }

        if (aiEnabled) {
            showNotification('info', 'Generating AI questions...');
            setTimeout(() => {
                generateAIQuestions();
                document.getElementById('aiReviewPanel').classList.add('active');
                document.getElementById('aiReviewPanel').scrollIntoView({ behavior: 'smooth' });
                updateStep(3);
            }, 2000);
        } else {
            proceedToPreview();
        }
    }

    function validateCurrentForm() {
        let isValid = true;
        let message = '';

        if (currentContentType === 'notes') {
            const title = document.getElementById('notesTitle').value;
            const subject = document.getElementById('notesSubject').value;
            const classGrade = document.getElementById('notesClass').value;
            const hasFile = uploadedFiles.notes;
            const hasContent = document.getElementById('editorContent').textContent.trim();

            if (!title) {
                message = 'Please enter a title';
                isValid = false;
            } else if (!subject) {
                message = 'Please select a subject';
                isValid = false;
            } else if (!classGrade) {
                message = 'Please select a class';
                isValid = false;
            } else if (!hasFile && !hasContent) {
                message = 'Please upload a file or add content in the editor';
                isValid = false;
            }
        } else if (currentContentType === 'assignment') {
            const title = document.getElementById('assignmentTitle').value;
            const subject = document.getElementById('assignmentSubject').value;
            const classGrade = document.getElementById('assignmentClass').value;
            const deadline = document.getElementById('assignmentDeadline').value;

            if (!title) {
                message = 'Please enter an assignment title';
                isValid = false;
            } else if (!subject) {
                message = 'Please select a subject';
                isValid = false;
            } else if (!classGrade) {
                message = 'Please select a class';
                isValid = false;
            } else if (!deadline) {
                message = 'Please set a deadline';
                isValid = false;
            }
        } else if (currentContentType === 'video') {
            const title = document.getElementById('videoTitle').value;
            const link = document.getElementById('videoLink').value;
            const subject = document.getElementById('videoSubject').value;
            const classGrade = document.getElementById('videoClass').value;

            if (!title) {
                message = 'Please enter a video title';
                isValid = false;
            } else if (!link) {
                message = 'Please paste a YouTube link';
                isValid = false;
            } else if (!extractYouTubeID(link)) {
                message = 'Invalid YouTube URL';
                isValid = false;
            } else if (!subject) {
                message = 'Please select a subject';
                isValid = false;
            } else if (!classGrade) {
                message = 'Please select a class';
                isValid = false;
            }
        }

        if (!isValid) {
            showNotification('error', message);
        }

        return isValid;
    }

    function proceedToPreview() {
        buildPreview();
        document.getElementById('previewSection').classList.add('active');
        document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
        updateStep(4);
        showNotification('success', 'Preview ready! Review before publishing.');
    }

    function generateAIQuestions() {
        generatedQuestions = [...sampleQuestions];
        displayAIQuestions();
    }

    function displayAIQuestions() {
        const container = document.getElementById('aiQuestionsList');
        container.innerHTML = '';

        generatedQuestions.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'question-card';
            card.id = `question-${q.id}`;

            let optionsHTML = '';
            if (q.type === 'mcq') {
                optionsHTML = '<div class="question-options">' +
                    q.options.map((opt, idx) => 
                        `<div class="option ${idx === q.correct ? 'correct' : ''}">${String.fromCharCode(65 + idx)}. ${opt}</div>`
                    ).join('') +
                    '</div>';
            } else if (q.type === 'truefalse') {
                optionsHTML = `<div class="question-options">
                    <div class="option ${q.answer ? 'correct' : ''}">True</div>
                    <div class="option ${!q.answer ? 'correct' : ''}">False</div>
                </div>`;
            } else if (q.type === 'short') {
                optionsHTML = '<div style="color: #5f6368; font-size: 0.9rem; font-style: italic;">Open-ended question - Students will type their answer</div>';
            }

            card.innerHTML = `
                <div class="question-header">
                    <span class="question-number">Question ${index + 1}</span>
                    <div class="question-actions">
                        <button class="action-icon-btn ${approvedQuestions.has(q.id) ? 'approved' : ''}" 
                                onclick="toggleApprove(${q.id})" title="Approve">
                            ✓
                        </button>
                        <button class="action-icon-btn" onclick="editQuestion(${q.id})" title="Edit">
                            ✏️
                        </button>
                        <button class="action-icon-btn" onclick="deleteQuestion(${q.id})" title="Remove">
                            ✗
                        </button>
                    </div>
                </div>
                <div class="question-text">${q.question}</div>
                ${optionsHTML}
            `;

            container.appendChild(card);
        });
    }

    function toggleUploadMethod(method) {
        const fileArea = document.getElementById('fileUploadArea');
        const editorArea = document.getElementById('richEditorArea');
        const fileBtn = document.getElementById('fileMethodBtn');
        const editorBtn = document.getElementById('editorMethodBtn');

        if (method === 'file') {
            fileArea.style.display = 'block';
            editorArea.style.display = 'none';
            fileBtn.classList.add('btn-primary');
            fileBtn.classList.remove('btn-secondary');
            editorBtn.classList.remove('btn-primary');
            editorBtn.classList.add('btn-secondary');
        } else {
            fileArea.style.display = 'none';
            editorArea.style.display = 'block';
            editorBtn.classList.add('btn-primary');
            editorBtn.classList.remove('btn-secondary');
            fileBtn.classList.remove('btn-primary');
            fileBtn.classList.add('btn-secondary');
        }
    }

    function handleFileUpload(input, type) {
        if (input.files && input.files[0]) {
            const file = input.files[0];
            
            // Validate file size
            if (file.size > 25 * 1024 * 1024) {
                showNotification('error', 'File size exceeds 25MB. Please choose a smaller file.');
                input.value = '';
                return;
            }

            uploadedFiles[type] = file;
            
            // Update UI
            document.getElementById(`${type}UploadArea`).classList.add('has-file');
            document.getElementById(`${type}FileName`).textContent = file.name;
            document.getElementById(`${type}FileSize`).textContent = formatFileSize(file.size);
            document.getElementById(`${type}FilePreview`).classList.add('show');
            
            showNotification('success', `File "${file.name}" uploaded successfully!`);
        }
    }
    

    // Remove file
    function removeFile(type) {
        uploadedFiles[type] = null;
        document.getElementById(`${type}FileInput`).value = '';
        document.getElementById(`${type}UploadArea`).classList.remove('has-file');
        document.getElementById(`${type}FilePreview`).classList.remove('show');
        showNotification('info', 'File removed');
    }

    function formatText(command) {
        document.execCommand(command, false, null);
        document.getElementById('editorContent').focus();
    }


    function buildPreview() {
        const metaContainer = document.getElementById('previewMeta');
        const contentContainer = document.getElementById('previewContent');
        
        let metaHTML = '';
        let contentHTML = '';

        if (currentContentType === 'notes') {
            const title = document.getElementById('notesTitle').value;
            const subject = document.getElementById('notesSubject').value;
            const classGrade = document.getElementById('notesClass').value;
            const topic = document.getElementById('notesTopic').value;

            metaHTML = `
                <div class="meta-item">
                    <div class="meta-label">Title</div>
                    <div class="meta-value">${title}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Subject</div>
                    <div class="meta-value">${capitalizeFirst(subject)}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Class</div>
                    <div class="meta-value">${classGrade.replace('grade', 'Grade ')}</div>
                </div>
                ${topic ? `<div class="meta-item"><div class="meta-label">Topic</div><div class="meta-value">${topic}</div></div>` : ''}
                <div class="meta-item">
                    <div class="meta-label">Tags</div>
                    <div class="meta-value">${contentTags.notes.join(', ') || 'None'}</div>
                </div>
            `;

            if (uploadedFiles.notes) {
                contentHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">📄</div>
                        <div style="font-weight: 500; margin-bottom: 0.5rem;">${uploadedFiles.notes.name}</div>
                        <div style="color: #5f6368; font-size: 0.9rem;">${formatFileSize(uploadedFiles.notes.size)}</div>
                    </div>
                `;
            } else {
                contentHTML = document.getElementById('editorContent').innerHTML || '<p style="color: #5f6368; text-align: center;">No content added</p>';
            }
        } else if (currentContentType === 'assignment') {
            const title = document.getElementById('assignmentTitle').value;
            const subject = document.getElementById('assignmentSubject').value;
            const classGrade = document.getElementById('assignmentClass').value;
            const deadline = document.getElementById('assignmentDeadline').value;
            const points = document.getElementById('assignmentPoints').value;
            const instructions = document.getElementById('assignmentInstructions').value;

            const deadlineDate = new Date(deadline);
            const formattedDeadline = deadlineDate.toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            });

            metaHTML = `
                <div class="meta-item">
                    <div class="meta-label">Title</div>
                    <div class="meta-value">${title}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Type</div>
                    <div class="meta-value">📝 Assignment</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Subject</div>
                    <div class="meta-value">${capitalizeFirst(subject)}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Class</div>
                    <div class="meta-value">${classGrade.replace('grade', 'Grade ')}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Due Date</div>
                    <div class="meta-value">${formattedDeadline}</div>
                </div>
                ${points ? `<div class="meta-item"><div class="meta-label">Points</div><div class="meta-value">${points}</div></div>` : ''}
            `;

            contentHTML = `
                ${instructions ? `<div style="margin-bottom: 1.5rem;"><strong>Instructions:</strong><br>${instructions}</div>` : ''}
                ${uploadedFiles.assignment ? `
                    <div style="text-align: center; padding: 2rem; background: #fff; border-radius: 8px;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">📄</div>
                        <div style="font-weight: 500; margin-bottom: 0.5rem;">${uploadedFiles.assignment.name}</div>
                        <div style="color: #5f6368; font-size: 0.9rem;">${formatFileSize(uploadedFiles.assignment.size)}</div>
                    </div>
                ` : '<p style="color: #5f6368; text-align: center;">No file attached</p>'}
            `;
        } else if (currentContentType === 'video') {
            const title = document.getElementById('videoTitle').value;
            const link = document.getElementById('videoLink').value;
            const subject = document.getElementById('videoSubject').value;
            const classGrade = document.getElementById('videoClass').value;
            const description = document.getElementById('videoDescription').value;
            const videoId = extractYouTubeID(link);

            metaHTML = `
                <div class="meta-item">
                    <div class="meta-label">Title</div>
                    <div class="meta-value">${title}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Type</div>
                    <div class="meta-value">🎥 Video</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Subject</div>
                    <div class="meta-value">${capitalizeFirst(subject)}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Class</div>
                    <div class="meta-value">${classGrade.replace('grade', 'Grade ')}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Source</div>
                    <div class="meta-value">YouTube</div>
                </div>
            `;

            contentHTML = `
                ${description ? `<div style="margin-bottom: 1.5rem;"><strong>Description:</strong><br>${description}</div>` : ''}
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; background: #000;">
                    <iframe src="https://www.youtube.com/embed/${videoId}" 
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
                            allowfullscreen>
                    </iframe>
                </div>
            `;
        }

        metaContainer.innerHTML = metaHTML;
        contentContainer.innerHTML = contentHTML;

        // Show questions if AI was enabled
        if (aiEnabled && generatedQuestions.length > 0) {
            document.getElementById('previewQuestions').style.display = 'block';
            document.getElementById('questionCount').textContent = generatedQuestions.length;
            
            const questionsContainer = document.getElementById('previewQuestionsList');
            questionsContainer.innerHTML = generatedQuestions.map((q, idx) => {
                const isApproved = approvedQuestions.has(q.id);
                const statusBadge = isApproved ? '<span style="color: #34a853; margin-left: 0.5rem;">✓ Approved</span>' : '';
                
                let optionsHTML = '';
                if (q.type === 'mcq') {
                    optionsHTML = q.options.map((opt, i) => 
                        `<div style="padding: 0.5rem; margin: 0.25rem 0; background: ${i === q.correct ? 'rgba(52, 168, 83, 0.1)' : '#fff'}; border-radius: 6px;">${String.fromCharCode(65 + i)}. ${opt}</div>`
                    ).join('');
                } else if (q.type === 'truefalse') {
                    optionsHTML = `
                        <div style="padding: 0.5rem; margin: 0.25rem 0; background: ${q.answer ? 'rgba(52, 168, 83, 0.1)' : '#fff'}; border-radius: 6px;">True</div>
                        <div style="padding: 0.5rem; margin: 0.25rem 0; background: ${!q.answer ? 'rgba(52, 168, 83, 0.1)' : '#fff'}; border-radius: 6px;">False</div>
                    `;
                }

                return `
                    <div style="background: #fff; padding: 1.5rem; margin-bottom: 1rem; border-radius: 8px; border: 1px solid #e0e0e0;">
                        <div style="font-weight: 600; margin-bottom: 1rem; color: #1a73e8;">
                            Question ${idx + 1}${statusBadge}
                        </div>
                        <div style="margin-bottom: 1rem;">${q.question}</div>
                        ${optionsHTML}
                    </div>
                `;
            }).join('');
        }
    }

































    return(
        <>
        <div class="content-type-section" id="contentTypeSection">
            <h2 class="section-title">Step 1: Select Content Type</h2>
            <div class="content-type-grid">
                <div class="content-type-card" onClick={()=>selectContentType('notes')}>
                    <div class="content-icon">📘</div>
                    <div class="content-type-title">Notes</div>
                    <div class="content-type-desc">Upload study materials, PDFs, or create rich text notes</div>
                </div>
                <div class="content-type-card" onClick={()=>selectContentType('assignment')}>
                    <div class="content-icon">📝</div>
                    <div class="content-type-title">Assignment</div>
                    <div class="content-type-desc">Create assignments with deadlines and instructions</div>
                </div>
                <div class="content-type-card" onClick={()=>selectContentType('video')}>
                    <div class="content-icon">🎥</div>
                    <div class="content-type-title">Video</div>
                    <div class="content-type-desc">Share YouTube videos or educational content</div>
                </div>
            </div>
        </div>
        <UploadNotes 
            proceedToAI={proceedToAI}
            cancelUpload={cancelUpload}
            toggleAIEnhancement={toggleAIEnhancement}  
            toggleUploadMethod={toggleUploadMethod}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
            formatText={formatText}
            toggleStyle={toggleStyle}

            />
        <UploadAssignment
            cancelUpload={cancelUpload}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
            toggleAIEnhancement={toggleAIEnhancement}
        />
        <UploadVideo/>
        <AiReview 
            showNotification={showNotification}
            generatedQuestions={generatedQuestions}
            approvedQuestions={approvedQuestions}
            displayAIQuestions={displayAIQuestions}
            buildPreview={buildPreview}
            currentContentType={currentContentType}
            updateStep={updateStep}

        />
        <Preview
            showNotification={showNotification}
            updateStep={updateStep}
            aiEnabled={aiEnabled}
            currentContentType={currentContentType}
            resetForm={resetForm}
        />

        {/* <!-- Notification --> */}
        <div class="notification" id="notification"></div>
        
        </>
    )
}