import "normalize.css";
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MoviesPage from "./pages/MoviesPage";
import DirectorsPage from "./pages/DirectorsPage";
import Toolbar from "./components/Toolbar";

function App() {
    return (
        <>
            <BrowserRouter>
                <Toolbar/>
                <Routes>
                    <Route path="/" element={<MoviesPage />} />
                    <Route path="/directors" element={<DirectorsPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
