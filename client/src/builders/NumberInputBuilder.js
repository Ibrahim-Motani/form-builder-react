import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// redux imports
import { useDispatch } from "react-redux";
// actions imports
import { formEntriesActions } from "../store/formEntries-slice";

function NumberInputBuilder() {
  const dispatch = useDispatch();
  // state variables
  const [enteredLabel, setEnteredLabel] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [formArray, setFormArray] = useState([]);

  // adding new number input to the form
  const handleAddNumberInput = () => {
    if (enteredLabel.trim().length === 0 || enteredLabel === "") {
      alert("form label can not be empty");
      return;
    }
    const newFormArray = [
      ...formArray,
      {
        id: uuidv4(),
        type: "number",
        label: enteredLabel,
        value: "",
        min,
        max,
      },
    ];
    setFormArray(newFormArray);
    setEnteredLabel("");
    setMax("");
    setMin("");

    dispatch(formEntriesActions.addFormEntry(newFormArray));
    setFormArray([]);
  };

  return (
    <React.Fragment>
      <label className="form-label">Label</label>
      <input
        className="form-control mb-4"
        required
        value={enteredLabel}
        onChange={event => setEnteredLabel(event.target.value)}
        type="text"
      />
      <div className="input-group mb-4">
        {/* min */}
        <span className="input-group-text">Min & Max</span>
        <input
          className="form-control"
          value={min}
          onChange={event => setMin(event.target.value)}
          type="number"
        />
        {/* max */}
        <input
          className="form-control"
          value={max}
          onChange={event => setMax(event.target.value)}
          type="number"
        />
      </div>
      <button
        className="btn btn-primary col-3"
        onClick={handleAddNumberInput}
        type="button"
      >
        Add
      </button>
    </React.Fragment>
  );
}

export default NumberInputBuilder;
