import './custom.scss'
import { Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
