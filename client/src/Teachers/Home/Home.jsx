import "./Home.module.css"
import Intro from "./Intro"
import Header from "./Header"
import QuickAccess from "./QuickAccess"
import Features from "./Features"
import Dashboard from "./Dashboard"
import SectionProto from "./SectionProto"
import Footer from "./Footer"

export default function Home(){
    return(
        <>
        <Intro/>
        <Header/>
        <QuickAccess/>
        <Features/>
        <Dashboard/>
        <SectionProto/>
        <Footer/>
        </>
    )
}
