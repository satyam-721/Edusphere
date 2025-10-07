import Layout from "../Layouts/Layout"
import Header from "./Header"
import ProgressBar from "./ProgressBar"
import QuickAction from "./QuickAction"
import SubjectSection from "./SubjectSection"
import ProgressCard from "./ProgressCard"


import './SStyle.module.css'
export default function LessonsDashboard() {
    function showNotification(type, message) {
        const notification = document.getElementById('notification');
        notification.className = `notification ${type}`;
        
        const icons = { success: '✅', error: '❌', info: 'ℹ️' };
        const labels = { success: 'Success', error: 'Error', info: 'Info' };
        
        notification.innerHTML = `<strong>${icons[type]} ${labels[type]}:</strong> ${message}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, type === 'error' ? 4000 : 3000);
    }

    return(
        <>
        <Layout/>
        
        <div className="main-layout">
            <div className="main-content">
                <Header/>
                <ProgressBar/>   {/*DATABASE: progress for each subject*/}
                <QuickAction/>
                <SubjectSection
                    showNotification={showNotification}
                    />
                <ProgressCard/>
            </div>

        </div>

        </>
    )
}