import { useState } from "react";
import "./App.scss";
import Map from "./pages/map/index";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="App">
            <div className="topBar">
                <h1>Restaurant Finder</h1>
            </div>
            <div className="main">
                <Map />
            </div>
        </div>
    );
}

export default App;
