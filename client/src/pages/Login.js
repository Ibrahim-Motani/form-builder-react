// react imports
import React, { useState } from "react";
// slice and store imports
import { loginUser } from "../store/formEntries-slice";
// redux imports
import { useDispatch } from "react-redux";
// react router dom imports
import { useHistory } from "react-router";

function Login() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("testing@gmail.com");
  const [password, setPassword] = useState("testing1234");

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(loginUser({ email, password }));
    setTimeout(() => {
      history.push("/form-builder");
    }, 1700);
  };

  return (
    <div className="container p-5">
      <div className="row align-items-center justify-content-center ">
        <div className="col-6">
          <h1 className="display-5 mb-4">React Form Builder</h1>
          <form onSubmit={handleSubmit}>
            <legend>Login</legend>
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
              Login
            </button>
          </form>
        </div>
      </div>{" "}
    </div>
  );
}

export default Login;
