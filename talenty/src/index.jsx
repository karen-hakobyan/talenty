import React from "react";
import {createTheme, ThemeProvider} from "@mui/material";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {store} from "./store/store";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import './fonts/index.css'

const rootElement = document.getElementById("root");
const theme = createTheme({
    palette: {
        primary: {
            main: '#8C0DF0'
        }
    }
})
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider {...{theme}}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    rootElement
);
