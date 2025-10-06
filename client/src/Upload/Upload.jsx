import Header from "./Header";
import Steps from "./Steps";
import Types from "./Types";
import Layout from "../Layouts/Layout";

import "./Style.css";

export default function Upload(){
    return(
        <>
        <Layout/>
        <div class="main-container">
            <div className="content">
                
                <Header/>
                <Steps/>
                <Types/>
                
            </div>

        </div>
        </>
    )
}