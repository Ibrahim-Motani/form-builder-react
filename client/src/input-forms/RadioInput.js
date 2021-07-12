import React, { useState } from "react";
// redux imports
import { useDispatch, useSelector } from "react-redux";
// actions import
import { formEntriesActions } from "../store/formEntries-slice";

function RadioInput({ formEntryFromBuilder, viewOnly }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  // state variables for making changes after form is made
  // these are for changes to group label
  const [isEditing, setIsEditing] = useState(false);
  const [editiedLabelForGroup, setEditedLabelForGroup] = useState("");
  // these are for option being changed
  const [idForLabelBeingChanged, setIdForLabelBeingChanged] = useState("");
  const [editiedLabelForOption, setEditedLabelForOption] = useState("");
  const [isEditingForOption, setIsEditingForOption] = useState(false);

  // handling selection of choices in the forms
  const handleSelectionOfChoices = (groupId, id) => {
    dispatch(
      formEntriesActions.handleChangeInForm({ inputType: "radio", groupId, id })
    );
  };

  // function for handling the click on the label
  const labelIsClicked = label => {
    if (viewOnly) {
      return;
    }
    setEditedLabelForGroup(label);
    setIsEditing(true);
  };

  // function for handling submit to change of group label
  const handleSubmitOfLabelChangeFromForm = groupId => {
    dispatch(
      formEntriesActions.handleChangesToFormLablesAfterCreation({
        inputType: "radio",
        changeMadeIn: "group label",
        groupId,
        newLabel: editiedLabelForGroup,
      })
    );
    setEditedLabelForGroup("");
    setIsEditing(false);
  };

  // handle click for option being clicked in the form
  const handleOptionIsClicked = (id, label) => {
    if (viewOnly) {
      return;
    }
    setIdForLabelBeingChanged(id);
    setIsEditingForOption(true);
    setEditedLabelForOption(label);
  };

  // handle submission of chnaged option name from form
  const handleSubmitOfOptionChangeFromForm = (groupId, id) => {
    dispatch(
      formEntriesActions.handleChangesToFormLablesAfterCreation({
        inputType: "radio",
        changeMadeIn: "option label",
        groupId,
        id,
        newLabel: editiedLabelForOption,
      })
    );
    setIsEditingForOption(false);
    setIdForLabelBeingChanged("");
    setEditedLabelForOption("");
  };

  // delete group from form
  const deleteGroup = groupId => {
    dispatch(
      formEntriesActions.deleteLabelsOrGroupsAfterCreation({
        groupId,
        inputType: "radio",
        deleteType: "group",
      })
    );
  };

  // delete option from form
  const deleteOption = (groupId, id) => {
    dispatch(
      formEntriesActions.deleteLabelsOrGroupsAfterCreation({
        groupId,
        id,
        deleteType: "option",
        inputType: "radio",
      })
    );
  };

  return (
    <div className="mb-2">
      {/* forms of choices */}
      {[formEntryFromBuilder].map(form => {
        return (
          <div key={form.groupId}>
            {/* this is rendered default because user does not want to edit lable when the form entry is first added */}
            {!isEditing && (
              <div>
                <label
                  onClick={() => labelIsClicked(form.label)}
                  className="form-label me-3"
                >
                  {form.label}
                </label>
                {isLoggedIn && !viewOnly && (
                  <i
                    className="fas fa-minus"
                    onClick={() => deleteGroup(form.groupId)}
                    style={{ color: "tomato", cursor: "pointer" }}
                  ></i>
                )}
              </div>
            )}
            {/* this part will be rendred when the label is clicked and user wants to change the label of the input field */}
            {isEditing && !viewOnly && (
              <div>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editiedLabelForGroup}
                  onChange={event => setEditedLabelForGroup(event.target.value)}
                />
                <button
                  onClick={() =>
                    handleSubmitOfLabelChangeFromForm(form.groupId)
                  }
                  className="btn btn-dark mb-2"
                >
                  Change Group Label
                </button>
              </div>
            )}
            {form.choices.map(choiceEntry => {
              return (
                <div className="form-check" key={choiceEntry.id}>
                  {!(
                    idForLabelBeingChanged === choiceEntry.id &&
                    isLoggedIn &&
                    !viewOnly
                  ) && (
                    <input
                      disabled={isLoggedIn}
                      className="form-check-input"
                      onChange={() =>
                        handleSelectionOfChoices(form.groupId, choiceEntry.id)
                      }
                      type="radio"
                      required={!isLoggedIn}
                      checked={choiceEntry.selected}
                      name={choiceEntry.name}
                      value={choiceEntry.value}
                    />
                  )}
                  {!(
                    idForLabelBeingChanged === choiceEntry.id &&
                    isEditingForOption &&
                    !viewOnly
                  ) && (
                    <div>
                      <label
                        onClick={() =>
                          handleOptionIsClicked(
                            choiceEntry.id,
                            choiceEntry.value
                          )
                        }
                        className="form-check-label me-3"
                      >
                        {choiceEntry.value}
                      </label>
                      {isLoggedIn && !viewOnly && (
                        <i
                          className="fas fa-minus"
                          onClick={() =>
                            deleteOption(form.groupId, choiceEntry.id)
                          }
                          style={{ color: "tomato", cursor: "pointer" }}
                        ></i>
                      )}
                    </div>
                  )}
                  {isEditingForOption &&
                    !viewOnly &&
                    idForLabelBeingChanged === choiceEntry.id && (
                      <div>
                        {/* input box for changing the clicked option label */}
                        <input
                          value={editiedLabelForOption}
                          onChange={event =>
                            setEditedLabelForOption(event.target.value)
                          }
                          type="text"
                          className="form-control mb-2"
                        />
                        {/* button for submitting option change */}
                        <button
                          onClick={() =>
                            handleSubmitOfOptionChangeFromForm(
                              form.groupId,
                              choiceEntry.id
                            )
                          }
                          className="btn btn-dark mb-2"
                        >
                          Change Label Name
                        </button>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default RadioInput;
