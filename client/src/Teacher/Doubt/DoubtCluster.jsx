export function DoubtCluster({ clusterId, title, count, grade, doubtClusters }) {

    function answerCluster(clusterId) {
        const modal = document.getElementById('answerModal');
        const modalDoubts = document.getElementById('modalDoubts');
        
        const doubts = doubtClusters[clusterId] || [];
        modalDoubts.innerHTML = `
            <h4 style="margin: 0 0 1rem 0; color: #202124;">Students who asked (${doubts.length}):</h4>
            ${doubts.slice(0, 3).map(doubt => `
                <div style="background: #fff; padding: 0.75rem; margin-bottom: 0.5rem; border-radius: 8px; font-size: 0.8rem;">
                    <strong>${doubt.student}:</strong> ${doubt.doubt.substring(0, 100)}
                </div>
            `).join('')}
            ${doubts.length > 3 ? `<div style="color: #5f6368; font-size: 0.8rem; text-align: center;">...and ${doubts.length - 3} more students</div>` : ''}
        `;
        
        modal.style.display = 'flex';
        
        // Set current cluster ID for sending
        modal.dataset.clusterId = clusterId;
    }



    function expandCluster(clusterId) {
        const cluster = document.querySelector(`[data-cluster="${clusterId}"]`);
        
        // Check if already expanded
        if (cluster.classList.contains('cluster-expanded')) {
            // Collapse
            const expandedContent = cluster.querySelector('.individual-doubts');
            if (expandedContent) expandedContent.remove();
            cluster.classList.remove('cluster-expanded');
            return;
        }

        // Expand
        cluster.classList.add('cluster-expanded');
        
        const doubts = doubtClusters[clusterId] || [];
        const doubtsHTML = `
            <div class="individual-doubts fade-in">
                <div class="individual-title">Individual Student Doubts (${doubts.length})</div>
                ${doubts.map(doubt => `
                    <div class="individual-doubt">
                        <div class="doubt-student">${doubt.student}</div>
                        <div class="doubt-text">${doubt.doubt}</div>
                        <div class="doubt-time">${doubt.time}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        cluster.insertAdjacentHTML('beforeend', doubtsHTML);

        // Show notification
        // showNotification('success', `Expanded cluster with ${doubts.length} individual doubts`);
    }


    return(
        
        <div className="doubt-cluster" data-cluster={clusterId}>
            <div className="cluster-header">
                <div className="cluster-icon">⚡</div>
                <div className="cluster-content">
                    <div className="cluster-title">{title}</div>
                    <div className="cluster-summary">
                        {doubtClusters[clusterId] ? doubtClusters[clusterId][0].doubt : "No doubts available"}
                    </div>
                    <div className="cluster-meta">
                        <div className="meta-item">
                            <span className="meta-badge urgent-badge">doubt type</span>
                        </div>
                        <div className="meta-item">📊 {count} students</div>
                        <div className="meta-item">📚 {grade} </div>
                    </div>
                    <div className="cluster-actions">
                        <button className="cluster-btn" onClick={()=>expandCluster(clusterId)} >View Details</button>
                        <button className="cluster-btn primary" onClick={()=>answerCluster(clusterId)}>Answer All</button>
                    </div>
                </div>
            </div>
        </div>
    )
}