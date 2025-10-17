export default function AiSuggestions(){
    return(
        <div className="ai-suggestions">
                        <div className="section-header">
                            <div className="section-title">
                                AI Suggestions
                                <span className="ai-badge">Smart</span>
                            </div>
                        </div>
                        <div className="ai-suggestion-item">
                            <div className="suggestion-title">Suggested Answer Draft</div>
                            <div className="suggestion-content">
                                "Newton's Second Law states that F = ma. To calculate force, multiply mass (in kg) by acceleration (in m/s²). 
                                For example, if a 2kg object accelerates at 3m/s², the force is 6N."
                            </div>
                            <div className="suggestion-actions">
                                <button className="suggestion-btn">Use This</button>
                                <button className="suggestion-btn">Edit</button>
                                <button className="suggestion-btn">Regenerate</button>
                            </div>
                        </div>
                        <div className="ai-suggestion-item">
                            <div className="suggestion-title">Related Resources</div>
                            <div className="suggestion-content">
                                Found 3 relevant materials: "Force Calculation Worksheet", "Newton's Laws Video", 
                                and "Physics Lab - Motion Experiments"
                            </div>
                            <div className="suggestion-actions">
                                <button className="suggestion-btn">Attach All</button>
                                <button className="suggestion-btn">Preview</button>
                            </div>
                        </div>
                        <div className="ai-suggestion-item">
                            <div className="suggestion-title">FAQ Recommendation</div>
                            <div className="suggestion-content">
                                This appears to be a commonly asked question. Consider adding to FAQ library 
                                for future reference.
                            </div>
                            <div className="suggestion-actions">
                                <button className="suggestion-btn">Add to FAQ</button>
                                <button className="suggestion-btn">Not Now</button>
                            </div>
                        </div>
                    </div>
    )
}