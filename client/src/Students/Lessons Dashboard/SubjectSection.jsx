import English from "./English";
import Mathematics from "./Mathematics";
import Physics from "./Physics";
import Science from "./Science";



export default function SubjectSection({showNotification}){

    function toggleSubject(cardId) {
        const card = document.getElementById(cardId);
        card.classList.toggle('expanded');
        
        const subjectName = card.querySelector('.subject-name').textContent;
        if (card.classList.contains('expanded')) {
            showNotification('info', `Opening ${subjectName} lessons`);
        }
    }

    function viewContent(type,event) {
        event.stopPropagation();
        const actionName = type === 'video' ? 'Watch' : 'View';
        showNotification('info', `${actionName}ing ${type}...`);
        
        setTimeout(() => {
            showNotification('success', `Opening ${type} page`);
            // In production, this would navigate to the content page
        }, 1000);
    }

    return(
        <div className="subjects-section">
                <h2 className="section-title">📚 My Subjects</h2>

                <Mathematics 
                    toggleSubject={toggleSubject}
                    viewContent={viewContent}  
                />
                <Science  toggleSubject={toggleSubject} viewContent={viewContent}/>
                <Physics toggleSubject={toggleSubject} viewContent={viewContent}/>
                <English toggleSubject={toggleSubject} viewContent={viewContent}/>
        </div>
    )
}