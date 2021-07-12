// react imports
import React, { useState } from "react";
// redux imports
import { useDispatch, useSelector } from "react-redux";
// actions import
import { formEntriesActions } from "../store/formEntries-slice";

function CheckboxInput({ formEntryFromBuilder, viewOnly }) {
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

  // handling checking of checkboxes in the forms
  const handleCheckingOfBoxes = (groupId, id) => {
    dispatch(
      formEntriesActions.handleChangeInForm({
        inputType: "checkbox",
        groupId,
        id,
      })
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
        inputType: "checkbox",
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

  // handle submission of chnaged label name from form
  const handleSubmitOfOptionChangeFromForm = (groupId, id) => {
    dispatch(
      formEntriesActions.handleChangesToFormLablesAfterCreation({
        inputType: "checkbox",
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
        inputType: "checkbox",
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
        inputType: "checkbox",
      })
    );
  };

  return (
    <div>
      {/* forms of checkbox */}
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
            {isEditing && isLoggedIn && !viewOnly && (
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
            {/* this is rendered default because user does not want to edit option lable when the form entry is first added */}
            <div className="form-check mb-2" key={form.groupId}>
              {form.checkboxes.map(checkboxEntry => {
                return (
                  <div key={checkboxEntry.id}>
                    {!(
                      idForLabelBeingChanged === checkboxEntry.id &&
                      isLoggedIn &&
                      !viewOnly
                    ) && (
                      <input
                        disabled={isLoggedIn}
                        className="form-check-input"
                        type="checkbox"
                        onChange={() =>
                          handleCheckingOfBoxes(form.groupId, checkboxEntry.id)
                        }
                        checked={checkboxEntry.checked}
                        value={checkboxEntry.value}
                      />
                    )}

                    {!(
                      idForLabelBeingChanged === checkboxEntry.id &&
                      isEditingForOption &&
                      isLoggedIn &&
                      !viewOnly
                    ) && (
                      <div>
                        {/* when label will be clicked the editing option will be enables */}
                        <label
                          className="form-check-label me-3"
                          onClick={() =>
                            handleOptionIsClicked(
                              checkboxEntry.id,
                              checkboxEntry.label
                            )
                          }
                        >
                          {checkboxEntry.label}
                        </label>
                        {/* button for deleting an option */}
                        {isLoggedIn && !viewOnly && (
                          <i
                            className="fas fa-minus"
                            onClick={() =>
                              deleteOption(form.groupId, checkboxEntry.id)
                            }
                            style={{ color: "tomato", cursor: "pointer" }}
                          ></i>
                        )}
                      </div>
                    )}
                    {/* this check is to know which one of the options is being clicked and edited */}
                    {isEditingForOption &&
                      !viewOnly &&
                      idForLabelBeingChanged === checkboxEntry.id &&
                      isLoggedIn && (
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
                                checkboxEntry.id
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
          </div>
        );
      })}
    </div>
  );
}

export default CheckboxInput;
