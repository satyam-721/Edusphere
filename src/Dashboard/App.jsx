import Welcome from "./Welcome"
import "./Style.css"
import Status from "./Status"
import MainGrid from "./MainGrid"

export default function App(){
    return(
        <main class="content">
            <Welcome/>
            <Status/>
            <MainGrid/>
        </main>
    )
}