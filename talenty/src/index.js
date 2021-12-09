import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./fonts.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./components/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
