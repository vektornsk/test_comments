import React from "react";
import {Provider} from "react-redux";
import Comments from "./Comments";
import {store} from "./store";
import "./App.css";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <div className="container">
                    <Comments />
                </div>
            </div>
        </Provider>
    );
}

export default React.memo(App);
