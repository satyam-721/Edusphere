export default function QuickAction({ showNotification }) {
    return (
        <div className="quick-actions">
            <div
                className="action-card"
                // onClick={() => showNotification('info', 'Opening notifications...')}
            >
                <div className="action-icon notifications">🔔</div>
                <div className="action-content">
                    <div className="action-title">Notifications</div>
                    <div className="action-desc">3 new updates</div>
                </div>
                <span className="action-badge">3</span>
            </div>

            <div
                className="action-card"
                // onClick={() => showNotification('info', 'Loading upcoming quizzes...')}
            >
                <div className="action-icon quizzes">🎯</div>
                <div className="action-content">
                    <div className="action-title">Quizzes Due Soon</div>
                    <div className="action-desc">2 this week</div>
                </div>
                <span className="action-badge">2</span>
            </div>

            <div
                className="action-card"
                // onClick={() => showNotification('info', 'Opening doubt section...')}
            >
                <div className="action-icon doubts">💬</div>
                <div className="action-content">
                    <div className="action-title">Ask a Doubt</div>
                    <div className="action-desc">Get help anytime</div>
                </div>
            </div>

            <div
                className="action-card"
                // onClick={() => showNotification('success', 'You have 3 new badges! 🏆')}
            >
                <div className="action-icon achievements">🏆</div>
                <div className="action-content">
                    <div className="action-title">My Achievements</div>
                    <div className="action-desc">45 stars earned</div>
                </div>
            </div>
        </div>
    );
}