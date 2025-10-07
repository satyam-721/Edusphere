import Header from "./Header";
import Steps from "./Steps";
import Types from "./Types";
import Layout from "../Layouts/Layout";

import styles from "./Style.module.css";

export default function Upload(){
    return(
        <>
        <Layout/>
        <div className="">
            <div className="content">
                
                <Header/>
                <Steps/>
                <Types/>
                
            </div>

        </div>
        </>
    )
}