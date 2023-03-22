import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import store from "./redux/store";

export const server = "https://nodejs-movieapp.onrender.com/api";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
