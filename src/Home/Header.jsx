export default function Header(){
    return(
        <header class="header">
        <nav class="nav">
            <a href="#" class="logo">EduFlow</a>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#courses">Courses</a></li>
                <li><a href="#resources">Resources</a></li>
                <li><a href="#support">Support</a></li>
                <li><button class="cta-button">Get Started</button></li>
            </ul>
            <div class="mobile-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
    </header>
    )
}