import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginRoute } from "../../utils/APIRoutes";
import {ToastContainer, toast} from "react-toastify";
import LoginLogo from './LoginLogo.png';
import Main from './Main.jpg';
import './login.css'


import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });
    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover: true,
        theme:"dark",
    }

    //^ this is running olny first time the component is loaded
    useEffect(()=>{
        if(localStorage.getItem('chatapp-user')){
            navigate('/')
        }
    },[]);

    const handleSubmit = async(event)=>{
        event.preventDefault();
        if(handleValidation()){
            // console.log("in validation",loginRoute);
            const {password, username}=values;
            const {data} = await axios.post(loginRoute,{
                username,password,
            });
            if(data.status === false){
                toast.error(data.message, toastOptions);
            }
            if(data.status === true){
                console.log(data.user.token);
                localStorage.setItem('chatapp-user',data.user.token)
                //& user to local storage and navigate to the profile
                navigate("/profileHome");
            }
        }
    };

    const handleValidation = ()=>{
        const {password,username}= values;
        console.log("in validation",toast);
        if(username.length===""){
            toast.error(
                "Username can not be empty",toastOptions
            );
            return false;
        }
        else if (password ==="") {
            toast.error(
                "Password can not be empty",toastOptions
            );
            return false;
        }
        
        return true;
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    return (
          <>
    
       <div className="content">
           <div className='tagline'>Connection without conversation is impossible!</div>
            <img className="BackgroundImage" src={Main} />
            <div className="login">
            <form onSubmit={(event)=>handleSubmit(event)}>
                <img class="LoginLogo" src={LoginLogo} />
                <label className="username">Username</label>
                <input className="loginInput" type="text" placeholder="Username" name="username" min="3" onChange={(e) => handleChange(e)}/>
                <br></br>
                <label className="password">Password</label>
                <input className="loginInput" type="password" placeholder="Password" name="password" onChange={(e) => handleChange(e)}/><br></br>
                <Link to="/forgotPassword" style={{marginRight:"26%", marginTop:"30%", fontSize:"14px"}}>Forgot Password?</Link>
                <br></br>
                <button type="submit" className="loginBtn">Login</button>
                <span>
                    Don't have an account?<Link to="/register">Create Account</Link>
                </span>
            </form>
            
            </div>

        </div>
    
        </>

    )
}

/*const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #07575B;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
            height: 5rem;
        }
        h1 {
            color: #C4DFE6;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #003B46;
    
`; */