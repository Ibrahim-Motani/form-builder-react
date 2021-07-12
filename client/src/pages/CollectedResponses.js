// react imports
import React, { useEffect, useState } from "react";
// components imports
import Navbar from "../components/Navbar";
// react router dom imports
import { useParams, Link } from "react-router-dom";
// redux imports
// other packages imports
import axios from "axios";

function CollectedResponses() {
  const [responses, setResponses] = useState([]);
  const [temp, setTemp] = useState(false);
  const params = useParams();

  useEffect(() => {
    axios
      .get(
        `https://react-dynamic-form-builder.herokuapp.com/get-all-responses-for-a-particular-form/${params.id}`
      )
      .then(response => {
        const result = response.data;
        console.log(result);
        setResponses(result);
      })
      .catch(error => {
        console.log(error);
      });
  }, [temp]);

  const handleDeleteResponse = _id => {
    axios
      .delete(`https://react-dynamic-form-builder.herokuapp.com/delete-response/${_id}`)
      .then(response => {
        console.log(response.data);
        setTemp(!temp);
      })
      .catch(error => {
        console.log(error);
        setTemp(!temp);
      });
  };

  return (
    <div>
      <React.Fragment>
        <Navbar></Navbar>
        <div className="container p-5">
          <div className="row align-items-center justify-content-center ">
            <div className="col-9">
              {responses.map((response, index) => {
                return (
                  <div key={response._id} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Response {index + 1}</h5>
                      <p className="card-text">
                        Submitted At - {response.formSubmittedAt}
                      </p>
                      <Link
                        to={`/view-response/${response._id}`}
                        className="btn btn-primary me-3"
                      >
                        View Response
                      </Link>
                      <button
                        onClick={() => handleDeleteResponse(response._id)}
                        className="btn btn-primary me-3"
                      >
                        Delete Response
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default CollectedResponses;
