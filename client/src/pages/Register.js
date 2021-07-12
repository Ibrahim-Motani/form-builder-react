import React, { useState } from "react";
// slice and store imports
import { registerUser } from "../store/formEntries-slice";
// redux imports
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(registerUser({ email, password, name }));
    swal("Success", "You are registered");
    history.push("/login");
  };

  return (
    <div className="container p-5">
      <div className="row align-items-center justify-content-center ">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <h1 className="display-5 mb-4">React Form Builder</h1>

            <legend>Register</legend>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
