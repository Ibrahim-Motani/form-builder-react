// react imports
import React, { useEffect } from "react";
// react router dom imports
import { useParams } from "react-router-dom";
// components imports
import Navbar from "../components/Navbar";
// other packages imports
import axios from "axios";
import swal from "sweetalert";
// builder imports
import TextInput from "../input-forms/TextInput";
import DropdownInput from "../input-forms/DropdownInput";
import CheckboxInput from "../input-forms/CheckboxInput";
import RadioInput from "../input-forms/RadioInput";
import NumberInput from "../input-forms/NumberInput";
// redux imports
import { useSelector, useDispatch } from "react-redux";
import { formEntriesActions } from "../store/formEntries-slice";

function ResponseForm() {
  const dispatch = useDispatch();
  const formEntries = useSelector(state => state.formEntries);
  // const formHasError = useSelector(state => state.formHasError);
  const params = useParams();
  const viewOnly = true;

  useEffect(() => {
    axios
      .get(
        `https://react-dynamic-form-builder.herokuapp.com/get-form/${params.form_id}`
      )
      .then(response => {
        const result = response.data;
        console.log(result.form);
        dispatch(formEntriesActions.setFormForResponseCollection(result.form));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();

    // form validation
    let error = true;
    for (const form of formEntries) {
      if (form.type === "checkbox") {
        for (let i = 0; i < form.checkboxes.length; i++) {
          if (form.checkboxes[i].checked === true) {
            error = false;
          }
        }
      } else if (form.type === "radio") {
        for (let i = 0; i < form.choices.length; i++) {
          if (form.choices[i].checked === true) {
            error = false;
          }
        }
      } else if (
        form.type === "text" ||
        form.type === "textarea" ||
        form.type === "number"
      ) {
        if (
          form.value === "" ||
          form.value.trim() === "" ||
          form.value.trim().length === 0
        ) {
          error = true;
        }
      } else if (form.type === "selection") {
        if (form.selection === "") {
          error = true;
        }
      }
    }
    console.log(error);
    if (error) {
      swal(
        "Empty input fields!",
        "One or more fields are empty or invalid! Please fill in all the inputs to submit the form",
        "error"
      );
      return;
    }

    else {
      const data = {
        formId: params.form_id,
        response: formEntries,
        formSubmittedAt: new Date().toDateString(),
      };

      axios
        .post(
          `https://react-dynamic-form-builder.herokuapp.com/add-response`,
          data
        )
        .then(response => {
          const result = response.data;
          console.log(result);
          swal("Success!", "Form successfully submitted!", "success");
          dispatch(formEntriesActions.resetForm());
        })
        .catch(error => {
          console.log(error);
          swal("Error!", "There was an error in form submission", "error");
          dispatch(formEntriesActions.resetForm());
        });
    }
  };

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="container p-5">
        <div className="row align-items-center justify-content-center ">
          <div className="col-8">
            <form onSubmit={handleSubmit}>
              {formEntries.map(form => {
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
              <button type="submit" className="btn btn-primary">
                Submit Response
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ResponseForm;
