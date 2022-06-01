import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { loginRoute } from "../utils/APIRoutes";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
                localStorage.setItem('chatapp-user',JSON.stringify(data.user))
                //& user to local storage and navigate to the chat container
                navigate("/");
            }
        }
    };

    const handleValidation = ()=>{
        const {password,confirmPassword, username, email, address}= values;
        console.log("in validation",toast);
        if(username.length===""){
            toast.error(
                "Email and password is required.",toastOptions
            );
            return false;
        }
        else if (password ==="") {
            toast.error(
                "Email and password is required.",toastOptions
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
        <FormContainer>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="Logo" />
                    <h1>ChatApp</h1>
                </div>
                <input type="text" placeholder="Username" name="username" min="3" onChange={(e) => handleChange(e)}/>
                <input type="password" placeholder="password" name="password" onChange={(e) => handleChange(e)}/>
                <button type="submit">Login</button>
                <span>
                    Create new account<Link to="/register">Register.</Link>
                </span>
            </form>
        </FormContainer>
        <ToastContainer />
        </>
    )
}

const FormContainer = styled.div`
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
        border-radius: 2rem;
        padding: 3rem 5rem;
    }
    input {
        background-color: #97D5E0;
        padding: 1rem;
        border: 0.1rem solid #07575B;
        border-radius: 0.4rem;
        color: black;
        width: 100%;
        font-size: 1rem;
        &:focus {
            border: 0.1rem solid #C4DFE6;
            outline: none;
        }
    }
    button {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
            background-color: green;
        }
    }
    span {
        color: white;
        text-transform: uppercase;
        a {
            color: #4e0eff;
            text-decoration: none;
            font-weight: bold;
        }
    }
`;