import React from 'react'
import { logoutRoute } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import './Logout.css';

export default function Logout() {
    const navigate = useNavigate();
    
    const handleClick = async()=>{
        localStorage.clear();
        navigate("/login");
    }
    return (
        <button className="logoutButton" onClick={handleClick}>
            <BiPowerOff/>
        </button>
    )
}
