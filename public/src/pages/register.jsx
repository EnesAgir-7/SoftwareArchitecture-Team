import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

function register() {
    const handleSubmit = (event)=>{
        event.preventDefault();
        alert("form")
    }
    const handleChange = (event)=>{
        
    }
    return (
        <FormContainer>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="Logo" />
                    <h1>ChatApp</h1>
                </div>
                <input type="text" placeholder="Username" name="username" onChange={(e) => handleChange(e)}/>
                <input type="email" placeholder="Email" name="email" onChange={(e) => handleChange(e)}/>
                <input type="password" placeholder="password" name="password" onChange={(e) => handleChange(e)}/>
                <input type="password" placeholder="confirm password" name="confirmPassword" onChange={(e) => handleChange(e)}/>
                <input type="address" placeholder="Address" name="address" onChange={(e) => handleChange(e)}/>
                <button type="submit">Create User</button>
                <span>
                    Already have an account ? <Link to="/login">Login.</Link>
                </span>
            </form>
        </FormContainer>
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

export default register