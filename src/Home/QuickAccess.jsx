export default function QuickAccess(){
    return(
        <section class="quick-access">
        <div class="container">
            <h2 class="section-title">Choose Your Role</h2>
            <p class="section-subtitle">Get started with the tools designed for your educational journey</p>
            <div class="access-grid">
                <div class="access-card" data-role="teacher">
                    <span class="access-icon">👨‍🏫</span>
                    <h3>For Teachers</h3>
                    <p>Create courses, manage students, track progress, and deliver engaging lessons</p>
                </div>
                <div class="access-card" data-role="student">
                    <span class="access-icon">👨‍🎓</span>
                    <h3>For Students</h3>
                    <p>Join classes, submit assignments, collaborate with peers, and track your learning</p>
                </div>
                <div class="access-card" data-role="parent">
                    <span class="access-icon">👨‍👩‍👧‍👦</span>
                    <h3>For Parents</h3>
                    <p>Monitor your child's progress, communicate with teachers, and stay informed</p>
                </div>
                <div class="access-card" data-role="admin">
                    <span class="access-icon">🏫</span>
                    <h3>For Administrators</h3>
                    <p>Manage school operations, oversee courses, and analyze institutional performance</p>
                </div>
            </div>
        </div>
    </section>
    )
}