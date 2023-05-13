import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Auth = () => {
    const [adminLog, setAdminLog] = useState("");
    const [userLog, setUserLog] = useState("");
    const Admin = () => {
        return(
            <div>
                <AdminSignUp />
                <AdminLogin />
            </div>
        );
    }
    const User = () => {
        return(
            <div>
                <UserSignUp />
                <UserLogin />
            </div>
        );
    }
    return(
        <div className="auth">
            <button className="button" onClick={()=>{
                setAdminLog(Admin);
                setUserLog("");            
            }}>Admin</button>
            {adminLog}
            <button className="button" onClick={()=>{
                setUserLog(User);
                setAdminLog("");
            }}>User</button>
            {userLog}
            <img src="http://www.tirumalesa.com/wp-content/uploads/2015/01/The-Amazing-Golden-Gopuram-Of-Tirumala-Temple.jpg" width="300px" height="300px" />
        </div>
    );
}

const AdminSignUp = () => {
    const [mail, setMail] = useState("");
    const [id, setId] = useState("");
    const [pass, setPass] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/adminsignup",{
                username: mail,
                adminid: id,
                password: pass
            });
            alert(response.data.message);
        }catch(err) {
            console.log(err);
        }
    }
    return(
        <div>
            <AdminForm mail={mail} setMail={setMail} id={id} setId={setId} pass={pass} setPass={setPass} onSubmit={onSubmit} action={"Sign up"}/>
        </div>
    );
}

const UserSignUp = () => {
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/usersignup",{
                username: mail,
                password: pass
            });
            alert(response.data.message);
        }catch(err) {
            console.log(err);
        }
    }
    return(
        <div>
            <UserForm mail={mail} setMail={setMail} pass={pass} setPass={setPass} onSubmit={onSubmit} action={"Sign up"}/>
        </div>
    );
}

const AdminLogin = () => {
    const [mail, setMail] = useState("");
    const [id, setId] = useState("");
    const [pass, setPass] = useState("");
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/adminlogin", {
                username: mail,
                adminid: id,
                password: pass
            });
            alert(response.data.message);
            if (response.data.message==="Login successful!"){
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userID);
                navigate("/adminhome");
            }
        } catch(err) {
            console.log(err);
        }
    }
    return(
        <div>
            <AdminForm mail={mail} setMail={setMail} id={id} setId={setId} pass={pass} setPass={setPass} onSubmit={onSubmit} action={"Login"}/>
        </div>
    );
}

const UserLogin = () => {
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/auth/userlogin", {
                username: mail,
                password: pass
            });
            alert(response.data.message);
            if (response.data.message==="Login successful!"){
                setCookies("access_token", response.data.token);
                window.localStorage.setItem("userID", response.data.userID);
                navigate("/home");
            }
        } catch(err) {
            console.log(err);
        }
    }
    return(
        <div>
            <UserForm mail={mail} setMail={setMail} pass={pass} setPass={setPass} onSubmit={onSubmit} action={"Login"} />
        </div>
    );
}

const AdminForm = ({mail, setMail, id, setId, pass, setPass, onSubmit, action}) => {
    return(
        <>
            <h1 className="head">{action}</h1>
            <hr></hr>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Mail ID" value={mail} onChange={(e) => setMail(e.target.value)}/>
                <input type="text" placeholder="Admin ID" value={id} onChange={(e) => setId(e.target.value)}/>
                <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)}/>
                <button  type="submit">{action}</button>
            </form>
        </>
    );
}

const UserForm = ({mail, setMail, pass, setPass, onSubmit, action}) => {
    return(
        <>
            <h1 className="head">{action}</h1>
            <hr></hr>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Mail ID" value={mail} onChange={(e) => setMail(e.target.value)}/>
                <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)}/>
                <button  type="submit">{action}</button>
            </form>
        </>
    );
}

export default Auth;