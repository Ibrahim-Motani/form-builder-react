import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// redux imports
import { useDispatch } from "react-redux";
// actions imports
import { formEntriesActions } from "../store/formEntries-slice";


function TextInputBuilder({ textType }) {
  const dispatch = useDispatch();

  const [enteredLabel, setEnteredLabel] = useState("");
  const [formArray, setFormArray] = useState([]);

  // adding a text input field to the form
  const handleAddTextInput = () => {
    if (enteredLabel.trim().length === 0 || enteredLabel === "") {
      alert("form label can not be empty");
      return;
    }
    const newFormArray = [
      ...formArray,
      {
        id: uuidv4(),
        type: textType === "text" ? "text" : "textarea",
        label: enteredLabel,
        value: "",
      },
    ];
    setFormArray(newFormArray);
    setEnteredLabel("");
    dispatch(formEntriesActions.addFormEntry(newFormArray));
    setFormArray([]);
  };

  return (
    <div className="mb-3">
      <label className="form-label">Label</label>
      <input
        className="form-control"
        value={enteredLabel}
        onChange={event => setEnteredLabel(event.target.value)}
        type="text"
      />
      <br />
      <button
        className="btn btn-primary"
        onClick={handleAddTextInput}
        type="button"
      >
        Add
      </button>
    </div>
  );
}

export default TextInputBuilder;
