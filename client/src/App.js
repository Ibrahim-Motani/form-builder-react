// react imports
import React from "react";
// react router dom imports
import { Route, Switch } from "react-router";
import { Redirect } from "react-router-dom";
// pages imports
import FinalFormBuilderPage from "./pages/FinalFormBuilderPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatedForms from "./pages/CreatedForms";
// redux imports
import { useSelector } from "react-redux";
import ViewForm from "./pages/ViewForm";
import ResponseForm from "./pages/ResponseForm";
import CollectedResponses from "./pages/CollectedResponses";
import ViewResponse from "./pages/ViewResponse";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  return (
    <React.Fragment>
      <Switch>
        {/* private route accessible only if logged in */}
        <Route path="/" component={Login} exact></Route>
        <Route
          path="/login"
          render={() =>
            !isLoggedIn ? (
              <Login></Login>
            ) : (
              <Redirect to={{ pathname: "/form-builder" }}></Redirect>
            )
          }
        ></Route>
        <Route
          path="/form-builder"
          render={() =>
            isLoggedIn ? (
              <FinalFormBuilderPage></FinalFormBuilderPage>
            ) : (
              <Redirect to={{ pathname: "/login" }}></Redirect>
            )
          }
        ></Route>
        {/* route not accessible if user is already logged in  */}
        <Route
          path="/login"
          render={() =>
            !isLoggedIn ? (
              <Login></Login>
            ) : (
              <Redirect to={{ pathname: "/form-builder" }}></Redirect>
            )
          }
        ></Route>
        {/* register route accessible if user is not logged in and wants to register */}
        <Route
          path="/register"
          render={() =>
            !isLoggedIn ? (
              <Register></Register>
            ) : (
              <Redirect to={{ pathname: "/form-builder" }}></Redirect>
            )
          }
        ></Route>
        {/* created forms route is only available if user is registered and logged in */}
        <Route
          path="/created-forms"
          render={() =>
            isLoggedIn ? (
              <CreatedForms></CreatedForms>
            ) : (
              <Redirect to={{ pathname: "/login" }}></Redirect>
            )
          }
        ></Route>
        {/* viewing of form is available only when user is logged in */}
        <Route
          path="/view-form/:form_id"
          render={() =>
            isLoggedIn ? (
              <ViewForm></ViewForm>
            ) : (
              <Redirect to={{ pathname: "/login" }}></Redirect>
            )
          }
        ></Route>
        {/* Collected responses will only be available if user is logged in */}
        <Route
          path="/collected-responses/:id"
          render={() =>
            isLoggedIn ? (
              <CollectedResponses></CollectedResponses>
            ) : (
              <Redirect to={{ pathname: "/login" }}></Redirect>
            )
          }
        ></Route>
        {/* One particular response can only be viewed if user is logged in */}
        <Route
          path="/view-response/:form_id"
          render={() =>
            isLoggedIn ? (
              <ViewResponse></ViewResponse>
            ) : (
              <Redirect to={{ pathname: "/login" }}></Redirect>
            )
          }
        ></Route>
        <Route
          path="/share-form/:form_id"
          component={ResponseForm}
          exact
        ></Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
