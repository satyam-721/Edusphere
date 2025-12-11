import TopNav from "./TopNav";
import SideNav from "./SideNav";
import "./Layout.css"
import { supabase } from "../../Auth/SupabaseClient"; 
import { useNavigate } from 'react-router-dom';


export default function Layout(){
    return(
        <>
        <TopNav/>
        <SideNav/>
        </>
    )
}