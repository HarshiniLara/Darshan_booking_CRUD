import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./pages/auth";
import { UserHome, AdminHome } from "./pages/home";
import { Register, ManagePilgrims } from "./pages/managePilgrims";

function App() {
    return(
        <div className="App">
            <Router>
                <h2>HolyQueue</h2>
                <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/adminhome" element={<AdminHome />} />
                    <Route path="/managepilgrims" element={<ManagePilgrims />} />
                    <Route path="/home" element={<UserHome />} />
                    <Route path="/registration" element={<Register />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;