export default function Mcq({selectOption}){

    


    return(
        <div className="question-card" data-question="1">
            <div className="question-header">
                <span className="question-number">Question 1 of 10</span>
                <span className="question-type">Multiple Choice</span>
            </div>
            <div className="question-text">
                What is the standard form of a linear equation in one variable?
            </div>
            <div className="options-container">
                <div className="option-item" onClick={(event)=>selectOption(event.target, 1, 'B')}>
                    <div className="option-radio"></div>
                    <div>A. x² + ax + b = 0</div>
                </div>
                <div className="option-item" onClick={(event)=>selectOption(event.target, 1, 'B')}>
                    <div className="option-radio"></div>
                    <div>B. ax + b = 0</div>
                </div>
                <div className="option-item" onClick={(event)=>selectOption(event.target, 1, 'C')}>
                    <div className="option-radio"></div>
                    <div>C. ax² + bx + c = 0</div>
                </div>
                <div className="option-item" onClick={(event)=>selectOption(event.target, 1, 'D')}>
                    <div className="option-radio"></div>
                    <div>D. a/x + b = 0</div>
                </div>
            </div>
        </div>
    )
}