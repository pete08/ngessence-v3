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
          <div class="row">
            <div class="nine columns">Sequences </div>
            <div class="three columns">you've uploaded {count} sequences.</div>
          </div>
        <hr />
        {/* <h3>Create New Sequence</h3> */}
        <NewSequenceForm />
      </section>
    );
  }

  return (
    <section>
      <section className="center">
            <NewSequenceForm />
          <hr />
          <div className="row">
            <h3 className="nine columns">Sequences: 
            </h3>
            {/* <div className="nine columns">Sequences </div> */}
            {/* <h4 className="nine columns">Sequences:</h4> */}
            <h6 className="three columns">you've uploaded <b>{count}</b> sequences.</h6>
          </div>
      <div className="btnDiv">
        
      </div>
        <hr className="sequences" />
      </section>
      {showSequenceDetails(allSequences)}
      <br/>
      <br/>
      <button id="clearStateBtn" onClick={handleClearState} value="clearState">Clear list</button>
    </section>
  );
}
