import Header from "./Header";
import Layout from "../Layouts/Layout";
import './SStyle.module.css';
import Status from "./Status";
import MainGrid from "./Maingrid";
export default function Doubt() {
    return(
        <>
        <Layout/>
        <div className="main-container">
            <main className="content">
                <Header/>
                <Status/>
                <MainGrid/>
                
            </main>
        </div>
        </>
    )
}