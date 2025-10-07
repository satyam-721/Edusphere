export default function Header(){
    return(
        <header className="header">
        <nav className="nav">
            <a href="#" className="logo">EduFlow</a>
            <ul className="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#courses">Courses</a></li>
                <li><a href="#resources">Resources</a></li>
                <li><a href="#support">Support</a></li>
                <li><button className="cta-button">Get Started</button></li>
            </ul>
            <div className="mobile-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    </header>
    )
}