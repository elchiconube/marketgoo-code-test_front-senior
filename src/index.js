import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import Players from "./containers/Players";
import AppLayout from "./components/AppLayout";

import "./index.css";

const App = () => (
    <Provider store={store}>
        <AppLayout>
            <Players />
        </AppLayout>
    </Provider>
);

const container = document.getElementById("app");
ReactDOM.render(<App />, container);
