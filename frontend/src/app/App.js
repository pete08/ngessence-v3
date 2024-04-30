import React from "react";
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";

import NewSequenceForm from "../components/NewSequenceForm.js"
// import NewSequenceForm from "../components/NewSequenceForm"

import AppLayout from "./AppLayout.js";
// import AppLayout from "./AppLayout";
import Sequences from "../features/sequences/Sequences.js";
// import Sequences from "../features/sequences/Sequences";
import About from "../components/about/AboutIt.js";
// import About from "../components/about/AboutIt";


// import Sequence from "../features/sequences/Sequence";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<AppLayout/>}>
        <Route path="" element={<About/>} />
        <Route path="sequences" element={<Sequences/>} />
        {/* <Route path="sequences/:sequenceId" element={<Sequence/>} /> */}
        <Route path="sequences/new" element={<NewSequenceForm/>} />
        <Route path="about" element={<About/>} />
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
