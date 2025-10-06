import Mcq from "./Mcq.jsx";
import TrueFalse from "./TrueFalse.jsx";
import ShortAnswers from "./ShortAnswers.jsx";


import { useRef } from "react";

export default function QuizCointainer({showNotification,correctAnswers,currentQuestion,answers,totalQuestions}){

    const quizStartTimeRef = useRef(null);

    function startQuiz() {
        document.getElementById('quizStartScreen').style.display = 'none';
        document.getElementById('quizContainer').classList.add('active');
        quizStartTimeRef.current = Date.now();
        showNotification('success', 'Quiz started! Good luck! 🍀');
        
        // Start timer
        startQuizTimer();
    }
     function startQuizTimer() {
        // Timer would update in real implementation
    }

    function previousQuestion() {
        if (currentQuestion > 1) {
            // Hide current question
            document.querySelector(`[data-question="${currentQuestion}"]`).style.display = 'none';
            
            // Show previous question
            currentQuestion--;
            document.querySelector(`[data-question="${currentQuestion}"]`).style.display = 'block';
            
            // Update navigation buttons
            document.getElementById('nextBtn').style.display = 'block';
            document.getElementById('submitBtn').style.display = 'none';
            
            if (currentQuestion === 1) {
                document.getElementById('prevBtn').disabled = true;
            }
            
            // Scroll to top
            document.querySelector(`[data-question="${currentQuestion}"]`).scrollIntoView({ behavior: 'smooth' });
        }
    }

    function nextQuestion() {
        if (currentQuestion < totalQuestions) {
            // Hide current question
            document.querySelector(`[data-question="${currentQuestion}"]`).style.display = 'none';
            
            // Show next question
            currentQuestion++;
            document.querySelector(`[data-question="${currentQuestion}"]`).style.display = 'block';
            
            // Update navigation buttons
            document.getElementById('prevBtn').disabled = false;
            
            if (currentQuestion === totalQuestions) {
                document.getElementById('nextBtn').style.display = 'none';
                document.getElementById('submitBtn').style.display = 'block';
            }
            
            // Scroll to top
            document.querySelector(`[data-question="${currentQuestion}"]`).scrollIntoView({ behavior: 'smooth' });
        }
    }

    function submitQuiz() {
        // Get short answer
        const answer4 = document.getElementById('answer4').value;
        if (answer4.trim()) {
            answers[4] = answer4;
        }

        // Check if all questions answered
        if (Object.keys(answers).length < totalQuestions) {
            showNotification('error', 'Please answer all questions before submitting');
            return;
        }

        if (!confirm('Submit your quiz? You cannot change answers after submission.')) {
            return;
        }

        // Calculate score
        let correct = 0;
        for (let q in correctAnswers) {
            if (q == 4) {
                // Short answer - will be graded by teacher
                continue;
            }
            if (answers[q] === correctAnswers[q]) {
                correct++;
            }
        }

        const percentage = Math.round((correct / (totalQuestions - 1)) * 100);
        
        // Calculate time taken
        const timeElapsed = Date.now() - quizStartTimeRef.current;
        const minutes = Math.floor(timeElapsed / 60000);
        const seconds = Math.floor((timeElapsed % 60000) / 1000);
        const timeTaken = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Show results
        document.getElementById('quizContainer').classList.remove('active');
        document.getElementById('quizResults').classList.add('active');
        document.getElementById('correctCount').textContent = `${correct}/${totalQuestions - 1}`;
        document.getElementById('timeTaken').textContent = timeTaken;
        document.querySelector('.results-score').textContent = `${percentage}%`;
        
        const resultsIcon = document.querySelector('.results-icon');
        const resultsMessage = document.querySelector('.results-message');
        
        if (percentage >= 70) {
            resultsIcon.textContent = '🎉';
            resultsMessage.textContent = 'Great job! You passed the quiz.';
            resultsMessage.style.color = '#34a853';
        } else {
            resultsIcon.textContent = '💪';
            resultsMessage.textContent = 'Keep practicing! You can retake the quiz.';
            resultsMessage.style.color = '#fbbc04';
        }

        showNotification('success', 'Quiz submitted successfully!');
        
        // Update progress
        updateProgress('quiz', 'completed');
    }

    function updateProgress(type, status) {
        // Update progress indicators
        const progressItems = document.querySelectorAll('.progress-item');
        
        if (type === 'quiz') {
            const quizProgress = progressItems[1];
            const icon = quizProgress.querySelector('.progress-icon');
            const value = quizProgress.querySelector('.progress-value');
            
            icon.className = 'progress-icon completed';
            icon.textContent = '✓';
            value.textContent = 'Completed';
        }
    }
    function reviewAnswers() {
        document.getElementById('quizResults').classList.remove('active');
        document.getElementById('quizContainer').classList.add('active');
        currentQuestion = 1;
        document.querySelector(`[data-question="1"]`).style.display = 'block';
        
        // Show correct/incorrect status
        for (let q in correctAnswers) {
            if (q == 4) continue; // Skip short answer
            
            const questionCard = document.querySelector(`[data-question="${q}"]`);
            const options = questionCard.querySelectorAll('.option-item');
            
            options.forEach(option => {
                const optionText = option.querySelector('div:last-child').textContent;
                const optionLetter = optionText.charAt(0);
                
                if (optionLetter === correctAnswers[q]) {
                    option.classList.add('correct');
                } else if (answers[q] && optionLetter === answers[q]) {
                    option.classList.add('incorrect');
                }
                option.style.pointerEvents = 'none';
            });
        }

        // Disable navigation to submit
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('nextBtn').style.display = 'block';
        document.getElementById('nextBtn').textContent = 'Next →';
        
        showNotification('info', 'Reviewing your answers. Correct answers are highlighted in green.');
    }


    function retakeQuiz() {
        if (!confirm('Retake the quiz? Your previous score will be replaced.')) {
            return;
        }

        // Reset everything
        currentQuestion = 1;
        answers = {};
        
        // Reset UI
        document.getElementById('quizResults').classList.remove('active');
        document.getElementById('quizStartScreen').style.display = 'block';
        
        // Reset all questions
        document.querySelectorAll('.question-card').forEach((card, index) => {
            card.style.display = index === 0 ? 'block' : 'none';
            card.querySelectorAll('.option-item').forEach(option => {
                option.classList.remove('selected', 'correct', 'incorrect');
                option.style.pointerEvents = 'auto';
            });
        });

        // Reset navigation
        document.getElementById('prevBtn').disabled = true;
        document.getElementById('nextBtn').style.display = 'block';
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('nextBtn').textContent = 'Next →';

        // Reset short answer
        document.getElementById('answer4').value = '';

        showNotification('info', 'Ready to retake the quiz!');
    }










    //NEED TO CHECK THISSSSSS

    function selectOption(element, questionNum, answer) {
        console.log("optionchanged to: "+answer)
        // Remove selection from siblings
        const siblings = element.parentElement.children;
        for (let sibling of siblings) {
            sibling.classList.remove('selected');
        }
        
        // Add selection to clicked option
        element.classList.add('selected');
        
        // Store answer
        answers[questionNum] = answer;
    }



















    return(
        <div className="quiz-section">
            <div className="quiz-header">
                <h2 className="section-title">
                    🎯 Practice & Quiz
                    <span className="ai-badge">AI Generated</span>
                </h2>
            </div>

            <div className="quiz-info">
                <div className="quiz-info-title">Quiz Information</div>
                <div className="quiz-meta">
                    <span>📝 10 Questions</span>
                    <span>⏱️ 20 Minutes</span>
                    <span>🎯 Pass Score: 70%</span>
                </div>
            </div>

            {/* <!-- Quiz Start Screen --> */}
            <div id="quizStartScreen">
                <button className="start-quiz-btn"  onClick={startQuiz} >
                    🚀 Start Quiz
                </button>
            </div>

            {/* <!-- Quiz Container --> */}
            <div className="quiz-container" id="quizContainer">

                <Mcq selectOption={selectOption}/>
                <TrueFalse selectOption={selectOption}/>
                <ShortAnswers/>


                <div className="quiz-navigation">
                    <button className="quiz-nav-btn secondary" id="prevBtn"  onClick={previousQuestion} disabled>← Previous</button>
                    <button className="quiz-nav-btn primary" id="nextBtn"  onClick={nextQuestion} >Next →</button>
                    <button className="quiz-nav-btn primary" id="submitBtn" style={{ display: "none" }}  onClick={submitQuiz} >Submit Quiz</button>
                </div>
            </div>

            {/* <!-- Quiz Results --> */}
            <div className="quiz-results" id="quizResults">
                <div className="results-icon">🎉</div>
                <div className="results-score">80%</div>
                <div className="results-message">Great job! You passed the quiz.</div>
                <div style={{ background: "#f8f9fa", padding: "1rem", borderRadius: "8px", margin: "1rem 0", maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span>Correct Answers:</span>
                        <strong id="correctCount">8/10</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Time Taken:</span>
                        <strong id="timeTaken">12:34</strong>
                    </div>
                </div>
                <div className="results-actions">
                    <button className="quiz-nav-btn secondary"  onClick={reviewAnswers} >📝 Review Answers</button>
                    <button className="quiz-nav-btn primary"  onClick={retakeQuiz} >🔄 Retake Quiz</button>
                </div>
            </div>
        </div>
    )
}