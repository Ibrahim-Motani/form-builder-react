// react imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// react router dom imports
import { BrowserRouter } from 'react-router-dom';
// importing Provider component to wrap the app
import { Provider } from 'react-redux';
// importing store from the store file
import store from './store/store';

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

