import Welcome from "./Welcome"
import "./Style.module.css"
import Status from "./Status"
import MainGrid from "./MainGrid"

export default function App(){
    return(
        <main className="content">
            <Welcome/>
            <Status/>
            <MainGrid/>
        </main>
    )
}