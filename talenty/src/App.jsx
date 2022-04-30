import React from "react";
import Dialogs from "./components/dialogs";
import Routes from "./routes";
import {useAuthInitialEffects} from "./hooks/authHook";

function App() {
    useAuthInitialEffects()
    return (
        <>
            <Dialogs/>
            <Routes/>
        </>
    );
}

export default App;
