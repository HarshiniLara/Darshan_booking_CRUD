import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const AdminNavBar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/");
    }
    return(
        <div className="adminnav">
            <Link to="/adminhome">HOME</Link>
            <Link to="/managepilgrims">PILGRIMS</Link>
            <Link to="/managepilgrimsbook">BOOK</Link>
            <Link to="/managepilgrimsdonate">DONATE</Link>
            {!cookies.access_token ? (<Link to="/">Login</Link>): (<button onClick={()=>logout()}>Logout</button>)}
            
        </div>
    );
}

const UserNavBar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/");
    }
    return(
        <div className="usernav">
            <Link to="/home">HOME</Link>
            <Link to="/registration">REGISTRATION</Link>
            {!cookies.access_token ? (<Link to="/auth">Login</Link>): (<button onClick={()=>logout()}>Logout</button>)}
        </div>
    );
}

export { AdminNavBar, UserNavBar };