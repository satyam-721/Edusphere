export default function Steps(){
    return(
        <div class="progress-steps">
            <div class="step active" id="step1">
                <div class="step-circle">1</div>
                <span class="step-label">Select Type</span>
            </div>
            <span class="step-arrow">→</span>
            <div class="step" id="step2">
                <div class="step-circle">2</div>
                <span class="step-label">Upload Content</span>
            </div>
            <span class="step-arrow">→</span>
            <div class="step" id="step3">
                <div class="step-circle">3</div>
                <span class="step-label">AI Enhancement</span>
            </div>
            <span class="step-arrow">→</span>
            <div class="step" id="step4">
                <div class="step-circle">4</div>
                <span class="step-label">Publish</span>
            </div>
        </div>
    )
}