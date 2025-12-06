import "./Styles.css"
import Layout from "../Layouts/Layout"
import Header from "./Header"
import Content from "./Content"
import QuizCointainer from "./Quiz-Cointainer"
import DoubtPanel from "./DoubtPanel";
import { useParams } from "react-router-dom";


export default function Lessons() {

    const {id}=useParams(); //lesson id

    let currentQuestion = 1;      //connect this all with db 
    const totalQuestions = 3;     //need to update this as per total Questions
    let answers = {};
    let quizStartTime;
    let quizTimer;
    const correctAnswers = {   //need to update this 
            1: 'B',
            2: 'A',
            3: 'True',
            4: 'x = 4',
            5: 'B'
        };


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
                <Header id={id}/>
                <Content id={id}/>
                
                    <QuizCointainer 
                        showNotification={showNotification} 
                        currentQuestion={currentQuestion}
                        totalQuestions={totalQuestions}
                        answers={answers}
                        correctAnswers={correctAnswers}
                    />
            </div>
            <DoubtPanel showNotification={showNotification}/>
        </div>
        </>
    )
}