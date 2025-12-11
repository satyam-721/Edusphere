import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";

export default function Header(){
    let {id}=useParams(); //lesson id
    id=id-1;
    const [title, settitle] = useState(null);
    const [subject, setsubject] = useState(null);

    

    useEffect(() => {
            (async () => {
                try {
                    const response = await fetch("http://localhost:5000/assignmentnotesfetch", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (!response.ok) {
                        throw new Error(`Fetch failed: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log("Fetched notes: from header", data[id]);
                    settitle(data[id].title); 
                    setsubject(data[id].subject.toUpperCase());
                } catch (err) {
                    console.error("Error fetching doubt types:", err);
                }
            })();
        }, []);






    return(
        <div className="lesson-header" >
            <div className="header-content stu">
                <h1 className="lesson-title">{title}</h1>
                <div className="lesson-meta">
                    <div className="meta-item">
                        <span>📚</span>
                        <span>{subject}</span>
                    </div>
                    <div className="meta-item">
                        <span>👨‍🏫</span>
                        <span>Mr. Demo Teacher</span>
                    </div>
                    <div className="meta-item">
                        <span>📅</span>
                        <span>Posted: Dec 12, 2025</span>
                    </div>
                    <div className="meta-item">
                        <span>⏱️</span>
                        <span>No Time Limit</span>
                    </div>
                </div>
            </div>
        </div>
    )
}