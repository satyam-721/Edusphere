import AskDoubt from "./AskDoubt"
import SectionHeader from "./SectionHeader"
import Answered from "./Answered"
import Pending from "./Pending"
import Resolved from "./Resolved"
import React,{useEffect,useState} from 'react'





export default function MainGrid(){
    const[alldata,setAlldata]=useState([]);
    const [currDoubt,setCurrDoubt]=useState([{subject:"",topic:"",doubt:""}]);  
    //CONNECT THIS WITH DATABASE SO THAT PENDING DOUBT GETS ADDED TO THE LIST


    


    async function handleDoubtSubmit(data){
        console.log("doubt uploaded");
        setCurrDoubt([...currDoubt,{data}]);
        console.log(data);

        const response = await fetch("http://localhost:5000/doubt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sname: "satyam",
                ...data,       // spreads all keys of data into this object
                type: "pending"
            })
        });
        console.log("Response received from server:");
        const result = await response.json();
        console.log(result);




    }
    useEffect(() => {
        console.log("page loaded: ",currDoubt);

        let mounted = true;

        //to get from database

        (async () => {
            try {
                const response = await fetch("http://localhost:5000/doubtfetch", {
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error(`Fetch failed: ${response.status}`);
                }
                const fetched = await response.json();
                setAlldata(fetched);

                console.log("Fetched doubts from server:", alldata);

            } catch (err) {
                console.error("Error fetching doubts:", err);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);


    


    return(
        <div class="main-grid">
            <AskDoubt onSubmit={handleDoubtSubmit}/>
            <div class="my-doubts-section">
                <SectionHeader/>
                <div class="doubts-list" id="doubtsList">

                {alldata.map((doubtItem, index) => {
                    console.log(doubtItem.type);
                    if (doubtItem.type === "answered") {
                        return <Answered key={index} doubtData={doubtItem} />;
                    } else if (doubtItem.type === "pending") {
                        console.log(doubtItem.type);
                        return <Pending key={index} doubtData={doubtItem} />;
                    } else if (doubtItem.type === "resolved") {
                        return <Resolved key={index} doubtData={doubtItem} />;
                    } else {
                        return null; // or some default component
                    }
                })}

                    {/* <Answered/>
                    <Pending currDoubt={currDoubt[0]}/>
                    <Resolved/> */}


                    {/* More doubt cards can be added here */}
                </div>
            </div>
        </div>
    )
}