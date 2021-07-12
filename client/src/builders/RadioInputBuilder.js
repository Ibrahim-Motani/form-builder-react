import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
// redux imports
import { useDispatch } from "react-redux";
// actions imports
import { formEntriesActions } from "../store/formEntries-slice";


function RadioInputBuilder() {
  const dispatch = useDispatch();

  const [groupLabel, setGroupLabel] = useState("");
  const [choicesArray, setChoicesArray] = useState([
    {
      id: uuidv4(),
      name: "",
      value: "",
      selected: false,
    },
  ]);
  const [formArray, setFormArray] = useState([]);

  // add choice label to choices array
  const addChoiceLabel = () => {
    setChoicesArray([
      ...choicesArray,
      { id: uuidv4(), name: "", value: "", selected: false },
    ]);
  };

  // remove choices label from choices array
  const removeChoiceLabel = id => {
    setChoicesArray(choicesArray.filter(choiceEntry => choiceEntry.id !== id));
  };

  // handling change for the choice labels
  const handleChoiceLabelChange = (event, id) => {
    const newChoicesArray = choicesArray.map(choiceEntry => {
      if (choiceEntry.id === id) {
        choiceEntry.value = event.target.value;
        choiceEntry.name = groupLabel;
      }
      return choiceEntry;
    });
    setChoicesArray(newChoicesArray);
  };

  // add choices array to the forms array
  const handleAddGroup = () => {
    const newFormArray = [
      ...formArray,
      {
        groupId: uuidv4(),
        label: groupLabel,
        type: "radio",
        choices: choicesArray,
      },
    ];
    setFormArray(newFormArray);
    setChoicesArray([
      {
        id: uuidv4(),
        name: "",
        value: "",
        selected: false,
      },
    ]);
    setGroupLabel("");

    dispatch(formEntriesActions.addFormEntry(newFormArray));
    setFormArray([]);
  };

  return (
    <div>
      {/* Inputs from user */}
      <label className="form-label">Group Label</label> <br />
      <input
        className="form-control mb-3"
        value={groupLabel}
        onChange={event => setGroupLabel(event.target.value)}
        type="text"
        required
      />
      {/* dynamic user inputs */}
      {choicesArray.map(choiceEntry => {
        return (
          <div key={choiceEntry.id} className="input-group mb-3">
            <input
              placeholder="Radio Label"
              className="form-control"
              value={choiceEntry.value}
              onChange={event => handleChoiceLabelChange(event, choiceEntry.id)}
              type="text"
              required
            />
            <button
              className="btn btn-outline-secondary"
              onClick={() => removeChoiceLabel(choiceEntry.id)}
            >
              Remove
            </button>
          </div>
        );
      })}
      {/* buttons for adding a new label and adding the group to the main form */}
      <button className="btn btn-dark" onClick={addChoiceLabel}>
        Add Choice Label
      </button>{" "}
      <br />
      <button className="btn btn-primary mt-3" onClick={handleAddGroup}>
        Add Group
      </button>
    </div>
  );
}

export default RadioInputBuilder;
