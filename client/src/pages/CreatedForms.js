import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllFormsForCurrentUser } from "../store/formEntries-slice";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from 'axios';

function CreatedForms() {
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.currentUserId);
  const allCreatedForms = useSelector(state => state.currentUserAllForms);
  console.log(allCreatedForms);
    const [temp, setTemp] = useState(false);

  useEffect(() => {
    dispatch(getAllFormsForCurrentUser(currentUserId));
  }, [temp]);

  const handleShareButtonClick = _id => {
    swal(
      "Share Form",
      `You can share the following link with others to collect responses: \n https://dyamic-form-builder.netlify.app/share-form/${_id}`
    );
  };

  const handleDeleteForm = _id => {
    axios.delete(
      `https://dynamic-form-builder-react.herokuapp.com/delete-form/${_id}`
    ).then(response => {
      console.log(response.data);
      setTemp(!temp);
    }).catch(error => {
      console.log(error);
      setTemp(!temp);
    });
    axios.delete(
      `https://dynamic-form-builder-react.herokuapp.com/delete-responses/${_id}`
    ).then(response => {
      console.log(response.data);
      setTemp(!temp);
    }).catch(error => {
      console.log(error);
      setTemp(!temp);
    });
  };

  return (
    <React.Fragment>
      <Navbar></Navbar>
      <div className="container p-5">
        <div className="row align-items-center justify-content-center ">
          <div className="col-9">
            {allCreatedForms.map(form => {
              return (
                <div key={form._id} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">
                      Title - {form.form[0].formTitle}
                    </h5>
                    <p className="card-text">
                      Created At - {form.form[0].formCreationDate}
                    </p>
                    <Link
                      to={`/view-form/${form._id}`}
                      className="btn btn-primary me-3"
                    >
                      View Form
                    </Link>
                    <button
                      onClick={() => handleShareButtonClick(form._id)}
                      to={`/share-form/${form._id}`}
                      className="btn btn-primary me-3"
                    >
                      Share Form
                    </button>
                    <Link
                      to={`/collected-responses/${form._id}`}
                      className="btn btn-primary me-3"
                    >
                      View Responses
                    </Link>
                    <button onClick={() => handleDeleteForm(form._id)} className="btn btn-primary">
                      Delete Form
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreatedForms;
