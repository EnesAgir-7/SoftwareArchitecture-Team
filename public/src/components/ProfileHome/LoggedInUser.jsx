import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { allUsersRoute, localUser } from '../../utils/APIRoutes';
import './ProfileHome.css';
let stringData;
let isLoaded = false;


export default function LoggedInUser(){
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);

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
                isLoaded = true;
            }
            
        };
        fnc3();
    },[])
    useEffect(()=>{
        var fnc4 = async function(){
            //! ?contactlara ulasamiyorum neden anlamadim 
            //console.log(contacts);
            if(currentUser){
                setCurrentUserImage(currentUser.avatarImage);
            }
        };
        fnc4();
    },[currentUser]);

    return(
        <div className='LoggedInUser'>
            <div className='user'>
            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" style={{height:"5rem", marginRight:"80rem", marginTop:"-10rem"}} />
            {isLoaded?(<h2 style={{width:"10rem", marginLeft:"4.5rem", marginTop:"-3rem"}}>{stringData.firstName} {stringData.lastName}</h2>):(<h1>Not welcome</h1>)}
           
            </div>
            
        </div>
        

        
    )
}

