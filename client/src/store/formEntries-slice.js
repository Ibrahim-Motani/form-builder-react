// import slice function from toolkit
import { createSlice } from "@reduxjs/toolkit";
// axios import
import axios from "axios";

// helper function
const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
};

// initial state
const initialFormState = {
  formEntries: [],
  isLoggedIn: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  currentUserId: localStorage.getItem("currentUserId")
    ? localStorage.getItem("currentUserId")
    : "",
  currentUserAllForms: [],
  responseCollection: [],
  formHasError: false,
};

// state slice for forms
const formEntriesSlice = createSlice({
  name: "formEntries",
  initialState: initialFormState,
  reducers: {
    // add a new type of form to the list
    addFormEntry(state, action) {
      const newFormEntries = [...state.formEntries, ...action.payload].filter(
        onlyUnique
      );
      state.formEntries = [...newFormEntries];
    },
    // handle change to the forms list
    handleChangeInForm(state, action) {
      // handle change in text, textarea and number
      if (
        action.payload.inputType === "text" ||
        action.payload.inputType === "textarea" ||
        action.payload.inputType === "number"
      ) {
        state.formEntries = state.formEntries.map(form => {
          if (form.id === action.payload.id) {
            form.value = action.payload.value;
          }
          return form;
        });
        // handle change in radio
      } else if (action.payload.inputType === "radio") {
        state.formEntries = state.formEntries.map(form => {
          if (form.groupId === action.payload.groupId) {
            form.choices = form.choices.map(choiceEntry => {
              if (choiceEntry.id === action.payload.id) {
                choiceEntry.selected = true;
              } else {
                choiceEntry.selected = false;
              }
              return choiceEntry;
            });
          }
          return form;
        });
        // handle change for checkbox
      } else if (action.payload.inputType === "checkbox") {
        state.formEntries = state.formEntries.map(form => {
          if (form.groupId === action.payload.groupId) {
            form.checkboxes = form.checkboxes.map(checkboxEntry => {
              if (checkboxEntry.id === action.payload.id) {
                checkboxEntry.checked = !checkboxEntry.checked;
              }
              return checkboxEntry;
            });
          }
          return form;
        });
        // handle change for dropdown
      } else if (action.payload.inputType === "dropdown") {
        state.formEntries = state.formEntries.map(form => {
          if (form.groupId === action.payload.groupId) {
            form.selection = action.payload.value;
          }
          return form;
        });
      }
    },
    // handling changes to form title
    handleChangeOfFormTitle(state, action) {
      state.formEntries = state.formEntries.map(form => {
        if (form.type === "formTitle") {
          form.formTitle = action.payload.newTitle;
        }
        return form;
      });
    },
    // handling changes to the lables after the form is created
    handleChangesToFormLablesAfterCreation(state, action) {
      // handling edit to the label for text, textarea
      if (
        action.payload.inputType === "text" ||
        action.payload.inputType === "textarea"
      ) {
        state.formEntries = state.formEntries.map(form => {
          if (form.id === action.payload.id) {
            form.label = action.payload.newLabel;
          }
          return form;
        });
      }
      // handling edit to the label for number
      else if (action.payload.inputType === "number") {
        state.formEntries = state.formEntries.map(form => {
          if (form.id === action.payload.id) {
            form.label = action.payload.newLabel;
            form.min = action.payload.newMin;
            form.max = action.payload.newMax;
          }
          return form;
        });
      }
      // handling for checkbox
      else if (action.payload.inputType === "checkbox") {
        // handling changes to the label
        if (action.payload.changeMadeIn === "group label") {
          state.formEntries = state.formEntries.map(form => {
            if (form.groupId === action.payload.groupId) {
              form.label = action.payload.newLabel;
            }
            return form;
          });
          // handling changes to the option of the group
        } else if (action.payload.changeMadeIn === "option label") {
          state.formEntries = state.formEntries.map(form => {
            if (form.groupId === action.payload.groupId) {
              form.checkboxes = form.checkboxes.map(checkboxEntry => {
                if (checkboxEntry.id === action.payload.id) {
                  checkboxEntry.label = action.payload.newLabel;
                  checkboxEntry.value = action.payload.newLabel;
                }
                return checkboxEntry;
              });
            }
            return form;
          });
        }
      } else if (action.payload.inputType === "radio") {
        // handling changes to the label
        if (action.payload.changeMadeIn === "group label") {
          state.formEntries = state.formEntries.map(form => {
            if (form.groupId === action.payload.groupId) {
              form.label = action.payload.newLabel;
              form.choices = form.choices.map(choiceEntry => {
                return { ...choiceEntry, name: action.payload.newLabel };
              });
            }
            return form;
          });
          // handling changes to the option of the group
        } else if (action.payload.changeMadeIn === "option label") {
          state.formEntries = state.formEntries.map(form => {
            if (form.groupId === action.payload.groupId) {
              form.choices = form.choices.map(choiceEntry => {
                if (choiceEntry.id === action.payload.id) {
                  choiceEntry.value = action.payload.newLabel;
                }
                return choiceEntry;
              });
            }
            return form;
          });
        }
      }
    },
    // deleting groups and options from form after creation
    deleteLabelsOrGroupsAfterCreation(state, action) {
      // checking for input type
      if (
        action.payload.inputType === "text" ||
        action.payload.inputType === "textarea" ||
        action.payload.inputType === "number"
      ) {
        state.formEntries = state.formEntries.filter(
          form => form.id !== action.payload.id
        );
      }
      // if input type is checkbox then deletion can be of group as well as of options
      else if (action.payload.inputType === "checkbox") {
        // checking if group is deleted
        if (action.payload.deleteType === "group") {
          state.formEntries = state.formEntries.filter(
            form => form.groupId !== action.payload.groupId
          );
        }
        // checking if option is being deleted
        else if (action.payload.deleteType === "option") {
          state.formEntries = state.formEntries.map(form => {
            if (form.groupId === action.payload.groupId) {
              form.checkboxes = form.checkboxes.filter(
                checkboxEntry => checkboxEntry.id !== action.payload.id
              );
            }
            return form;
          });
          // after deletion if there are no options left in the checkboxes array then we need to delete that whole group
          state.formEntries = state.formEntries.filter(form => {
            if (form.type === "checkbox") {
              if (form.checkboxes.length === 0) {
                return false;
              } else {
                return true;
              }
            } else {
              return true;
            }
          });
        }
      }
      // handling changes in radio
      else if (action.payload.inputType === "radio") {
        // checking if group is deleted
        if (action.payload.deleteType === "group") {
          state.formEntries = state.formEntries.filter(
            form => form.groupId !== action.payload.groupId
          );
        }
        // checking if option is being deleted
        else if (action.payload.deleteType === "option") {
          state.formEntries = state.formEntries.map(form => {
            if (form.groupId === action.payload.groupId) {
              form.choices = form.choices.filter(
                choiceEntry => choiceEntry.id !== action.payload.id
              );
            }
            return form;
          });
          // after deletion if there are no options left in the checkboxes array then we need to delete that whole group
          state.formEntries = state.formEntries.filter(form => {
            if (form.type === "radio") {
              if (form.choices.length === 0) {
                return false;
              } else {
                return true;
              }
            } else {
              return true;
            }
          });
        }
      }
    },
    // reseting the form
    resetForm(state) {
      for (const form of state.formEntries) {
        if (
          form.type === "text" ||
          form.type === "textarea" ||
          form.type === "number"
        ) {
          form.value = "";
        } else if (form.type === "checkbox") {
          for (const checkbox of form.checkboxes) {
            checkbox.checked = false;
          }
        } else if (form.type === "radio") {
          for (const choice of form.choices) {
            choice.selected = false;
          }
        } else if (form.type === "dropdown") {
          form.selection = "";
        }
      }
    },
    // user registration
    registerUser(state, action) {
      console.log(action.payload);
    },
    // register user in local database
    registerUserInBackend(state, action) {
      console.log(action.payload);
    },
    // login user and set userId and token
    loginUser(state, action) {
      console.log(action.payload);
      if (action.payload.idToken) {
        state.isLoggedIn = true;
        localStorage.setItem("token", action.payload.idToken);
        state.token = localStorage.getItem("token");
      }
    },
    // logout user and reset userId and token
    logoutUser(state, action) {
      state.isLoggedIn = false;
      localStorage.setItem("token", "");
      state.token = localStorage.setItem("token", "");
      state.currentUserId = localStorage.setItem("currentUserId", "");
      state.currentUserAllForms = [];
    },
    // set user id in global state
    setUserId(state, action) {
      console.log(action.payload);
      localStorage.setItem("currentUserId", action.payload._id);
      state.currentUserId = localStorage.getItem("currentUserId");
    },
    // add form to the databse
    addFormToTheDatabase(state, action) {
      console.log(action.payload);
    },
    // get all forms for current user
    getAllFormsForCurrentUser(state, action) {
      state.currentUserAllForms = action.payload;
    },
    // response collection
    setFormForResponseCollection(state, action) {
      state.formEntries = action.payload;
    },
  },
});

