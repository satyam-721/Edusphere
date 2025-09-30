export default function FilterSection(){
    return(
        <div className="filter-section">
                <div className="filter-group">
                    <span className="filter-label">Subject:</span>
                    <select className="filter-select">
                        <option>All Subjects</option>
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                    </select>
                </div>
                <div className="filter-group">
                    <span className="filter-label">Class:</span>
                    <select className="filter-select">
                        <option>All Classes</option>
                        <option>Grade 10A</option>
                        <option>Grade 10B</option>
                        <option>Grade 11A</option>
                    </select>
                </div>
                <div className="filter-group">
                    <span className="filter-label">Priority:</span>
                    <select className="filter-select">
                        <option>All Priorities</option>
                        <option>Urgent</option>
                        <option>High</option>
                        <option>Normal</option>
                    </select>
                </div>
                <div className="filter-group">
                    <span className="filter-label">Search:</span>
                    <input type="text" className="filter-input" placeholder="Search doubts..."></input>
                </div>
                <button className="filter-btn">Apply Filters</button>
            </div>
    )
}