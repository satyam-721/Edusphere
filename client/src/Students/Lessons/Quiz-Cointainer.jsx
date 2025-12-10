import Mcq from "./Mcq.jsx";
import TrueFalse from "./TrueFalse.jsx";
import ShortAnswers from "./ShortAnswers.jsx";
import React, { useRef, useState,useEffect } from "react";



export default function QuizCointainer({showNotification,id}){
    id=id-1;
    const[sampleQuestions,setSampleQuestions]=useState([]);
    
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://localhost:5000/assignmentnotesfetch", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (!response.ok) {
                    throw new Error(`Fetch failed: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched data: QUIZCONTAINER", data);
                console.log("Fetched notes: QUIZCONTAINER", data[id].questions);
                setSampleQuestions(JSON.parse(data[id].questions)); 
                console.log("SampleQuestions: ",sampleQuestions);
            } catch (err) {
                console.error("Error fetching doubt types:", err);
            }
        })();
    }, []);

    // const sampleQuestions = [
    //     {
    //         id: 1,
    //         question: "According to Newton's Second Law, what is the relationship between force, mass, and acceleration?",
    //         options: ["F = m + a", "F = m × a", "F = m ÷ a", "F = m - a"],
    //         correct: 1,
    //         type: "mcq"
    //     },
    //     {
    //         id: 2,
    //         question: "Which of the following is an example of Newton's Third Law?",
    //         options: ["A car accelerating", "A rocket propelling upward", "An object at rest", "Friction slowing motion"],
    //         correct: 1,
    //         type: "mcq"
    //     },
    //     {
    //         id: 3,
    //         question: "An object in motion will stay in motion unless acted upon by an external force.",
    //         answer: true,
    //         type: "truefalse"
    //     },
    //     {
    //         id: 4,
    //         question: "Explain Newton's First Law of Motion in your own words.",
    //         type: "short"
    //     },
    //     {
    //         id:5,
    //         question: "Explain Newton's First Law of Motion in your own words.",
    //         type: "short"
    //     }
    // ];

    


        // let answers = {};

        // const quizStartTimeRef = useRef(null);
        const answersRef = useRef({}); // store answers here persistently across renders

    // let currentQuestion = 1;      //connect this all with db 
    // const totalQuestions = 3;     //need to update this as per total Questions

    // let correctAnswers = {   //need to update this 
    //         1: 'B',
    //         2: 'A',
    //         3: 'True',
    //         4: 'x = 4',
    //         5: 'B'
    //     };
    // let correctAnswers = {};

    const quizStartTimeRef = useRef(null);


    function initializeQuizData(questions) {
    let total = questions.length;
    let correctMap = {};

    questions.forEach((q, index) => {
        // MCQ → Convert correct index to A/B/C/D format
        if (q.type === "mcq") {
            const letter = String.fromCharCode(65 + q.correct); // 65 = A
            correctMap[q.id] = letter;
        }

        // True/False → Convert boolean to "True"/"False"
        else if (q.type === "truefalse") {
            correctMap[q.id] = q.answer ? "True" : "False";
        }

        // Short answer → leave blank (teacher evaluates)
        else if (q.type === "short") {
            correctMap[q.id] = ""; 
        }
    });

    return {
        totalQuestions: total,
        correctAnswers: correctMap,
        currentQuestion: 1
    };
}

    const { totalQuestions, correctAnswers, currentQuestion: startQ } = initializeQuizData(sampleQuestions);
    

    let currentQuestion = startQ;
    const [currentIndex, setCurrentIndex] = useState(0); // index into sampleQuestions (0-based)

    console.log("Correct Answers Map:", correctAnswers);
    console.log("Total Questions:", totalQuestions);
    console.log("Starting Question:", currentQuestion);

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
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);

            // UI button updates
            document.getElementById('nextBtn').style.display = 'block';
            document.getElementById('submitBtn').style.display = 'none';
            document.getElementById('prevBtn').disabled = newIndex === 0;

            // scroll the newly visible question into view
            const qid = sampleQuestions[newIndex].id;
            const el = document.querySelector(`[data-question="${qid}"]`);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        }
// scroll the currently visible question into view whenever currentIndex changes
useEffect(() => {
  const qid = sampleQuestions[currentIndex]?.id;
  if (!qid) return;

  const el = document.querySelector(`[data-question="${qid}"]`);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}, [currentIndex]);

    function nextQuestion() {
  // If not on last, advance index
  setCurrentIndex(prev => {
    const newIndex = Math.min(prev + 1, sampleQuestions.length - 1);
    return newIndex;
  });
}



    function submitQuiz() {
        // Collect all short answers dynamically
        document.querySelectorAll('.short-answer-input').forEach(input => {
            const idMatch = input.id.match(/^answer-(\d+)$/);
            if (idMatch) {
            const qid = idMatch[1];
            const val = input.value.trim();
            if (val) answersRef.current[qid] = val;
            }
        });

        // Now use answersRef.current for checks
        const answers = answersRef.current;

        // Check if all questions answered
        // Note: if you want to skip short-answer questions when checking "all answered",
        // adapt this check to only count non-short questions. Here we'll require an
        // answer for every question (including short). Change if you prefer.
        if (Object.keys(answers).length < totalQuestions) {
            showNotification('error', 'Please answer all questions before submitting');
            return;
        }

        if (!confirm('Submit your quiz? You cannot change answers after submission.')) {
            return;
        }

        // Calculate score (skip short answers in grading if desired)
        let correct = 0;
        for (let q in correctAnswers) {
            // If you left correctAnswers for short as empty string, skip grading them
            if (correctAnswers[q] === "") continue;

            // answers keys might be numbers or strings; property lookup will coerce
            if (answers[q] === correctAnswers[q]) {
            correct++;
            }
        }

        // Avoid divide-by-zero: count only gradable questions
        const gradableCount = Object.values(correctAnswers).filter(v => v !== "").length;
        const percentage = gradableCount ? Math.round((correct / gradableCount) * 100) : 0;
        
        // Calculate time taken
        const timeElapsed = Date.now() - quizStartTimeRef.current;
        const minutes = Math.floor(timeElapsed / 60000);
        const seconds = Math.floor((timeElapsed % 60000) / 1000);
        const timeTaken = `${minutes}:${seconds.toString().padStart(2, '0')}`;

        // Show results
        document.getElementById('quizContainer').classList.remove('active');
        document.getElementById('quizResults').classList.add('active');
        document.getElementById('correctCount').textContent = `${correct}/${gradableCount}`;
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

        fetch('http://localhost:5000/saveScore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id})
        }).catch(err => console.error('Error Updating score:', err));
    
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

        // 1) Reset answers store (use the ref you created earlier)
        if (answersRef) answersRef.current = {};

        // 2) Reset index so first question becomes visible
        setCurrentIndex(0);

        // 3) Reset UI screens
        const resultsEl = document.getElementById('quizResults');
        const startEl = document.getElementById('quizStartScreen');
        const containerEl = document.getElementById('quizContainer');

        if (resultsEl) resultsEl.classList.remove('active');
        if (startEl) startEl.style.display = 'block';
        if (containerEl) containerEl.classList.remove('active');

        // 4) Reset option states and pointerEvents (so user can reselect)
        document.querySelectorAll('.option-item').forEach(option => {
            option.classList.remove('selected', 'correct', 'incorrect');
            option.style.pointerEvents = 'auto';
        });

        // 5) Clear all short answer inputs (works for any number of short answers)
        document.querySelectorAll('.short-answer-input').forEach(inp => {
            inp.value = '';
        });

        // 6) Reset navigation UI if you still rely on these DOM bits (safe fallback)
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        if (nextBtn) {
            nextBtn.style.display = 'block';
            nextBtn.textContent = 'Next →';
        }
        if (submitBtn) submitBtn.style.display = 'none';

        // 7) Reset timer reference
        if (quizStartTimeRef) quizStartTimeRef.current = null;

        showNotification('info', 'Ready to retake the quiz!');
        }











    //NEED TO CHECK THISSSSSS

    function selectOption(element, questionNum, answer) {
        // Remove selection from siblings
        const siblings = element.parentElement.children;
        for (let sibling of siblings) {
            sibling.classList.remove('selected');
        }
        
        // Add selection to clicked option
        element.classList.add('selected');
        
        // Store answer in ref
        answersRef.current[questionNum] = answer;
        console.log('answersRef now:', answersRef.current);
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
            {/* Render questions dynamically based on sampleQuestions */}
            <div className="quiz-container" id="quizContainer">
            {sampleQuestions.map((q, idx) => {
  return (
    <React.Fragment key={q.id}>
            {q.type === 'mcq' && (
                <Mcq
                question={q}
                selectOption={selectOption}
                index={idx}
                total={sampleQuestions.length}
                // let component know which question is currently visible
                isVisible={idx === currentIndex}
                />
            )}
            {q.type === 'truefalse' && (
                <TrueFalse
                question={q}
                selectOption={selectOption}
                index={idx}
                total={sampleQuestions.length}
                isVisible={idx === currentIndex}
                />
            )}
            {q.type === 'short' && (
                <ShortAnswers
                question={q}
                index={idx}
                total={sampleQuestions.length}
                isVisible={idx === currentIndex}
                />
            )}
            </React.Fragment>
        );
        })}


            <div className="quiz-navigation">
                {currentIndex < sampleQuestions.length - 1 ? (
                    <button className="quiz-nav-btn primary" id="nextBtn" onClick={nextQuestion}>Next →</button>
                ) : (
                    <button className="quiz-nav-btn primary" id="submitBtn" onClick={submitQuiz}>Submit Quiz</button>
                )}
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
                    {/* <button className="quiz-nav-btn secondary"  onClick={reviewAnswers} >📝 Review Answers</button> */}
                    <button className="quiz-nav-btn primary"  onClick={retakeQuiz} >🔄 Retake Quiz</button>
                </div>
            </div>
        </div>
    )
}