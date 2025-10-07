export default function Steps(){
    return(
        <div className="progress-steps">
            <div className="step active" id="step1">
                <div className="step-circle">1</div>
                <span className="step-label">Select Type</span>
            </div>
            <span className="step-arrow">→</span>
            <div className="step" id="step2">
                <div className="step-circle">2</div>
                <span className="step-label">Upload Content</span>
            </div>
            <span className="step-arrow">→</span>
            <div className="step" id="step3">
                <div className="step-circle">3</div>
                <span className="step-label">AI Enhancement</span>
            </div>
            <span className="step-arrow">→</span>
            <div className="step" id="step4">
                <div className="step-circle">4</div>
                <span className="step-label">Publish</span>
            </div>
        </div>
    )
}