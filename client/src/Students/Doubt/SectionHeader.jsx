export default function SectionHeader(){
    function filterDoubts(status) {
            // Update active tab
            document.querySelectorAll('.filter-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            event.target.classList.add('active');

            // Filter cards
            const cards = document.querySelectorAll('.doubt-card');
            cards.forEach(card => {
                if (status === 'all') {
                    card.style.display = 'block';
                } else {
                    card.style.display = card.dataset.status === status ? 'block' : 'none';
                }
            });

            showNotification('info', `Showing ${status === 'all' ? 'all' : status} doubts`);
        }


    return(


        <div class="section-header">
            <h2 class="section-title">📝 My Doubts</h2>
            <div class="filter-tabs">
                <button class="filter-tab active" onClick={()=>filterDoubts('all')}>All</button>
                <button class="filter-tab" onClick={()=>filterDoubts('pending')}>Pending</button>
                <button class="filter-tab" onClick={()=>filterDoubts('answered')}>Answered</button>
                <button class="filter-tab" onClick={()=>filterDoubts('resolved')}>Resolved</button>
            </div>
        </div>
    )
}