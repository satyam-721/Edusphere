import Header from "./Header";
import Layout from "../Layouts/Layout";
import '../Style.css';
import Status from "./Status";
import MainGrid from "./Maingrid";
export default function Doubt() {
    return(
        <>
        <Layout/>
        <div class="main-container">
            <main class="content">
                <Header/>
                <Status/>
                <MainGrid/>
                
            </main>
        </div>
        </>
    )
}