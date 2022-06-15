import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { allUsersRoute, localUser, addBioRoute } from '../../utils/APIRoutes';
import LoggedInUser from '../ProfileHome/LoggedInUser';
import './ManageBio.css';
let stringData;
let isLoaded = false;

export default function ManageBio(){
    const navigate = useNavigate();
    const [isBio, setIsBio] = useState("");
    const [currentUser, setCurrentUser] = useState(undefined);

    const handleSubmit = async(event)=>{
        event.preventDefault();
        const username = stringData.username;
        const {data} = await axios.post(addBioRoute,{username,isBio});
        if(data.status === true){
            localStorage.setItem('chatapp-user',data.user.token);
            //& user to local storage and navigate to the chat container
            alert("Successfully Updated!!")
        }
    }

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
                console.log(stringData.bio);
                setCurrentUser (stringData);
                isLoaded = true;
            }
            
        };
        fnc3();
    },[])

    const handleChange = (event) => {
       setIsBio(event.target.value);
    };

    return(
        <form onSubmit={(event)=>handleSubmit(event)}>
        <div className='mBio'>
        <label style={{marginRight:"48.5rem", marginBottom:"10px", fontSize:"large", textAlign:"-webkit-center"}}>About</label>
        <br></br>
        <input className='aboutInput' type="text" name="isBio" placeholder='About' defaultValue={stringData?.bio} onChange={(e) => handleChange(e)}/>
        <br></br>
        <button className= "BioBtn" type="submit">Save</button> 
        </div>
        </form>
    )
        
}
