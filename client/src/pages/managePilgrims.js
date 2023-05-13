import { useState } from "react";
import axios from "axios";
import "./pilgrims.css";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        age: "",
        gender: "",
        aadhar: "",
        phno: "",
        address: "",
    });

    const [showRegister, setShowRegister] = useState(false)
    
    const handleSubmit = async (e) => {
        try {
            await axios.post("http://localhost:3001/pilgrims/userpilgrims", user);
            alert("Registered successfully!");
        } catch (err) {
            console.log(err);
        }
    };
    

    return(
        <div className="pilgrim">
            <button onClick={() => setShowRegister(!showRegister)}>Register for dharshan</button>
            {showRegister?(
            <div className="reg">
                <form >
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e)=>setUser({...user, name:e.target.value})}
                        value={user.name}

                    />
                    <input
                        type="number"
                        placeholder="Age"
                        name="age"
                        value={user.age}
                        onChange={(e)=>setUser({...user, age:e.target.value})}

                    />
                    <input
                        type="text"
                        placeholder="Gender"
                        name="gender"
                        value={user.gender}
                        onChange={(e)=>setUser({...user, gender:e.target.value})}

                    />
                    <input
                        type="number"
                        placeholder="Aadhar no"
                        name="aadhar"
                        value={user.aadhar}
                        onChange={(e)=>setUser({...user, aadhar:e.target.value})}

                    />
                    <input
                        type="number"
                        placeholder="Contact no"
                        name="phno"
                        value={user.phno}
                        onChange={(e)=>setUser({...user, phno:e.target.value})}

                    />
                    <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={user.address}
                        onChange={(e)=>setUser({...user, address:e.target.value})}

                    />
                    <button type="submit" onClick={(e)=>handleSubmit(e)}>Register</button>
                </form>
            </div>
        ): null}
        </div>
    );
}

const ManagePilgrims = () => {
     const [user, setUser] = useState({
        name: "",
        age: "",
        gender: "",
        aadhar: "",
        phno: "",
        address: "",
    });

    const [showRegister, setShowRegister] = useState(false);
    const [showView, setShowView] = useState(false);
    
    const handleSubmit = async (e) => {
        try {
            await axios.post("http://localhost:3001/pilgrims/adminpilgrims", user);
            alert("Registered successfully!");
        } catch (err) {
            console.log(err);
        }
    };
    

    return(
        <div className="pilgrim">
            <button onClick={() => setShowRegister(!showRegister)}>Register for dharshan</button>
            {showRegister?(
            <div className="reg">
                <form >
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={(e)=>setUser({...user, name:e.target.value})}
                        value={user.name}

                    />
                    <input
                        type="number"
                        placeholder="Age"
                        name="age"
                        value={user.age}
                        onChange={(e)=>setUser({...user, age:e.target.value})}

                    />
                    <input
                        type="text"
                        placeholder="Gender"
                        name="gender"
                        value={user.gender}
                        onChange={(e)=>setUser({...user, gender:e.target.value})}

                    />
                    <input
                        type="number"
                        placeholder="Aadhar no"
                        name="aadhar"
                        value={user.aadhar}
                        onChange={(e)=>setUser({...user, aadhar:e.target.value})}

                    />
                    <input
                        type="number"
                        placeholder="Contact no"
                        name="phno"
                        value={user.phno}
                        onChange={(e)=>setUser({...user, phno:e.target.value})}

                    />
                    <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={user.address}
                        onChange={(e)=>setUser({...user, address:e.target.value})}

                    />
                    <button type="submit" onClick={(e)=>handleSubmit(e)}>Register</button>
                </form>
            </div>
        ): null}
        <button onClick={()=>{setShowView(!showView)}}>My registrations</button>
        {showView? <ViewRegistration /> : null }
        </div>
    );
}

const ViewRegistration = () => {
        
    const [pilgrims, setPilgrims] = useState([]);
    
    const [newName, setNewName] = useState("");

    axios.get("http://localhost:3001/pilgrims/adminpilgrims")
    .then((response) => {
    setPilgrims(response.data);
    })
    .catch((err) => {
    console.log(err);
    });
    const updateName = (id) => {
        console.log(newName);
        axios.put("http://localhost:3001/pilgrims/adminpilgrims", {id: id, newName: newName})
        .then((response)=>console.log(response.data))
        .catch((error)=>console.log(error.message))
    }
    const del = (id) => {
        axios.delete(`http://localhost:3001/pilgrims/adminpilgrims/${id}`)
        .then((response)=>console.log(response.data))
        .catch((error)=>console.log(error.message))
    }
    return(
        <>
            {pilgrims.map((pilgrim) => (
            <div className="view" key={pilgrim._id}>
            <p>Name: {pilgrim.name}</p>
            <p>Age: {pilgrim.age}</p>
            <p>Gender: {pilgrim.gender}</p>
            <p>Aadhar No: {pilgrim.aadhar}</p>
            <p>Phone No: {pilgrim.phno}</p>
            <p>Address: {pilgrim.address}</p>
            <input type="text" placeholder="Change name" onChange={(e)=>setNewName(e.target.value)}/>
            <button onClick={()=>updateName(pilgrim._id)}>Update</button>
            <button onClick={() => del(pilgrim._id)}>Delete</button>
            </div>
            ))}
        </>
    );
    
};

export { Register, ManagePilgrims };