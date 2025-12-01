export default function BackendTest() {
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);   //gets data from form

        const data = {                                //puts the data into an json object
            stuname: formData.get("stuname"),
            sturoll: formData.get("sturoll")
        };

        const response = await fetch("http://localhost:5000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log("Response received from server:");
        const result = await response.json();
        console.log(result);
    }
    return(
        <>
    <form onSubmit={(e)=>handleSubmit(e)}>
        <input name="stuname"></input>
        <input type="number" name="sturoll"></input>
        <button type="submit">Submit</button>
    </form>
        </>
    )
}