import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import Logo from "../assets/logo.svg";
import {ToastContainer, toast} from "react-toastify";

function Login() {
    return (
        <>
            <FormContainer>
                <from action="" onSubmit={(event)=>handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="logo"/>
                        <h1>ChatApp</h1>
                    </div>
                    <input type="text" placeholder="Username" name="username" onchange={(e)=>handleChange(e)}/>
                    <input type="password" placeholder="Password" name="password" onchange={(e)=>handleChange(e)} />
                    <button type="submit">Login</button>
                    <span>
                        Don't have an account? <Link to="/register">Create One.</Link>
                    </span>
                </from>
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
    background-color: #07575B;
    .brand {
        display: flex;
        align-item:center;
        gap: 1 rem;
        justify-content:center;
        img{
            height:5rem;
        }
        h1{
            color: #C4DFE6;
            text-transform:uppercase;
        }
    }
    form{
        display:flex;
        flex-direction:column;
        gap:2rem;
        back-ground-color:  #003B46;
        border-radius:2rem;
        padding:5rem;
    }
    input{
        padding:1rem;
        color: black;
        back-ground-color:transparent;
        border:0.1rem solid #97D5E0;
        border-radius:0.4rem;
        width:100%;
        font-size:1rem;
        &:focus{
            border:0.1rem solid #C4DFE6;
            outline:none;
        }
    }
    button{
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border:none;
        font-weight: bold;
        cursor: pointer;
        border-radius:0.4rem;
        font-size: 1rem;
        text-transform:uppercase;
        &:hover{
            background-color:#4e0eff;
        }
    }
    span{
        color:white;
        text-transform:uppercase;
        a{
            color:#4e0eff;
            text-decoration:none;
            font-weight:bold;
        }
    }
`

export default Login