import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome({currentUser}) {
    const [userName, setUserName] = useState("");

    useEffect(()=>{
        var fnc5 = async function(){
            
        };
        fnc5();
    },[]);

    return (
        <Container>
        <img src={Robot} alt="" />
        <h1>
            Welcome, <span>{currentUser.userName}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
        height: 25rem;
    }
    span {
        color: #4e0eff;
    }
`;