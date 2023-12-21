import React from "react";
import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import ROUTES from "../../app/routes";
import Sequence from "./Sequence-copy";
// import selector
import { selectSequences } from "./sequencesSlice-copy";
import NewSequenceForm from "../../components/NewSequenceForm";

// START HERE start here 2023-12-20
// currently the localhost:5000/sequences does not show individual sequences (See showSequenceDetails function line 19). Troubleshoot to determine what is preventing the sequences-copy.js (this file) from showing Sequence-copy.js return stmt.

export default function Sequences() {
  const allSequences = useSelector(selectSequences);
  
  // useEffect(() => {
  // }, [allSequences])

  const showSequenceDetails = (allSequences) => {
    for (const sequence in allSequences) {
      return <Sequence sequence={allSequences[sequence]} />;
    }
  }

  if (Object.keys(allSequences).length < 1) {
    return (
      <section className="center">
        <h1>Sequences</h1>
        <ul className="topics-list"> you've uploaded {Object.keys(allSequences).length} sequences.
        <hr />
        </ul>
        <h2>Create New Sequence</h2>
        {/* NewSequenceForm adds to state.sequences.sequences, state action that calls state.sequecnes.sequences is selectSequences */}
        <NewSequenceForm />
      </section>
    );
  }

  return (
    <section>
      <h1>Add Sequence</h1>
      <NewSequenceForm />
      <section className="center">
        <h2>Sequences:</h2>
        <p>you've uploaded {Object.keys(allSequences).length} sequences in your session.</p>
        {/* <div> className="topics-list"> you've uploaded {Object.keys(allSequences).length} sequences in your session. < /div> */}
        {/* <div className="article-content-container"> */}
        {/* <h3 className="article-title">  */}
        {/* <p className="article-preview">  */}
        {/* <Link
          to={ROUTES.newSequenceRoute()}
          className="button create-new-topic-button"
          >
          Create New Sequence
        </Link> */}
        <hr/>
      </section>
      {showSequenceDetails(allSequences)}
    </section>
  );
}
