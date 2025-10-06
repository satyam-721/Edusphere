export default function shortAnswers(){
    return(
        <div className="question-card" data-question="3" style={{display: 'none'}}>
            <div className="question-header">
                <span className="question-number">Question 3 of 10</span>
                <span className="question-type">Short Answer</span>
            </div>
            <div className="question-text">
                Solve for x and show your work: 5x - 3 = 2x + 9
            </div>
            <textarea className="answer-textarea" placeholder="Type your answer here..." id="answer4"></textarea>
        </div>
    )
}