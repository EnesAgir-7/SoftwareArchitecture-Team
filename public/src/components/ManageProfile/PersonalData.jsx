import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { allUsersRoute, localUser } from '../../utils/APIRoutes';
import LoggedInUser from '../ProfileHome/LoggedInUser';
import './PersonalData.css';
import { registerRoute,personalDataRoute } from "../../utils/APIRoutes";

let stringData;
let isLoaded = false;

export default function PersonalData(){
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
   

    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        city: "",
    });

    const handleSubmit = async(event)=>{
        event.preventDefault();
            const { firstName, lastName,email,city}=values;
            const username = stringData.username;
            // console.log("in validation",registerRoute);
            const {data} = await axios.put(personalDataRoute,{
                username, firstName, lastName, email, city,
            });
            if(data.reply === "Updated successfully"){
                window.location.replace("http://localhost:3000/ProfileHome");
            }
    };

    useEffect(()=>{
        var fnc3 = async function(){
            if (!localStorage.getItem("chatapp-user")) {
                navigate("/login");
            }
            else{
                const savedToken = localStorage.getItem("chatapp-user");
                const userDetails = axios.post(localUser, {
                    savedToken
                }); 
                stringData = ((await userDetails).data);
                console.log(stringData.firstName);
                setCurrentUser (stringData);
                console.log(stringData);
                isLoaded = true;
            }
            
        };
        fnc3();
    },[])

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return(
        <div className='PersonalData'>
        <form onSubmit={(event)=>handleSubmit(event)}>
                <div className='first'>
                <label className='PD_label' style={{marginLeft:"1rem"}}>First Name</label>
                <input className="registerInput" type="text" placeholder="First Name" name="firstName" defaultValue={stringData?.firstName} onChange={(e) => handleChange(e)}/>
                <br></br>
                <label className='PD_label' style={{marginLeft:"1rem", marginTop:"1rem"}}>Last Name</label>
                <input className="registerInput" type="text" placeholder="Last Name" name="lastName" defaultValue={stringData?.lastName} onChange={(e) => handleChange(e)}/>
                <br></br>
                <label className='PD_label' style={{marginLeft:"-0.5rem", marginTop:"1rem"}}>Username</label>
                <input className="registerInput" type="text" placeholder="Username" name="username" value={stringData?.username} onChange={(e) => handleChange(e)}/>
                <br></br>
                </div>
                <div className='second'>
                <label className='PD_label' style={{marginLeft:"-6.5rem"}}>City</label>
                <input className="registerInput" type="text" placeholder="City" name="city" defaultValue={stringData?.city} onChange={(e) => handleChange(e)}/>
                <br></br>
                <label className='PD_label' style={{marginLeft:"-4.5rem", marginTop:"1rem"}}>Email ID</label>
                <input className="registerInput" type="email" placeholder="Email" name="email" defaultValue={stringData?.email} onChange={(e) => handleChange(e)}/>
                <br></br>
                <label className='PD_label' style={{marginLeft:"-4.2rem", marginTop:"1rem"}}>Password</label>
                <input className="registerInput" type="password" placeholder="password" name="password" defaultValue={stringData?.password} onChange={(e) => handleChange(e)}/>
                <br></br>
                </div>
                <button className= "personalDataBtn" type="submit">Save</button> 
                </form>   
            </div>
    )
}
