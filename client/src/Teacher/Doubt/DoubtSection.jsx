import { use } from "react";
import React, { useEffect, useState } from "react";
import AnswerModel from "./AnswerModel";
import { DoubtCluster } from "./DoubtCluster";

// const doubtClusters = {
//             1: [
//                 {
//                     student: "Sarah Johnson",
//                     doubt: "I don't understand how to apply F=ma when the mass is given in grams. Do I need to convert it first?",
//                     time: "2 hours ago"
//                 },
//                 {
//                     student: "Mike Chen",
//                     doubt: "In the homework problem about the car, why do we use 1200kg for mass? How do I know what units to use?",
//                     time: "2 hours ago"
//                 },
//                 {
//                     student: "Emma Davis",
//                     doubt: "When calculating force, my answer is always wrong. I think I'm making a mistake with the acceleration part.",
//                     time: "1 hour ago"
//                 },
//                 {
//                     student: "Alex Rodriguez",
//                     doubt: "Can you show me step by step how to solve F=ma problems? I get confused with the unit conversions.",
//                     time: "1 hour ago"
//                 },
//                 {
//                     student: "Lisa Wang",
//                     doubt: "What's the difference between weight and mass in Newton's second law problems?",
//                     time: "45 minutes ago"
//                 }
//             ],
//             2: [
//                 {
//                     student: "John Smith",
//                     doubt: "How do I choose which part should be 'u' and which should be 'dv' in integration by parts?",
//                     time: "4 hours ago"
//                 },
//                 {
//                     student: "Maria Garcia",
//                     doubt: "I keep making errors when applying the integration by parts formula. Can you show the complete steps?",
//                     time: "3 hours ago"
//                 },
//                 {
//                     student: "David Kim",
//                     doubt: "Why does integration by parts work? I understand the formula but not the concept behind it.",
//                     time: "3 hours ago"
//                 }
//             ],
//             3: [
//                 {
//                     student: "Anna Brown",
//                     doubt: "How can I tell if a bond will be ionic or covalent just by looking at the elements?",
//                     time: "6 hours ago"
//                 },
//                 {
//                     student: "Ryan Wilson",
//                     doubt: "What exactly is electronegativity and how does it determine bond type?",
//                     time: "5 hours ago"
//                 },
//                 {
//                     student: "Sophie Taylor",
//                     doubt: "I'm confused about polar covalent bonds. Are they different from regular covalent bonds?",
//                     time: "5 hours ago"
//                 },
//                 {
//                     student: "James Lee",
//                     doubt: "Can you explain why NaCl is ionic but H2O is covalent? They both have different elements.",
//                     time: "4 hours ago"
//                 },
//                 {
//                     student: "Olivia Martinez",
//                     doubt: "How do I predict the properties of a compound based on its bonding type?",
//                     time: "4 hours ago"
//                 },
//                 {
//                     student: "Kevin Zhang",
//                     doubt: "What's the role of electrons in ionic vs covalent bonding?",
//                     time: "3 hours ago"
//                 },
//                 {
//                     student: "Rachel Anderson",
//                     doubt: "I need help with Lewis dot structures for ionic and covalent compounds.",
//                     time: "3 hours ago"
//                 }
//             ]
//         };

export default function DoubtSection(){
// Expand cluster to show individual doubts
    
    const [doubtClusters,setDoubtClusters]=useState({});




    // Close answer modal
    function closeAnswerModal() {
        console.log("closed answer model")
        document.getElementById('answerModal').style.display = 'none';
        document.getElementById('answerText').value = '';
    }

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
                setDoubtClusters(fetched.doubtClusters);
                console.log(doubtClusters);


            } catch (err) {
                console.error("Error fetching doubts:", err);
            }
        })();

        return () => {
            mounted = false;
        };  
    }, []);




    return(
        <>
        <div className="section-card">
            <div className="section-header">
                <div className="section-title">
                    AI-Clustered Doubts 
                    <span className="ai-badge">AI Powered</span>
                </div>
                <a href="#" className="section-action">Refresh Clusters</a>
            </div>

            {/* <!-- Doubt Clusters --> */}

            {Object.keys(doubtClusters).map((key) => (
                console.log(doubtClusters[key]),
                <DoubtCluster clusterId={key} title={doubtClusters[key][0].subject} count={doubtClusters[key].length} grade="10th Grade" doubtClusters={doubtClusters}/>
            ))}
            

            
            
        </div>
        <AnswerModel closeAnswerModal={closeAnswerModal}/>
        </>
    )
}