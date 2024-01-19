import React from 'react';
import {createRoot} from 'react-dom/client';
import './styles/normalize.css';
import './styles/main.css';
import App from './app/App';
import { Provider } from "react-redux";
import store from "./app/store";
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App /> 
    </Provider>
  </React.StrictMode>
);

// If you want to measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
