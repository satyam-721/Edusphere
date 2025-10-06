import AskDoubt from "./AskDoubt"
import SectionHeader from "./SectionHeader"
import Answered from "./Answered"
import Pending from "./Pending"
import Resolved from "./Resolved"
import React,{useEffect,useState} from 'react'





export default function MainGrid(){
    const [currDoubt,setCurrDoubt]=useState([{subject:"",topic:"",doubt:""}]);  
    //CONNECT THIS WITH DATABASE SO THAT PENDING DOUBT GETS ADDED TO THE LIST
    


    function handleDoubtSubmit(data){
        console.log("doubt uploaded");
        setCurrDoubt([...currDoubt,{data}]);

    }
    useEffect(()=>{
        console.log(currDoubt)
    },[currDoubt])




    return(
        <div class="main-grid">
            <AskDoubt onSubmit={handleDoubtSubmit}/>
            <div class="my-doubts-section">
                <SectionHeader/>
                <div class="doubts-list" id="doubtsList">
                    <Answered/>
                    <Pending currDoubt={currDoubt[0]}/>
                    <Resolved/>
                    {/* More doubt cards can be added here */}
                </div>
            </div>
        </div>
    )
}