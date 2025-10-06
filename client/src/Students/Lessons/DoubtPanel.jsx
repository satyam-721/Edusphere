export default function DoubtPanel({showNotification}){
    function toggleDoubtPanel() {
        document.getElementById('doubtPanel').classList.toggle('active');
    }

    function submitDoubt() {
        const doubtText = document.getElementById('doubtInput').value.trim();
        
        if (!doubtText) {
            showNotification('error', 'Please enter your doubt');
            return;
        }

        
        setTimeout(() => {
            document.getElementById('doubtInput').value = '';
            toggleDoubtPanel();
            showNotification('success', 'Your doubt has been submitted! Teacher will respond soon.');
        }, 1000);
    }



    return(
        <>
        <div className="doubt-panel" id="doubtPanel">
            <div className="doubt-panel-header">
                <div className="doubt-panel-title">❓ Ask a Doubt</div>
                <button className="close-doubt-btn" onClick={toggleDoubtPanel}>✕</button>
            </div>
            <div className="doubt-panel-body">
                <textarea className="doubt-input" id="doubtInput" placeholder="What would you like to ask about this lesson?"></textarea>
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "#5f6368" }}>
                        <input type="checkbox" defaultChecked style={{ cursor: "pointer" }} />
                        Link to this lesson (Algebra - Linear Equations)
                    </label>
                </div>
                <div className="doubt-actions">
                    <button className="doubt-btn cancel"  onClick={toggleDoubtPanel} >Cancel</button>
                    <button className="doubt-btn submit"  onClick={submitDoubt} >Submit</button>
                </div>
            </div>
        </div>
        {/* <!-- Floating Action Button --> */}
        <button className="fab"  onClick={toggleDoubtPanel}  title="Ask a Doubt">❓</button>

        {/* <!-- Notification --> */}
        <div className="notification" id="notification"></div>
        </>
    )
}