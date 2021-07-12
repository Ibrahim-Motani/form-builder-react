// react imports
import React, { useState } from "react";
// other packages imports
import { v4 as uuidv4 } from "uuid";
// redux imports
import { useDispatch } from 'react-redux';
//actions imports
import { formEntriesActions } from '../store/formEntries-slice';

function CheckboxInputBuilder() {
  const dispatch = useDispatch();
  // state for main group name
  const [groupLabel, setGroupLabel] = useState("");
  // state for adding and removing more checkbox options to a particular group
  const [checkboxesArray, setCheckboxesArray] = useState([
    {
      id: uuidv4(),
      label: "",
      value: "",
      checked: false,
    },
  ]);
  // state for form array
  const [formArray, setFormArray] = useState([]);

  // handling the add of checkbox labels to a group
  const addCheckboxLabel = () => {
    setCheckboxesArray([
      ...checkboxesArray,
      { id: uuidv4(), label: "", value: "", checked: false },
    ]);
  };

  // handling the removal of checkbox labels to a group
  const removeCheckboxLabel = id => {
    setCheckboxesArray(
      checkboxesArray.filter(checkboxEntry => checkboxEntry.id !== id)
    );
  };

  // handling change to the checkbox labels
  const handleCheckboxLabelChange = (event, id) => {
    const newCheckboxesArray = checkboxesArray.map(checkboxEntry => {
      if (checkboxEntry.id === id) {
        checkboxEntry.value = event.target.value;
        checkboxEntry.label = event.target.value;
      }
      return checkboxEntry;
    });
    setCheckboxesArray(newCheckboxesArray);
  };

  // handling the adding of a group to the main form
  const handleAddGroup = () => {
    const newFormArray = [
      ...formArray,
      {
        groupId: uuidv4(),
        type: "checkbox",
        label: groupLabel,
        checkboxes: checkboxesArray,
      },
    ];
    setFormArray(newFormArray);
    setCheckboxesArray([{ id: uuidv4(), label: "", value: "", checked: "" }]);
    setGroupLabel("");
    dispatch(formEntriesActions.addFormEntry(newFormArray));
    setFormArray([]);
  };

  return (
    <React.Fragment>
      {/* group label and checkbox labels */}
      <label className="form-label">Group Label</label> <br />
      <input
        className="form-control"
        value={groupLabel}
        onChange={event => setGroupLabel(event.target.value)}
        type="text"
        required
      />
      <br />
      {/* dynamic adding of labels for checkbox */}
      {checkboxesArray.map(checkboxEntry => {
        return (
          <div key={checkboxEntry.id} className="input-group mb-3">
            <input
              placeholder="Checkbox Label"
              className="form-control"
              value={checkboxEntry.value}
              onChange={event =>
                handleCheckboxLabelChange(event, checkboxEntry.id)
              }
              type="text"
              required
            />
            <button
              className="btn btn-outline-secondary"
              onClick={() => removeCheckboxLabel(checkboxEntry.id)}
            >
              Remove
            </button>
          </div>
        );
      })}
      <button className="btn btn-dark" onClick={addCheckboxLabel}>
        Add Checkbox Label
      </button>
      <br />
      <button className="btn btn-primary mt-3" onClick={handleAddGroup}>
        Add Group
      </button>
    </React.Fragment>
  );
}

export default CheckboxInputBuilder;
