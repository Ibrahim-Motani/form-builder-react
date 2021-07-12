// react imports
import React from "react";
// react router imports
import { Link } from "react-router-dom";
// redux imports
import { useSelector, useDispatch } from "react-redux";
// actions import
import { formEntriesActions } from "../store/formEntries-slice";
// react router dom imports
import { useHistory } from "react-router-dom";

function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const handleLogout = () => {
    dispatch(formEntriesActions.logoutUser());
    history.push("/login");
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">React Form Builder</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {isLoggedIn && (
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ">
                <Link to="/form-builder" className="nav-link ">
                  Create a new Form
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/created-forms">
                  Created Forms
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
