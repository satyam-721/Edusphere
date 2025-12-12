import DoubtSection from "./DoubtSection";
import AiSuggestions from "./AiSuggestions";
import RecentResolution from "./RecentResolution";

export default function MainGrid(){
    return(
        <div className="main-grid" style={{display: 'grid', gap: '2rem', gridTemplateColumns: '2fr 1fr'}}>
                <DoubtSection/>
                
            <div style={{display: 'grid', gap: '1.5rem'}}>
                <AiSuggestions/>
                <RecentResolution/>
            </div>
        </div>

    )
}