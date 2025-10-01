import AskDoubt from "./AskDoubt"
import SectionHeader from "./SectionHeader"
import Answered from "./Answered"
import Pending from "./Pending"
import Resolved from "./Resolved"

export default function MainGrid(){
    return(
        <div class="main-grid">
            <AskDoubt/>
            <div class="my-doubts-section">
                <SectionHeader/>
                <div class="doubts-list" id="doubtsList">
                    <Answered/>
                    <Pending/>
                    <Pending/>
                    <Resolved/>
                    {/* More doubt cards can be added here */}
                </div>
            </div>
        </div>
    )
}