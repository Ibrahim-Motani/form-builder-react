// react imports
import React, { useState } from "react";
// builder imports
import TextInput from "../input-forms/TextInput";
import DropdownInput from "../input-forms/DropdownInput";
import CheckboxInput from "../input-forms/CheckboxInput";
import RadioInput from "../input-forms/RadioInput";
import NumberInput from "../input-forms/NumberInput";
// redux imports
import { useSelector, useDispatch } from "react-redux";
// actions imports
import { formEntriesActions } from "../store/formEntries-slice";

function FinalForm() {
  const formEntries = useSelector(state => state.formEntries);
  const dispatch = useDispatch();

  // state for editing the title of the form since I don't have a seperate builder for form title
  const [title, setTitle] = useState("");
  const [titleIsEditing, setTitleIsEditing] = useState(false);

  // handling edit of form title
  const ChangeFormTitle = () => {
    dispatch(formEntriesActions.handleChangeOfFormTitle({ newTitle: title }));
    setTitleIsEditing(false);
    setTitle("");
  };

  return (
    <div>
      {formEntries.map(form => {
        if (form.type === "text") {
          return (
            <TextInput
              key={form.id}
              textType="text"
              formEntryFromBuilder={form}
            ></TextInput>
          );
        } else if (form.type === "textarea") {
          return (
            <TextInput
              key={form.id}
              textType="textarea"
              formEntryFromBuilder={form}
            ></TextInput>
          );
        } else if (form.type === "number") {
          return (
            <NumberInput
              key={form.id}
              formEntryFromBuilder={form}
            ></NumberInput>
          );
        } else if (form.type === "checkbox") {
          return (
            <CheckboxInput
              key={form.groupId}
              formEntryFromBuilder={form}
            ></CheckboxInput>
          );
        } else if (form.type === "radio") {
          return (
            <RadioInput
              key={form.groupId}
              formEntryFromBuilder={form}
            ></RadioInput>
          );
        } else if (form.type === "dropdown") {
          return (
            <DropdownInput
              key={form.groupId}
              formEntryFromBuilder={form}
            ></DropdownInput>
          );
          
        } else if (form.type === "formTitle") {
          return (
            <div key={form.id}>
              {!titleIsEditing && (
                <h4 onClick={() => setTitleIsEditing(true)}>
                  {form.formTitle}
                </h4>
              )}
              {titleIsEditing && (
                <React.Fragment>
                  <input
                    type="text"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    className="form-control mb-3"
                    placeholder="Change Form Title here"
                  />
                  <button onClick={ChangeFormTitle} className="btn btn-dark">
                    Change Title
                  </button>
                </React.Fragment>
              )}
            </div>
          );
        } else {
          return <h3>Invalid Input</h3>;
        }
      })}
    </div>
  );
}

export default FinalForm;
