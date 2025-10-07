import { useEffect,useState } from "react";


function Test(){
    const [data,setData] = useState("");
    useEffect(() => {
        fetch("http://localhost:5000/")
        .then(res => res.text())
        .then((data) => {
            console.log("frontend: "+data)
        
            setData(data);});
    }, []);


    return(<>
        <p>Hello this is Frontend</p>
        <p>{data}</p>
        </>
    )
}

export default Test;