// exporting form actions to use the reducer functions
export const formEntriesActions = formEntriesSlice.actions;

// action creators
// register user
export const registerUser = credentials => async dispatch => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6MCrILR6Oz9A0El8za6cMxRTHQzosjI0`;

  const data = {
    email: credentials.email,
    password: credentials.password,
    returnSecureToken: true,
  };

  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // this try catch block is for sending registeration details to firebase
  // user will be registered in the local database if he is successfully registered in the firebase
  try {
    const result = await axios.post(url, data, headers);
    // if user is successfully registered there then he is added to the local database
    try {
      const result = await axios.post(
        "https://react-dynamic-form-builder.herokuapp.com/add-user",
        {
          name: credentials.name,
          email: credentials.email,
        }
      );
      return dispatch(formEntriesActions.registerUserInBackend(result.data));
      // if there was an error then this block will be executed
    } catch (error) {
      dispatch(formEntriesActions.registerUserInBackend(error.message));
    }
    // if he is successfully registered this statement is executed
    return dispatch(formEntriesActions.registerUser(result.data));
  } catch (error) {
    return dispatch(formEntriesActions.registerUser(error.message));
  }
};

// user login
export const loginUser = credentials => async dispatch => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6MCrILR6Oz9A0El8za6cMxRTHQzosjI0`;

  const data = {
    email: credentials.email,
    password: credentials.password,
    returnSecureToken: true,
  };

  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const result = await axios.post(url, data, headers);
    console.log(result.data);
    const email = result.data.email;
    try {
      const result = await axios.get(
        `https://react-dynamic-form-builder.herokuapp.com/get-user/${email}`
      );
      dispatch(formEntriesActions.setUserId(result.data));
    } catch (error) {
      dispatch(formEntriesActions.setUserId(error));
    }
    return dispatch(formEntriesActions.loginUser(result.data));
  } catch (error) {
    return dispatch(formEntriesActions.loginUser(error.message));
  }
};

// add a new form to the database
export const addFormToTheDatabase = (formEntries, userId) => async dispatch => {
  const data = {
    form: formEntries,
    userId: userId,
  };

  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const result = await axios.post(
      "https://react-dynamic-form-builder.herokuapp.com/add-form",
      data,
      headers
    );
    return dispatch(formEntriesActions.addFormToTheDatabase(result.data));
  } catch (error) {
    return dispatch(formEntriesActions.addFormToTheDatabase(error.message));
  }
};

// getting all the forms for currently login user
export const getAllFormsForCurrentUser = userId => async dispatch => {
  try {
    const result = await axios.get(
      `https://react-dynamic-form-builder.herokuapp.com/all-forms-for-user/${userId}`
    );
    return dispatch(formEntriesActions.getAllFormsForCurrentUser(result.data));
  } catch (error) {
    return dispatch(
      formEntriesActions.getAllFormsForCurrentUser(error.message)
    );
  }
};

// exporting form slice to the store
export default formEntriesSlice;
