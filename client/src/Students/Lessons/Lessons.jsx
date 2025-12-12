import "./Styles.css"
import Layout from "../Layouts/Layout"
import Header from "./Header"
import Content from "./Content"
import QuizCointainer from "./Quiz-Cointainer"
import DoubtPanel from "./DoubtPanel";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react"


export default function Lessons() {

    const [getAiAnswer, setGetAIAnswer] = useState("Waiting for answer...")
    const selectedTextRef = useRef(null); // stable across renders

    function handleTextSelection(text){
        selectedTextRef.current = text;

        const aiIcon = document.querySelector(".ai-chat-icon");
        if (aiIcon) {
            aiIcon.style.opacity = '1';
        }
    }
    function handleTextDes(){
        const aiIcon = document.querySelector(".ai-chat-icon");
        setTimeout(()=>{
            if (aiIcon) {
                aiIcon.style.opacity = '0.3';
            }
        },500);
    }

    function loadAiChat(){
        const aiIcon = document.querySelector(".ai-chat-icon");
        const actualOpacity = aiIcon ? window.getComputedStyle(aiIcon).opacity : "0";

        if (!(aiIcon && actualOpacity === '1')) {
            console.log("AI icon inactive. Opacity:", actualOpacity);
            return;
        }

        const selectedText = selectedTextRef.current;
        if (!selectedText || selectedText.trim() === "") {
            setGetAIAnswer('No text selected.');
            // still open panel showing the 'No text selected.' message:
        }

        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.5)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '9999';

        const panel = document.createElement('div');
        panel.style.background = '#fff';
        panel.style.padding = '20px';
        panel.style.borderRadius = '8px';
        panel.style.maxWidth = '600px';
        panel.style.width = '90%';
        panel.style.position = 'relative';
        panel.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.innerText = '✕';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '8px';
        closeBtn.style.right = '8px';
        closeBtn.style.border = 'none';
        closeBtn.style.background = 'transparent';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.setAttribute('aria-label', 'Close');

        const paragraph = document.createElement('p');
        paragraph.style.margin = '0';
        paragraph.style.whiteSpace = 'pre-wrap';
        paragraph.textContent = getAiAnswer.answer || 'No text selected.';

        function closePanel() {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            document.body.style.overflow = '';
        }

        closeBtn.addEventListener('click', closePanel);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closePanel();
        });

        panel.appendChild(closeBtn);
        panel.appendChild(paragraph);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // --- Kick off the async fetch and update both React state and the paragraph element ---
        (async () => {
            if (!selectedText || selectedText.trim() === "") {
                // show immediate message and return (or keep panel open)
                setGetAIAnswer('No text selected.');
                paragraph.textContent = 'No text selected.';
                return;
            }
            console.log("Fetching answer....")
            setGetAIAnswer('Fetching answer...');
            paragraph.textContent = 'Fetching answer...';

            try {
                const res = await fetch('http://localhost:5000/aianswer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: selectedText })
                });

                if (!res.ok) {
                    const errText = await res.text();
                    throw new Error(errText || `Request failed with status ${res.status}`);
                }

                const data = await res.json();
                console.log("DATA I GOT: ",data)
                setGetAIAnswer(data.answer);
                paragraph.textContent = data.answer.text || 'No answer returned.';

            } catch (err) {
                console.error(err);
                setGetAIAnswer('Error fetching AI answer.');
                paragraph.textContent = 'Error fetching AI answer.';
                showNotification('error', 'Failed to load AI answer.');
            }
        })();

    }

    const {id}=useParams(); //lesson id

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
        <Layout loadAiChat={loadAiChat}/>
        <div className="main-layout">
            <div className="main-content">
                <Header id={id}/>
                <Content id={id} handleTextSelection={handleTextSelection} handleTextDes={handleTextDes}/>
                    <QuizCointainer 
                        showNotification={showNotification} 
                        id={id}
                    />
            </div>
            <DoubtPanel showNotification={showNotification}/>
        </div>
        </>
    )
}
