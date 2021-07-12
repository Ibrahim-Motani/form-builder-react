// react imports
import React, { useState, useEffect } from "react";
// builder imports
import TextInput from "../input-forms/TextInput";
import DropdownInput from "../input-forms/DropdownInput";
import CheckboxInput from "../input-forms/CheckboxInput";
import RadioInput from "../input-forms/RadioInput";
import NumberInput from "../input-forms/NumberInput";
import Navbar from "../components/Navbar";
// react router dom imports
import { useParams } from "react-router-dom";
// other packages import
import axios from "axios";

function ViewForm() {
  const [formForViewing, setFormForViewing] = useState([]);
  const params = useParams();
  const viewOnly = true;

  useEffect(() => {
    axios
      .get(
        `https://dynamic-form-builder-react.herokuapp.com/get-form/${params.form_id}`
      )
      .then(result => {
        console.log(result.data);
        setFormForViewing(result.data.form);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="container p-5">
        <div className="row align-items-center justify-content-center ">
          <div className="col-5">
            {formForViewing.map(form => {
              if (form.type === "text") {
                return (
                  <TextInput
                    viewOnly={viewOnly}
                    key={form.id}
                    textType="text"
                    formEntryFromBuilder={form}
                  ></TextInput>
                );
              } else if (form.type === "textarea") {
                return (
                  <TextInput
                    viewOnly={viewOnly}
                    key={form.id}
                    textType="textarea"
                    formEntryFromBuilder={form}
                  ></TextInput>
                );
              } else if (form.type === "number") {
                return (
                  <NumberInput
                    viewOnly={viewOnly}
                    key={form.id}
                    formEntryFromBuilder={form}
                  ></NumberInput>
                );
              } else if (form.type === "checkbox") {
                return (
                  <CheckboxInput
                    viewOnly={viewOnly}
                    key={form.groupId}
                    formEntryFromBuilder={form}
                  ></CheckboxInput>
                );
              } else if (form.type === "radio") {
                return (
                  <RadioInput
                    viewOnly={viewOnly}
                    key={form.groupId}
                    formEntryFromBuilder={form}
                  ></RadioInput>
                );
              } else if (form.type === "dropdown") {
                return (
                  <DropdownInput
                    viewOnly={viewOnly}
                    key={form.groupId}
                    formEntryFromBuilder={form}
                  ></DropdownInput>
                );
              } else if (form.type === "formTitle") {
                return (
                  <div key={form.id}>
                    <h4>{form.formTitle}</h4>
                  </div>
                );
              } else {
                return <h3>Invalid Input</h3>;
              }
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ViewForm;
