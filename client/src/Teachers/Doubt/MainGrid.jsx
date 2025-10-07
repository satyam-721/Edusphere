import DoubtSection from "./DoubtSection";
import AiSuggestions from "./AiSuggestions";
import RecentResolution from "./RecentResolution";

export default function MainGrid(){
    return(
        <div className="main-grid">
                <DoubtSection/>
            
        <div style={{display: 'grid', gap: '1.5rem'}}>
            <AiSuggestions/>
            <RecentResolution/>
        </div>
        </div>

    )
}