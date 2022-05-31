import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { allUsersRoute } from '../utils/APIRoutes';


export default function Chat() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    

    useEffect(()=>{
        var fnc3 = async function(){
            if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
                navigate("/login");
            }
            else{
                setCurrentUser(await JSON.parse(localStorage.getItem("chatapp-user")));
            }
        };
        fnc3();
    },[])

    useEffect(()=>{
        var fnc2 = async function(){
            if(currentUser){
                if(currentUser.isAvatarImageSet){
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data)
                }
                else{
                    navigate("/setAvatar");
                }
            }
        };
        fnc2();
    },[currentUser])
    
    
    
    return (
        <>
            <Container>
                <div className="container">
                </div>
            </Container>
        </>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #07575B;
    .container {
        height: 85vh;
        width: 85vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-columns: 35% 65%;
        }
    }
`;
