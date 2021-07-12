import React from "react";
// redux imports
import { useDispatch } from "react-redux";
// actions import
import { formEntriesActions } from "../store/formEntries-slice";

function DropdownInput({ formEntryFromBuilder }) {
  const dispatch = useDispatch();


  // handle selection from dropdown
  const handleChoiceSelection = (groupId, event) => {
    dispatch(
      formEntriesActions.handleChangeInForm({
        inputType: "dropdown",
        groupId,
        value: event.target.value,
      })
    );
  };

  return (
    <div>
      {/* forms of choices */}
      {[formEntryFromBuilder].map(form => {
        return (
          <div key={form.groupId} className="mb-2">
            <label className="form-label">{form.label}</label> <br />
            <select
              className="form-select"
              key={form.groupId}
              onChange={event => handleChoiceSelection(form.groupId, event)}
            >
              <option value="">Select {form.label}</option>
              {form.choices.map(choiceEntry => {
                return (
                  <option key={choiceEntry.id} value={choiceEntry.value}>
                    {choiceEntry.value}
                  </option>
                );
              })}
            </select>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default DropdownInput;
