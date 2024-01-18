import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Sequence from "./Sequence";
import { selectSequences, clearSequences } from "./sequencesSlice";
import NewSequenceForm from "../../components/NewSequenceForm";


export default function Sequences() {
  const dispatch = useDispatch();
  console.log(`1. Sequences: Before selectSequences`);
  const allSequences = useSelector(selectSequences);
  console.log(`2. Sequences: After selectSequences`);
  
  console.log(`3. Sequences: Before Count selectSequences `);
  let count = Object.keys(allSequences).length;
  console.log(`4. Sequences: After Count selectSequences `);
  
  console.log(`5. Sequences: Before showSequenceDetails function `);
  const showSequenceDetails = (allSequences) => {
    return Object.keys(allSequences).map(sequence => (
      <Sequence key={allSequences[sequence].id} sequence={allSequences[sequence]} />
      ));
    }
  console.log(`6. Sequences: After showSequenceDetails function `);

  const handleClearState = () => {
    dispatch(clearSequences());
  }

  if (count < 1) {
    return (
      <section className="center">
        <h1>Sequences</h1>
        <h2 className="topics-list"> you've uploaded {count} sequences.
        <hr />
        </h2>
        <h2>Create New Sequence</h2>
        <NewSequenceForm />
      </section>
    );
  }

  return (
    <section>
      <h1>Add Sequence</h1>
      <section className="center">
        <h2>Sequences:</h2>
        <p>you've uploaded {count} sequences in your session.</p>
        <div className="btnDiv">
        <button id="clearStateBtn" onClick={handleClearState} value="clearState">Clear list</button>
      </div>
        <hr/>
      </section>
      {showSequenceDetails(allSequences)}
    </section>
  );
}
