export default function TrueFalse({selectOption}){
    return(
        <div className="question-card" data-question="2" style={{display: 'none'}}>
            <div className="question-header">
                <span className="question-number">Question 2 of 10</span>
                <span className="question-type">True/False</span>
            </div>
            <div className="question-text">
                The graph of a linear equation is always a straight line.
            </div>
            <div className="options-container">
                <div className="option-item" onClick={(e)=>selectOption(e.target, 3, 'True')}>
                    <div className="option-radio"></div>
                    <div>True</div>
                </div>
                <div className="option-item" onClick={(e)=>selectOption(e.target, 3, 'False')}>
                    <div className="option-radio"></div>
                    <div>False</div>
                </div>
            </div>
        </div>
    )
}