import { Link } from "react-router-dom";
export default function SideNav(){
    return(
        <aside className="sidebar">
            <div className="sidebar-section">
                <div className="sidebar-title">Navigation</div>
               
                <Link to="/student" className="sidebar-item">
                    <div className="sidebar-icon">□</div>
                    <span>Dashboard</span>
                </Link>
                   

                <Link to="/student/Choice" className="sidebar-item">
                    <div className="sidebar-icon">▤</div>
                    <span>My Classes</span>
                </Link>
                
                <Link to="/student/doubt" className="sidebar-item">
                    <div className="sidebar-icon">○</div>
                    
                    <span>Upload Doubts</span>
                </Link>

                <Link to="/student/Choice" className="sidebar-item">
                    <div className="sidebar-icon">◐</div>
                    <span>Recent Notes</span>
                </Link>
                
            </div>
            
        </aside>
    )
}


        // <aside className="sidebar">
        //     <div className="sidebar-section">
        //         <div className="sidebar-title">Navigation</div>
        //         <a href="#" className="sidebar-item active">
        //             <div className="sidebar-icon">□</div>
        //             <span>Dashboard</span>
        //         </a>
        //         <a href="#" className="sidebar-item">
        //             <div className="sidebar-icon">▤</div>
        //             <span>My Classes</span>
        //         </a>
        //         <a href="#" className="sidebar-item">
        //             <div className="sidebar-icon">○</div>
        //             <span>Students</span>
        //         </a>
        //         <a href="#" className="sidebar-item">
        //             <div className="sidebar-icon">◐</div>
        //             <span>Assignments</span>
        //         </a>
        //         <a href="#" className="sidebar-item">
        //             <div className="sidebar-icon">◒</div>
        //             <span>Gradebook</span>
        //         </a>
        //     </div>
        //     <div className="sidebar-section">
        //         <div className="sidebar-title">Tools</div>
        //         <a href="#" className="sidebar-item">
        //             <div className="sidebar-icon">□</div>
        //             <span>Lesson Plans</span>
        //         </a>
        //         <a href="#" className="sidebar-item">
        //             <div className="sidebar-icon">▤</div>
        //             <span>Resources</span>
        //         </a>
        //         <a href="#" className="sidebar-item">
        //             <div className="sidebar-icon">○</div>
        //             <span>Virtual Classroom</span>
        //         </a>
        //         <a href="#" className="sidebar-item">
        //             <div className="sidebar-icon">◐</div>
        //             <span>Analytics</span>
        //         </a>
        //     </div>
        // </aside>
