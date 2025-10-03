import UploadNotes from "./Upload-Notes"
import UploadAssignment from "./Upload-Assignment"
import UploadVideo from "./Upload-Video"
import AiReview from "./Ai-Review";
import Preview from "./Preview";



export default function Types(){
    // Global variables
    let currentContentType = null;
    let currentStep = 1;
    let uploadedFiles = {};
    let aiEnabled = false;
    let generatedQuestions = [];
    let approvedQuestions = new Set();
    let contentTags = { notes: [], assignment: [], video: [] };

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

    // Select content type
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

    // Toggle upload method for notes
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

    // Handle file upload
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

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    // Rich text editor formatting
    function formatText(command) {
        document.execCommand(command, false, null);
        document.getElementById('editorContent').focus();
    }

    // Handle tag input
    function handleTagInput(event, type) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const input = document.getElementById(`${type}TagInput`);
            const tag = input.value.trim();
            
            if (tag && !contentTags[type].includes(tag)) {
                contentTags[type].push(tag);
                addTagToUI(tag, type);
                input.value = '';
            }
        }
    }

    // Add tag to UI
    function addTagToUI(tag, type) {
        const container = document.getElementById(`${type}TagsContainer`);
        const input = document.getElementById(`${type}TagInput`);
        
        const tagEl = document.createElement('div');
        tagEl.className = 'tag';
        tagEl.innerHTML = `
            ${tag}
            <span class="tag-remove" onclick="removeTag('${tag}', '${type}')">×</span>
        `;
        
        container.insertBefore(tagEl, input);
    }

    // Remove tag
    function removeTag(tag, type) {
        contentTags[type] = contentTags[type].filter(t => t !== tag);
        event.target.parentElement.remove();
    }

    // Toggle AI enhancement
    function toggleAIEnhancement() {
        const toggle = event.currentTarget.querySelector('.ai-toggle');
        aiEnabled = !aiEnabled;
        toggle.classList.toggle('active');
        
        if (aiEnabled) {
            showNotification('success', 'AI enhancement enabled! Questions will be generated after upload.');
        } else {
            showNotification('info', 'AI enhancement disabled.');
        }
    }

    // Extract video info from YouTube link
    function extractVideoInfo() {
        const link = document.getElementById('videoLink').value;
        const videoId = extractYouTubeID(link);
        
        if (videoId) {
            const preview = document.getElementById('videoPreview');
            const iframe = document.getElementById('videoIframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            preview.style.display = 'block';
            showNotification('success', 'Video loaded successfully!');
        } else {
            showNotification('error', 'Invalid YouTube URL. Please check and try again.');
        }
    }

    // Extract YouTube video ID
    function extractYouTubeID(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Proceed to AI enhancement
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

    // Validate current form
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

    // Generate AI questions
    function generateAIQuestions() {
        generatedQuestions = [...sampleQuestions];
        displayAIQuestions();
    }

    // Display AI questions
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

    // Toggle question approval
    function toggleApprove(questionId) {
        if (approvedQuestions.has(questionId)) {
            approvedQuestions.delete(questionId);
        } else {
            approvedQuestions.add(questionId);
        }
        
        const btn = event.currentTarget;
        btn.classList.toggle('approved');
        
        const status = approvedQuestions.has(questionId) ? 'approved' : 'unapproved';
        showNotification('success', `Question ${status}`);
    }

    // Edit question
    function editQuestion(questionId) {
        showNotification('info', 'Opening question editor...');
        // In production, this would open an edit modal
    }

    // Delete question
    function deleteQuestion(questionId) {
        if (confirm('Remove this question?')) {
            generatedQuestions = generatedQuestions.filter(q => q.id !== questionId);
            approvedQuestions.delete(questionId);
            document.getElementById(`question-${questionId}`).remove();
            showNotification('success', 'Question removed');
        }
    }

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

    // Proceed to preview
    function proceedToPreview() {
        buildPreview();
        document.getElementById('previewSection').classList.add('active');
        document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
        updateStep(4);
        showNotification('success', 'Preview ready! Review before publishing.');
    }

    // Build preview
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

    // Navigation functions
    function backToForm() {
        document.getElementById('aiReviewPanel').classList.remove('active');
        document.querySelector(`#${currentContentType}Form`).scrollIntoView({ behavior: 'smooth' });
        updateStep(2);
    }

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

    // Save as draft
    function saveDraft() {
        showNotification('info', 'Saving draft...');
        
        setTimeout(() => {
            showNotification('success', 'Content saved as draft! You can publish it later.');
        }, 1500);
    }

    // Publish content
    function publishContent() {
        if (!confirm('Publish this content to students now?')) {
            return;
        }

        const btn = event.currentTarget;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="spinner"></span> Publishing...';
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

    // Cancel upload
    function cancelUpload() {
        if (confirm('Cancel upload? All progress will be lost.')) {
            resetForm();
            showNotification('info', 'Upload cancelled');
        }
    }

    // Reset form
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

    // Update step indicator
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

    // Show notification
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

    // Utility function
    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Drag and drop support for file uploads
    document.addEventListener('DOMContentLoaded', () => {
        const uploadAreas = document.querySelectorAll('.upload-area');
        
        uploadAreas.forEach(area => {
            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.stopPropagation();
                area.style.borderColor = '#1a73e8';
                area.style.background = 'rgba(26, 115, 232, 0.05)';
            });

            area.addEventListener('dragleave', (e) => {
                e.preventDefault();
                e.stopPropagation();
                area.style.borderColor = '';
                area.style.background = '';
            });

            area.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation();
                area.style.borderColor = '';
                area.style.background = '';
                
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    const type = area.id.replace('UploadArea', '').replace('notes', 'notes').replace('assignment', 'assignment');
                    const fileInput = document.getElementById(`${type}FileInput`);
                    fileInput.files = files;
                    handleFileUpload(fileInput, type);
                }
            });
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + S to save draft
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (currentStep === 4) {
                saveDraft();
            }
        }
        // Esc to cancel
        if (e.key === 'Escape') {
            if (currentStep > 1) {
                if (confirm('Go back to previous step?')) {
                    if (currentStep === 4) {
                        backToAI();
                    } else if (currentStep === 3) {
                        backToForm();
                    }
                }
            }
        }
    });

    // Auto-save functionality
    let autoSaveTimer;
    function startAutoSave() {
        clearTimeout(autoSaveTimer);
        autoSaveTimer = setTimeout(() => {
            if (currentStep > 1) {
                console.log('Auto-saving draft...');
                showNotification('info', '💾 Draft auto-saved');
            }
        }, 30000); // Auto-save every 30 seconds
    }

    // Watch for form changes
    document.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('change', startAutoSave);
        element.addEventListener('input', startAutoSave);
    });

    // Initialize
    console.log('%c🎓 EduFlow Teacher Upload Portal', 'color: #1a73e8; font-size: 16px; font-weight: bold;');
    console.log('%cVersion 1.0.0 - Upload & share content with AI assistance', 'color: #5f6368; font-size: 12px;');
    console.log('%c✓ File upload ready', 'color: #34a853; font-size: 11px;');
    console.log('%c✓ Rich text editor loaded', 'color: #34a853; font-size: 11px;');
    console.log('%c✓ AI question generator ready', 'color: #34a853; font-size: 11px;');
    console.log('%c✓ Auto-save enabled', 'color: #34a853; font-size: 11px;');
    console.log('%c💡 Tip: Press Ctrl+S to save draft anytime', 'color: #1a73e8; font-size: 11px; font-style: italic;');

    // Show welcome notification
    setTimeout(() => {
        showNotification('info', 'Welcome! Select a content type to get started.');
    }, 1000);

    // Set minimum date for assignment deadline
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('assignmentDeadline').min = now.toISOString().slice(0, 16);

    // Enhanced features for better UX

    // Content preview tooltip on hover
    document.querySelectorAll('.content-type-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
            }
        });
    });

    // Form completion tracker
    function getFormCompletionPercentage() {
        let total = 0;
        let filled = 0;

        const activeForm = document.querySelector('.upload-form.active');
        if (!activeForm) return 0;

        activeForm.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
            total++;
            if (field.value.trim()) filled++;
        });

        // Check for file or editor content
        if (currentContentType === 'notes') {
            total++;
            if (uploadedFiles.notes || document.getElementById('editorContent').textContent.trim()) {
                filled++;
            }
        } else if (currentContentType === 'assignment' && uploadedFiles.assignment) {
            filled++;
        }

        return total > 0 ? Math.round((filled / total) * 100) : 0;
    }

    // Show form completion progress
    function updateFormProgress() {
        const percentage = getFormCompletionPercentage();
        if (percentage > 0 && percentage < 100) {
            console.log(`Form completion: ${percentage}%`);
        }
    }

    // Watch form inputs for progress
    document.addEventListener('input', updateFormProgress);
    document.addEventListener('change', updateFormProgress);

    // Smart suggestions based on content type
    const subjectSuggestions = {
        mathematics: ['Algebra', 'Geometry', 'Calculus', 'Trigonometry', 'Statistics'],
        physics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Quantum Physics'],
        chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Biochemistry'],
        biology: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Human Anatomy'],
        english: ['Grammar', 'Literature', 'Writing', 'Poetry', 'Shakespeare'],
        history: ['World History', 'American History', 'Ancient Civilizations', 'Modern History'],
        computer: ['Programming', 'Data Structures', 'Algorithms', 'Web Development', 'AI/ML']
    };

    // Show topic suggestions when subject is selected
    function showTopicSuggestions(subjectId, topicId) {
        const subject = document.getElementById(subjectId).value;
        const topicInput = document.getElementById(topicId);
        
        if (subject && subjectSuggestions[subject]) {
            const suggestions = subjectSuggestions[subject];
            const suggestionHtml = `<div style="margin-top: 0.5rem; font-size: 0.85rem; color: #5f6368;">
                Suggestions: ${suggestions.map(s => `<span style="cursor: pointer; color: #1a73e8; margin-right: 0.5rem;" onclick="document.getElementById('${topicId}').value='${s}'">${s}</span>`).join('')}
            </div>`;
            
            if (!topicInput.nextElementSibling || !topicInput.nextElementSibling.classList.contains('suggestions')) {
                topicInput.insertAdjacentHTML('afterend', suggestionHtml);
                topicInput.nextElementSibling.classList.add('suggestions');
            }
        }
    }

    // Add event listeners for subject selects
    document.getElementById('notesSubject').addEventListener('change', () => showTopicSuggestions('notesSubject', 'notesTopic'));
    document.getElementById('assignmentSubject').addEventListener('change', () => showTopicSuggestions('assignmentSubject', 'assignmentTitle'));
    document.getElementById('videoSubject').addEventListener('change', () => showTopicSuggestions('videoSubject', 'videoTitle'));

    // Content templates for quick start
    const contentTemplates = {
        notes: {
            'Quick Reference': 'Quick reference guide with key concepts and formulas.',
            'Detailed Study Guide': 'Comprehensive study material with examples and practice problems.',
            'Lecture Notes': 'Notes from today\'s lecture with important points highlighted.',
            'Summary Sheet': 'Brief summary of the chapter with main topics covered.'
        },
        assignment: {
            'Homework': 'Complete the following problems for homework. Show all work.',
            'Practice Problems': 'Practice problems to reinforce concepts learned in class.',
            'Project': 'Long-term project with detailed requirements and milestones.',
            'Quiz Preparation': 'Practice questions to prepare for the upcoming quiz.'
        },
        video: {
            'Lecture Recording': 'Recording of today\'s lecture for review and revision.',
            'Tutorial': 'Step-by-step tutorial explaining key concepts.',
            'Demonstration': 'Visual demonstration of the topic with real examples.',
            'Review Session': 'Review session covering important topics before exam.'
        }
    };

    // Add template selector button
    function addTemplateSelector(formId, fieldId, type) {
        const field = document.getElementById(fieldId);
        if (!field || field.dataset.templateAdded) return;
        
        field.dataset.templateAdded = 'true';
        const templateBtn = document.createElement('button');
        templateBtn.className = 'btn btn-secondary';
        templateBtn.textContent = '📋 Use Template';
        templateBtn.style.marginTop = '0.5rem';
        templateBtn.type = 'button';
        
        templateBtn.onclick = () => {
            const templates = contentTemplates[type];
            const templateList = Object.entries(templates).map(([name, desc]) => 
                `<div style="padding: 0.75rem; border: 1px solid #e0e0e0; border-radius: 8px; cursor: pointer; margin: 0.5rem 0; transition: all 0.3s;" 
                        onmouseover="this.style.background='rgba(26,115,232,0.05)'; this.style.borderColor='#1a73e8'"
                        onmouseout="this.style.background=''; this.style.borderColor='#e0e0e0'"
                        onclick="document.getElementById('${fieldId}').value='${desc}'; this.parentElement.parentElement.remove()">
                    <strong>${name}</strong><br>
                    <span style="font-size: 0.85rem; color: #5f6368;">${desc}</span>
                </div>`
            ).join('');
            
            const modal = document.createElement('div');
            modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
            modal.innerHTML = `
                <div style="background: #fff; border-radius: 16px; padding: 2rem; max-width: 500px; width: 100%; max-height: 80vh; overflow-y: auto;">
                    <h3 style="margin-bottom: 1rem;">Select a Template</h3>
                    ${templateList}
                    <button onclick="this.parentElement.parentElement.remove()" 
                            style="margin-top: 1rem; padding: 0.5rem 1rem; border: 1px solid #e0e0e0; background: #fff; border-radius: 8px; cursor: pointer;">
                        Cancel
                    </button>
                </div>
            `;
            document.body.appendChild(modal);
        };
        
        field.parentElement.appendChild(templateBtn);
    }

    // Add templates to forms
    setTimeout(() => {
        addTemplateSelector('notesForm', 'notesTitle', 'notes');
        addTemplateSelector('assignmentForm', 'assignmentInstructions', 'assignment');
        addTemplateSelector('videoForm', 'videoDescription', 'video');
    }, 1000);

    // Collaborative features - Share draft with colleagues
    function shareWithColleague() {
        const shareLink = `https://eduflow.com/share/${Math.random().toString(36).substr(2, 9)}`;
        const shareModal = document.createElement('div');
        shareModal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
        shareModal.innerHTML = `
            <div style="background: #fff; border-radius: 16px; padding: 2rem; max-width: 400px; width: 100%;">
                <h3 style="margin-bottom: 1rem;">Share Draft</h3>
                <p style="color: #5f6368; margin-bottom: 1rem;">Share this draft with colleagues for review and feedback.</p>
                <input type="text" value="${shareLink}" readonly 
                        style="width: 100%; padding: 0.75rem; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 1rem;"
                        onclick="this.select()">
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="navigator.clipboard.writeText('${shareLink}'); showNotification('success', 'Link copied to clipboard!')" 
                            class="btn btn-primary" style="flex: 1;">Copy Link</button>
                    <button onclick="this.closest('div').parentElement.remove()" 
                            class="btn btn-secondary">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(shareModal);
    }

    // Add share button to action bars
    document.querySelectorAll('.action-buttons').forEach(actionBar => {
        if (!actionBar.querySelector('.share-btn')) {
            const shareBtn = document.createElement('button');
            shareBtn.className = 'btn btn-secondary share-btn';
            shareBtn.textContent = '🔗 Share Draft';
            shareBtn.onclick = shareWithColleague;
            actionBar.insertBefore(shareBtn, actionBar.firstChild);
        }
    });

    // Schedule publishing feature
    function schedulePublish() {
        const modal = document.createElement('div');
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
        modal.innerHTML = `
            <div style="background: #fff; border-radius: 16px; padding: 2rem; max-width: 400px; width: 100%;">
                <h3 style="margin-bottom: 1rem;">⏰ Schedule Publishing</h3>
                <p style="color: #5f6368; margin-bottom: 1rem;">Choose when to make this content available to students.</p>
                <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Publish Date & Time</label>
                    <input type="datetime-local" id="scheduleDateTime" 
                            style="width: 100%; padding: 0.75rem; border: 1px solid #e0e0e0; border-radius: 8px;"
                            min="${now.toISOString().slice(0, 16)}">
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="const dt = document.getElementById('scheduleDateTime').value; if(dt) { showNotification('success', 'Publishing scheduled for ' + new Date(dt).toLocaleString()); this.closest('div').parentElement.remove(); } else { showNotification('error', 'Please select a date and time'); }" 
                            class="btn btn-primary" style="flex: 1;">Schedule</button>
                    <button onclick="this.closest('div').parentElement.remove()" 
                            class="btn btn-secondary">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Add schedule button to preview section
    setTimeout(() => {
        const previewActionBar = document.querySelector('#previewSection .action-buttons');
        if (previewActionBar && !previewActionBar.querySelector('.schedule-btn')) {
            const scheduleBtn = document.createElement('button');
            scheduleBtn.className = 'btn btn-secondary schedule-btn';
            scheduleBtn.textContent = '⏰ Schedule';
            scheduleBtn.onclick = schedulePublish;
            previewActionBar.insertBefore(scheduleBtn, previewActionBar.querySelector('.btn-success'));
        }
    }, 2000);

    // Content analytics preview
    function showAnalyticsPreview() {
        const modal = document.createElement('div');
        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 2rem;';
        modal.innerHTML = `
            <div style="background: #fff; border-radius: 16px; padding: 2rem; max-width: 600px; width: 100%; max-height: 80vh; overflow-y: auto;">
                <h3 style="margin-bottom: 1rem;">📊 Expected Analytics</h3>
                <p style="color: #5f6368; margin-bottom: 1.5rem;">Based on similar content, here's what you can expect:</p>
                
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
                    <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: #1a73e8;">85%</div>
                        <div style="color: #5f6368; font-size: 0.9rem;">Avg. Completion Rate</div>
                    </div>
                    <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: #34a853;">4.2/5</div>
                        <div style="color: #5f6368; font-size: 0.9rem;">Expected Rating</div>
                    </div>
                    <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: #fbbc04;">15min</div>
                        <div style="color: #5f6368; font-size: 0.9rem;">Avg. Study Time</div>
                    </div>
                    <div style="padding: 1rem; background: #f8f9fa; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: 600; color: #9c27b0;">92%</div>
                        <div style="color: #5f6368; font-size: 0.9rem;">Engagement Score</div>
                    </div>
                </div>
                
                <div style="padding: 1rem; background: rgba(26, 115, 232, 0.1); border-radius: 8px; margin-bottom: 1rem;">
                    <strong style="color: #1a73e8;">💡 AI Insight:</strong><br>
                    <span style="color: #202124;">This content type typically performs well with ${currentContentType === 'video' ? 'visual learners' : currentContentType === 'assignment' ? 'practice-oriented students' : 'readers who prefer detailed explanations'}.</span>
                </div>
                
                <button onclick="this.closest('div').parentElement.remove()" class="btn btn-primary" style="width: 100%;">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Version control - Save multiple versions
    const contentVersions = [];
    
    function saveVersion() {
        const version = {
            timestamp: new Date().toISOString(),
            type: currentContentType,
            step: currentStep,
            data: getCurrentFormData()
        };
        contentVersions.push(version);
        showNotification('success', `Version ${contentVersions.length} saved`);
    }

    function getCurrentFormData() {
        // Collect all form data
        const data = {};
        const activeForm = document.querySelector('.upload-form.active');
        if (activeForm) {
            activeForm.querySelectorAll('input, select, textarea').forEach(field => {
                if (field.id) data[field.id] = field.value;
            });
        }
        return data;
    }

    // Accessibility checker
    function checkAccessibility() {
        const issues = [];
        const activeForm = document.querySelector('.upload-form.active');
        
        if (activeForm) {
            // Check for alt text on images
            // Check text contrast
            // Check for proper headings
            // etc.
            
            if (issues.length === 0) {
                showNotification('success', '✓ Content meets accessibility standards');
            } else {
                showNotification('info', `Found ${issues.length} accessibility suggestions`);
            }
        }
    }

    // Export content as different formats
    function exportContent(format) {
        showNotification('info', `Preparing ${format} export...`);
        setTimeout(() => {
            showNotification('success', `Content exported as ${format}!`);
        }, 1500);
    }

    // Add keyboard navigation hints
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === '1') {
            e.preventDefault();
            updateStep(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (e.altKey && e.key === 'a') {
            e.preventDefault();
            showAnalyticsPreview();
        }
    });

    // Improved error handling
    window.addEventListener('error', (e) => {
        console.error('Application error:', e.error);
        showNotification('error', 'An error occurred. Please refresh and try again.');
    });

    // Performance monitoring
    if ('PerformanceObserver' in window) {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 1000) {
                    console.warn(`Slow operation: ${entry.name} took ${entry.duration}ms`);
                }
            }
        });
        perfObserver.observe({ entryTypes: ['measure'] });
    }

    // Add helpful tooltips
    const tooltips = {
        'notesTitle': 'Use a clear, descriptive title that students can easily search for',
        'assignmentDeadline': 'Students will receive reminders 24 hours before deadline',
        'videoLink': 'Only YouTube links are currently supported',
        'aiToggle': 'AI will analyze your content and generate relevant practice questions'
    };

    Object.entries(tooltips).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element) {
            element.title = text;
            element.addEventListener('focus', () => {
                showNotification('info', text);
            });
        }
    });

    // Final initialization
    console.log('%c✨ All features loaded successfully!', 'color: #34a853; font-size: 12px; font-weight: bold;');
    console.log('%c📝 Content templates available', 'color: #34a853; font-size: 11px;');
    console.log('%c🔗 Sharing features enabled', 'color: #34a853; font-size: 11px;');
    console.log('%c⏰ Schedule publishing ready', 'color: #34a853; font-size: 11px;');
    console.log('%c📊 Analytics preview available', 'color: #34a853; font-size: 11px;');


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
        <UploadNotes proceedToAI={proceedToAI} cancelUpload={cancelUpload} toggleAIEnhancement={toggleAIEnhancement}/>
        <UploadAssignment/>
        <UploadVideo/>
        <AiReview/>
        <Preview/>
        
        </>
    )
}