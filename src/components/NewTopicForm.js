import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { ALL_ICONS } from "../data/icons";
// import addTopic
import { addTopic, selectTopics } from "../features/topics/topicsSlice";

export default function NewTopicForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const navigate = useNavigate()

  let topics = useSelector(selectTopics)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }
    // dispatch new topic
    let id = uuidv4();
    console.log(`the new Topic handleSubmit's values:\nid:${id}\nname:${name}\nicon:${icon} `)
    dispatch(addTopic({id, name, icon}));
    setName("");
    setIcon("");
    navigate(ROUTES.topicsRoute());
    console.log(`the Topics are now: ${JSON.stringify(topics)}`)
  };


  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1 className="center">Create a new topic</h1>
        <div className="form-section">
          <input
            id="topic-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Topic Name"
          />
          <select
            onChange={(e) => setIcon(e.currentTarget.value)}
            required
            defaultValue="default"
          >
            <option value="default" disabled hidden>
              Choose an icon
            </option>
            {ALL_ICONS.map(({ name, url }) => (
              <option key={url} value={url}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <button className="center" type="submit">Add Topic</button>
      </form>
    </section>
  );
}
