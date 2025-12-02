import Doubt from "./Doubt/Doubt.jsx";
import Lessons from "./Lessons/Lessons.jsx";
import LessonsDashboard from "./Lessons Dashboard/LessonsDashboard.jsx";
import Dashboard from "./Dashboard.jsx";
import Choice from "./Choice.jsx";

import { Routes, Route } from 'react-router-dom'



export default function StudentMain() {
    return(
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="lesson" element={<Lessons />} />
      <Route path="doubt" element={<Doubt />} />
      <Route path="lessonsdashboard" element={<LessonsDashboard />} />
      <Route path="Choice" element={<Choice />} />
    </Routes>
    )
}