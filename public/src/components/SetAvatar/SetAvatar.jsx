import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {Buffer} from "buffer";
import { useNavigate, Link, useLinkClickHandler } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../assets/loader.gif";
import axios from 'axios';
import { SetAvatarRouter, localUser } from "../../utils/APIRoutes";
let stringData;

export default function SetAvatar() {
    const navigate = useNavigate();
    
    //^ is multi-avatar api, passing any random numbers and will generate random avatars.
    const api = `https://api.multiavatar.com/4645646`;
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(()=>{
        var fnc1 = async function(){
            if(!localStorage.getItem("chatapp-user")){
                navigate("/");
            }
        };
        fnc1();
    },[]);

    const setProfilePicture = async()=>{
        if(selectedAvatar===undefined){
            toast.error("U need to select profile avatar",toastOptions);
        }
        else{
            const savedToken = localStorage.getItem("chatapp-user");
        
            const userDetails = axios.post(localUser, {
                savedToken
            }); 
            stringData = ((await userDetails).data);
            const {data} = await axios.post(`${SetAvatarRouter}/${stringData.username}`,{image: avatars[selectedAvatar],});
            if(data.isSet){
                stringData.isAvatarImageSet = true;
                stringData.avatarImage = data.image;
                //localStorage.setItem("chatapp-user",JSON.stringify(user));
                navigate('/questionnaire');
            }
            else{
                toast.error("Error setting avatar. Please try again", toastOptions)
            }
        }
    };

    useEffect(() => {
        var fnc = async function(){
            const data = [];
            for (let i = 0; i < 4; i++) {
                //^ After api randomly adding number for new profile image
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        };
        fnc();
    }, []);

    return (
        <>
        {
            isLoading? <Container>
                <img src={Loader} alt="loader" className="loader"/>
            </Container>:(
                <Container>
                <div className="title-container">
                    <h1>
                        Pick your profile avatar
                    </h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar,index)=>{
                            return (
                                <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                    <img
                                        src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" key={avatar} onClick={() => setSelectedAvatar(index)}
                                        />
                                </div>
                            );
                        }) 
                    }
                </div>
                <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Image</button>
            </Container>
            )
        }
            <ToastContainer/>
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: white;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
        color: white;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;
        .avatar {
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img {
                height: 6rem;
                transition: 0.5s ease-in-out;
            }
        }
        .selected {
            border: 0.4rem solid #4e0eff;
        }
        }
        .submit-btn {
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
            background-color: #4e0eff;
        }
    }
`;
