import React, { useEffect } from "react";
export default function AiSuggestions(){

    const [answers,setAnswers]=React.useState([]);
    useEffect(() => {
    
            let mounted = true;
    
            //to get from database
            console.log("connecting to backend to fetch teacher doubts");
    
            (async () => {
                try {
                    const response = await fetch("http://localhost:5000/doubtteacher", {
                        method: "GET", 
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
    
                    if (!response.ok) {
                        throw new Error(`Fetch failed: ${response.status}`);
                    }
                    const fetched = await response.json();
                    setAnswers(fetched.answers);
                    console.log("from answer component: ",fetched.answers);
    
    
                } catch (err) {
                    console.error("Error fetching doubts:", err);
                }
            })();
    
            return () => {
                mounted = false;
            };  
        }, []);

    return (
    <div className="ai-suggestions">
        {(!answers || answers.length === 0) && (
            <div className="no-suggestions">No suggestions available</div>
        )}

        {answers && answers.map((item) => {
            const key = item.clusterId ?? `${item.clusterId}-${Math.random()}`;
            const question = item.question ?? "No question provided";

            let answerContent;

            if (item.error) {
                answerContent = `Error: ${item.error}`;
            } else if (typeof item.answer === "string") {
                answerContent = item.answer;
            } else if (Array.isArray(item.answer)) {
                // handle array of strings or array of objects with .text
                answerContent = item.answer
                    .map(a => {
                        if (typeof a === "string") return a;
                        if (a && typeof a === "object" && "text" in a) return String(a.text);
                        return JSON.stringify(a);
                    })
                    .join("\n\n");
            } else if (item.answer && typeof item.answer === "object") {
                // single object: prefer .text, otherwise pretty-print
                if ("text" in item.answer && typeof item.answer.text === "string") {
                    answerContent = item.answer.text;
                } else {
                    answerContent = JSON.stringify(item.answer, null, 2);
                }
            } else {
                answerContent = "No answer generated";
            }

            return (
                <div className="ai-suggestion-block" key={key} style={{ marginBottom: 20 }}>
                    <div className="section-header">
                        <div
                            className="section-title"
                            style={{ fontSize: "14px", fontWeight: 500 }}
                        >
                            {question}
                            <span className="ai-badge" style={{ marginLeft: 8 }}>Question</span>
                        </div>
                    </div>

                    <div className="ai-suggestion-item">
                        <div className="suggestion-title">Suggested Answer Draft</div>
                        <div
                            className="suggestion-content"
                            style={{ whiteSpace: "pre-wrap", fontSize: "15px" }}
                        >
                            {answerContent}
                        </div>
                        <div className="suggestion-actions" style={{ marginTop: 8 }}>
                            <button className="suggestion-btn">Use This</button>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
);


}
