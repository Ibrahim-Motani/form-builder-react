// react imports
import React, { useState } from "react";
// redux imports
import { useDispatch, useSelector } from "react-redux";
// actions import
import { formEntriesActions } from "../store/formEntries-slice";

function TextInput({ textType, formEntryFromBuilder, viewOnly }) {
  // state values for handling the change of the lables after the form is created
  const [isEditing, setIsEditing] = useState(false);
  const [editiedLabel, setEditedLabel] = useState("");

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  // handling changes to the added text inputs
  const handleChange = (event, id) => {
    dispatch(
      formEntriesActions.handleChangeInForm({
        inputType: textType,
        id,
        value: event.target.value,
      })
    );
  };

  // function for handling the click on the label
  const labelIsClicked = label => {
    if (viewOnly) {
      return;
    }
    setEditedLabel(label);
    setIsEditing(true);
  };

  // function for submitting the changes of the lables after form is created
  const handleSubmitOfLabelChangeFromForm = id => {
    dispatch(
      formEntriesActions.handleChangesToFormLablesAfterCreation({
        inputType: textType,
        id,
        newLabel: editiedLabel,
      })
    );
    setEditedLabel("");
    setIsEditing(false);
  };

  // deleting the form entry from form
  const handleDeleteOfEntry = id => {
    dispatch(
      formEntriesActions.deleteLabelsOrGroupsAfterCreation({
        inputType: textType,
        id,
      })
    );
  };

  return (
    <React.Fragment>
      {[formEntryFromBuilder].map(form => {
        return (
          <div className="mb-2" key={form.id}>
            {/* this is rendered default because user does not want to edit lable when the form entry is first added */}
            {!isEditing &&  (
              <div>
                <label
                  className="form-label me-3"
                  onClick={() => labelIsClicked(form.label)}
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
            {/* this part will be rendred when the label is clicked and user wants to change the label of the input field */}
            {isEditing && isLoggedIn && (
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editiedLabel}
                  onChange={event => setEditedLabel(event.target.value)}
                />
                <button
                  onClick={() => handleSubmitOfLabelChangeFromForm(form.id)}
                  className="btn btn-dark mb-2"
                >
                  Change Label
                </button>
              </div>
            )}
            {textType === "text" ? (
              <input
                disabled={isLoggedIn}
                className="form-control"
                type="text"
                required={!isLoggedIn}
                name={form.label}
                value={form.value}
                onChange={event => handleChange(event, form.id)}
              />
            ) : (
              <textarea
                disabled={isLoggedIn}
                className="form-control"
                required={!isLoggedIn}
                name={form.label}
                value={form.value}
                onChange={event => handleChange(event, form.id)}
              />
            )}
          </div>
        );
      })}
    </React.Fragment>
  );
}

export default TextInput;
