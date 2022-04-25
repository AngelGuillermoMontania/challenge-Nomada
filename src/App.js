import "./App.css";
import { Routes, Route } from "react-router-dom";
import Search from "./Components/Search/Search";
import Result from "./Components/Result/Result";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Search />} />
                <Route path="/result" element={<Result />} />
            </Routes>
        </div>
    );
}

export default App;
