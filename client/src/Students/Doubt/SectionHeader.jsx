export default function SectionHeader(){
    function filterDoubts(status){
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