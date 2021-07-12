// react imports
import React, { useState, useEffect } from "react";
// other packages imports
import { v4 as uuidv4 } from "uuid";
// builder imports
import TextInputBuilder from "./TextInputBuilder";
import FinalForm from "../final-form/FinalForm";
import NumberInputBuilder from "./NumberInputBuilder";
import CheckboxInputBuilder from "./CheckboxInputBuilder";
import RadioInputBuilder from "./RadioInputBuilder";
import DropdownInputBuilder from "./DropdownInputBuilder";
// store and redux imports
import { useSelector, useDispatch } from "react-redux";
// other packages import
import swal from "sweetalert";
// actions imports
import { formEntriesActions } from "../store/formEntries-slice";
import { addFormToTheDatabase } from "../store/formEntries-slice";
// array of input types
const INPUT_TYPES_ARRAY = [
  { id: uuidv4(), label: "Select an Input Type", value: "" },
  { id: uuidv4(), label: "Text", value: "text" },
  { id: uuidv4(), label: "Textarea", value: "textarea" },
  { id: uuidv4(), label: "Number", value: "number" },
  { id: uuidv4(), label: "Checkbox", value: "checkbox" },
  { id: uuidv4(), label: "Radio", value: "radio" },
  { id: uuidv4(), label: "Dropdown", value: "dropdown" },
];

function FinalFormBuilder() {
  const dispatch = useDispatch();

  // state for selecting type of input from the bulder
  const [inputType, setInputType] = useState("");
  // state for adding title to the form
  const [title, setTitle] = useState("");
  const [titleIsEntered, setTitleIsEntered] = useState(false);

  useEffect(() => {
    swal("Welcome to React Form Builder", "Add Form title first and then you can choose the inputs for your form from the dropdown menu")
  }, []);

  // getting state values from store
  const formEntries = useSelector(state => state.formEntries);
  const currentUserId = useSelector(state => state.currentUserId);

  // resetting the form
  const resetForm = () => {
    dispatch(formEntriesActions.resetForm());
  };

  // handling form submission
  const handleSubmit = event => {
    event.preventDefault();
    // console.log(formEntries);
    dispatch(addFormToTheDatabase(formEntries, currentUserId));
    swal("Form Created", "You can view the form in Created Forms tab");
  };

  // handle adding form title
  const handleAddFormTitle = () => {
    const obj = [
      {
        id: uuidv4(),
        formTitle: title,
        formCreationDate: new Date().toDateString(),
        type: "formTitle",
      },
    ];

    dispatch(formEntriesActions.addFormEntry(obj));
    swal("Title added", "You can choose your inputs from the dropdown menu and add them to the builder");
    setTitleIsEntered(true);
    setTitle('');
  };

  

  return (
    <div className="row gx-5 mt-3">
      <div className="col-6">
        <div className="p3">
          <h2 className="display-5">Form Builder</h2>
        </div>
        {/* this will be only visible when app starts  */}
        {!titleIsEntered && (
          <React.Fragment>
            <label className="form-label" >
              Form title
            </label>
            <input
              value={title}
              onChange={event => setTitle(event.target.value)}
              type="text"
              className="form-control mb-3"
              placeholder="Enter Form Title here"
            />
            <button onClick={handleAddFormTitle} className="btn btn-dark">
              Add Title
            </button>
          </React.Fragment>
        )}
        {/* form builder will appear only after the title is entered */}
        {titleIsEntered && (
          <React.Fragment>
            {/* select what type of input do you want */}
            <select
              className="form-select mb-4"
              value={inputType}
              onChange={event => setInputType(event.target.value)}
            >
              {INPUT_TYPES_ARRAY.map(INPUT_TYPE => {
                return (
                  <option key={INPUT_TYPE.id} value={INPUT_TYPE.value}>
                    {INPUT_TYPE.label}
                  </option>
                );
              })}
            </select>
            {/* Builder */}
            {inputType === "text" && (
              <TextInputBuilder textType="text"></TextInputBuilder>
            )}
            {inputType === "textarea" && (
              <TextInputBuilder textType="textarea"></TextInputBuilder>
            )}
            {inputType === "number" && (
              <NumberInputBuilder></NumberInputBuilder>
            )}
            {inputType === "checkbox" && (
              <CheckboxInputBuilder></CheckboxInputBuilder>
            )}
            {inputType === "radio" && <RadioInputBuilder></RadioInputBuilder>}
            {inputType === "dropdown" && (
              <DropdownInputBuilder></DropdownInputBuilder>
            )}
          </React.Fragment>
        )}
      </div>
      <div className="col-6 form">
        <div className="p3">
          <h2 className="display-5">Form</h2>
          <form className="form" onSubmit={handleSubmit}>
            <FinalForm></FinalForm>
            {/* buttons for submitting and resetting the forms will be available only after one input field is added to the form */}
            {formEntries.length > 1 && (
              <div className="mb-4">
                <button className="btn btn-primary me-3" type="submit">
                  Create form
                </button>
                <button
                  className="btn btn-dark"
                  type="button"
                  onClick={resetForm}
                >
                  Reset Form
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default FinalFormBuilder;
