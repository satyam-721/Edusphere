export default function Footer(){
    return(
        <>
        <footer className="footer">
        <div className="container">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>For Educators</h3>
                    <a href="#">Teaching Tools</a>
                    <a href="#">Course Creation</a>
                    <a href="#">Assessment</a>
                    <a href="#">Professional Development</a>
                </div>
                <div className="footer-section">
                    <h3>For Students</h3>
                    <a href="#">Learning Resources</a>
                    <a href="#">Study Groups</a>
                    <a href="#">Mobile App</a>
                    <a href="#">Student Support</a>
                </div>
                <div className="footer-section">
                    <h3>For Schools</h3>
                    <a href="#">Enterprise Solutions</a>
                    <a href="#">Admin Tools</a>
                    <a href="#">Integration</a>
                    <a href="#">Training</a>
                </div>
                <div className="footer-section">
                    <h3>Support</h3>
                    <a href="#">Help Center</a>
                    <a href="#">Community</a>
                    <a href="#">Contact Us</a>
                    <a href="#">System Status</a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 EduFlow. Empowering education worldwide.</p>
            </div>
        </div>
    </footer>

    <div className="floating-help" title="Need Help?">💬</div>

    <div className="notification">
        <strong>Welcome to EduFlow!</strong> Choose your role above to get started with personalized features.
    </div>
        </>
    )
}