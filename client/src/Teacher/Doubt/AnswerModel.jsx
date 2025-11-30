
export default function AnswerModel(props){






    return(
        <div id="answerModal" style={{ display: 'none', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', width: '90%', maxWidth: '800px', borderRadius: '16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid #e0e0e0' }}>
                <h2 style={{ margin: 0, color: '#202124', fontSize: '1.5rem' }}>Answer Doubt Cluster</h2>
                <p style={{ margin: '0.5rem 0 0 0', color: '#5f6368' }}>Your response will be sent to all students in this cluster</p>
            </div>
            
            {/* <!-- Individual Doubts in Modal --> */}
            <div id="modalDoubts" style={{ maxHeight: '200px', overflowY: 'auto', background: '#f8f9fa', padding: '1rem' }}>
                {/* <!-- Populated dynamically --> */}
            </div>
            
            {/* <!-- Answer Section --> */}
            <div class="answer-section">
                <div class="answer-title">
                    Your Response
                    {/* <span className="ai-badge" style={{ fontSize: '0.7rem' }}>AI-Assisted</span> */}
                </div>
                <textarea 
                    class="answer-textarea" 
                    placeholder="Type your answer here..."
                    id="answerText"
                ></textarea>
                
                <div class="answer-actions">
                    <button class="attachment-btn">📎 Attach Files</button>
                    <button class="ai-suggest-btn">🤖 AI Suggest</button>
                    <button class="faq-btn">📚 Save to FAQ</button>
                    <button class="send-btn" id="sendAnswer">Send to All Students</button>
                </div>
            </div>
            
            <div style={{ padding: '1rem 2rem', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'end', gap: '1rem' }}>
                <button  onClick={()=> props.closeAnswerModal()} style={{ background: 'none', border: '1px solid #e0e0e0', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                {/* onClick={() => window.closeAnswerModal && window.closeAnswerModal()} */}
            </div>
        </div>
    </div>
    )
}