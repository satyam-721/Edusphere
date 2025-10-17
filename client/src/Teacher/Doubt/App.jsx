
import "./Style.css"
import Welcome from "./Welcome"
import Status from "./Status"
import FilterSection from "./FilterSection"
import MainGrid from "./MainGrid"

export default function App(){
    return(
        <main className="content">
            <Welcome/>
            <Status/>
            <FilterSection/>
            <MainGrid/>
        </main>
    )
}