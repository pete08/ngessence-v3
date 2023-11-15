import React, { useState } from "react";
import { useSelector } from "react-redux";
// import selector
import { selectCards } from "./cardsSlice";

export default function Card({ id }) {
  const cards = useSelector(selectCards);
  console.log(`cards[id]["id"]: ${cards[id]["id"]} \n cards[id]["front"]: ${cards[id]} \n cards[id]["back"]: ${cards[id]["back"]}`)
  
  const [flipped, setFlipped] = useState(false);

  return (
    <li>
      <button className="card" onClick={(e) => setFlipped(!flipped)}>
        {flipped ? cards[id].back : cards[id].front}
      </button>
    </li>
  );
}
