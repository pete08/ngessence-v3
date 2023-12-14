import React from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";
// import selector
import { selectSequences } from "./sequencesSlice"

export default function Sequences() {
  const sequences = useSelector(selectSequences);

  if (sequences.length < 0) {
    return (
      <section className="center">
        <h1>Sequences</h1>
        <ul className="sequences-list">...None
        </ul>
        <Link
          to={ROUTES.newSequenceRoute()}
          className="button create-new-topic-button"
        >
          Create New Sequence
        </Link>
      </section>
    );
  }
  return (
    <section className="center">
      <h1>Sequences</h1>
      <ul className="topics-list">
        {Object.values(sequences).map((sequence) => (
          <li className="topic" key={sequence.id}>
          <Link to={ROUTES.sequenceRoute(sequence.id)} className="topic-link">
           <div className="topic-container">
             {/* <img src={sequence.icon} alt="" /> */}
             <div className="text-content" key={sequence.id}>
               <h2>{sequence.name}</h2>
               <h3>Illumina quality passes: {sequence.illuminaPass ? "True": "False"}</h3>
               <p>SequenceResults:{(sequence.sequenceResult) ? sequence.sequenceResult.substring(0,50): " Null"} </p>
             </div>
           </div>
         </Link>
          </li>
        ))}
      </ul>
      <Link
        to={ROUTES.newSequenceRoute()}
        className="button create-new-topic-button"
      >
        Create New Sequence
      </Link>
    </section>
  );
}
