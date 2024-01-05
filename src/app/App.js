import React from "react";
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";

import NewSequenceForm from "../components/NewSequenceForm"
// import NewQuizForm from "../components/NewQuizForm";
// import NewTopicForm from "../components/NewTopicForm";
// import ScriptRunner from "../components/ShellScriptRunner";
// import Topics from "../features/topics/Topics";
// import Topic from "../features/topics/Topic";
// import Quiz from "../features/quizzes/Quiz";
// import Quizzes from "../features/quizzes/Quizzes";
import AppLayout from "./AppLayout";
import Sequences from "../features/sequences/Sequences";
// import Sequence from "../features/sequences/Sequence";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<AppLayout/>}>
        <Route path="sequences" element={<Sequences/>} />
        {/* <Route path="sequences/:sequenceId" element={<Sequence/>} /> */}
        <Route path="sequences/new" element={<NewSequenceForm/>} />
        {/* <Route path="sequences/scriptRunner" element={<ScriptRunner/>}/> */}
        {/* <Route path="topics" element={<Topics/>}/> */}
        {/* <Route path="topics/new" element={<NewTopicForm/>}/> */}
        {/* <Route path="topics/:topicId" element={<Topic/>}/> */}
        {/* <Route path="quizzes" element={<Quizzes/>}/> */}
        {/* <Route path="quizzes/new" element={<NewQuizForm/>}/> */}
        {/* <Route path="quizzes/:quizId" element={<Quiz/>}/> */}
      </Route>
      </Routes>
    </BrowserRouter>
  )
}
