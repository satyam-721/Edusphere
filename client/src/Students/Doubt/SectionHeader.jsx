export default function SectionHeader(){
    function filterDoubts(status){
    }

    return(


        <div className="section-header">
            <h2 className="section-title">📝 My Doubts</h2>
            <div className="filter-tabs">
                <button className="filter-tab active" onClick={()=>filterDoubts('all')}>All</button>
                <button className="filter-tab" onClick={()=>filterDoubts('pending')}>Pending</button>
                <button className="filter-tab" onClick={()=>filterDoubts('answered')}>Answered</button>
                <button className="filter-tab" onClick={()=>filterDoubts('resolved')}>Resolved</button>
            </div>
        </div>
    )
}