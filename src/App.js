import "./custom.scss";
import { Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Search from "./routes/Search";
import { DishesContextProvider } from "./components/DishesContext";

function App() {
    return (
        <DishesContextProvider>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </DishesContextProvider>
    );
}

export default App;
