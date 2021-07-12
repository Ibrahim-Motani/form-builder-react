import React, { useState } from "react";
// redux imports
import { useDispatch, useSelector } from "react-redux";
// actions import
import { formEntriesActions } from "../store/formEntries-slice";

function NumberInput({ formEntryFromBuilder, viewOnly }) {
  // state values for handling the change of the lables after the form is created
  const [isEditing, setIsEditing] = useState(false);
  const [editiedLabel, setEditedLabel] = useState("");
  const [newMin, setNewMin] = useState("");
  const [newMax, setNewMax] = useState("");

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  // handling change in the input boxes of numbers
  const handleChange = (event, id) => {
    dispatch(
      formEntriesActions.handleChangeInForm({
        inputType: "number",
        id,
        value: event.target.value,
      })
    );
  };

  // function for handling the click on the label
  const labelIsClicked = objOfValues => {
    if (viewOnly) {
      return;
    }
    setEditedLabel(objOfValues.label);
    setNewMin(objOfValues.min);
    setNewMax(objOfValues.max);
    setIsEditing(true);
  };

  // function for submitting the changes of the lables after form is created
  const handleSubmitOfLabelChangeFromForm = id => {
    dispatch(
      formEntriesActions.handleChangesToFormLablesAfterCreation({
        inputType: "number",
        id,
        newLabel: editiedLabel,
        newMin,
        newMax,
      })
    );
    setEditedLabel("");
    setIsEditing(false);
  };

  // deleting the form entry from form
  const handleDeleteOfEntry = id => {
    dispatch(
      formEntriesActions.deleteLabelsOrGroupsAfterCreation({
        inputType: 'number',
        id,
      })
    );
  };

  return (
    <React.Fragment>
      {[formEntryFromBuilder].map(form => {
        return (
          <div key={form.id} className="mb-2">
            {!isEditing  && (
              <div>
                <label
                  onClick={() =>
                    labelIsClicked({
                      label: form.label,
                      min: form.min,
                      max: form.max,
                    })
                  }
                  className="form-label me-3"
                >
                  {form.label}
                </label>
                {isLoggedIn && !viewOnly && (
                  <i
                    className="fas fa-minus"
                    onClick={() => handleDeleteOfEntry(form.id)}
                    style={{ color: "tomato", cursor: "pointer" }}
                  ></i>
                )}
              </div>
            )}
            {isEditing && isLoggedIn && (
              <div>
                <input
                  value={editiedLabel}
                  onChange={event => setEditedLabel(event.target.value)}
                  className="form-control mb-4"
                  required
                  type="text"
                />
                <div className="input-group mb-4">
                  {/* min */}
                  <span className="input-group-text">Min & Max</span>
                  <input
                    value={newMin}
                    onChange={event => setNewMin(event.target.value)}
                    className="form-control"
                    type="number"
                  />
                  {/* max */}
                  <input
                    value={newMax}
                    onChange={event => setNewMax(event.target.value)}
                    className="form-control"
                    type="number"
                  />
                </div>
                <button
                  onClick={() => handleSubmitOfLabelChangeFromForm(form.id)}
                  className="btn btn-primary mb-3"
                  type="button"
                >
                  Change Label and Values
                </button>
              </div>
            )}
            <input
              disabled={isLoggedIn}
              className="form-control"
              required={!isLoggedIn}
              name={form.label}
              value={form.value}
              onChange={event => handleChange(event, form.id)}
              type="number"
              min={form.min}
              max={form.max}
            />
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default NumberInput;
