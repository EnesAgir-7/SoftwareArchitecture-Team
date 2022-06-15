import React,{useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { allUsersRoute, localUser } from '../../utils/APIRoutes';
import './ProfileHome.css';
import ManageProfile from '../ManageProfile/ManageProfile';
import Requests from '../Requests/Requests';
import Events from '../Events/Events';
import Chat from '../../components/Chat/Chat';
import Logout from '../../components/Logout/Logout';
import SettingsLinks from '../../components/ProfileHome/SettingsLinks';

let stringData;
let isLoaded = false;


export default function ProfileHome(){
    const buttonRef = useRef(null);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);

    const [isSettingsLinks, setIsSettingsLinks] = useState(false);
    const [isYourConnections, setIsYourConnections] = useState(false);


    useEffect(()=>{
        var fnc3 = async function(){
            buttonRef.current.click();
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
                setCurrentUserImage(stringData.avatarImage);
            }
            
        };
        fnc3();
    },[])

    const setting_links_change = event => {
        setIsSettingsLinks(current => true);
        setIsYourConnections(current => false);
    };

    const your_connections_change = event => {
        setIsSettingsLinks(current => false);
        setIsYourConnections(current => true);
    };


    return(
        
        <div className='profileHome'>
            <Logout />
            <div className='profile'>
            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" style={{height:"3.5rem", marginRight:"15rem", marginTop:"10px"}} />
            {isLoaded?(<h2 style={{marginLeft:"20px", marginTop:"-2.5rem"}}>{stringData.firstName} {stringData.lastName}</h2>):(<h1>Not welcome</h1>)}
            <div className='profileButtons'>
                <button className='settings' ref={buttonRef} onClick={setting_links_change}>Settings</button>
                
                <button className='addConnection' onClick={your_connections_change}>Your Connections</button>
                {isYourConnections && <Chat />}
                {isSettingsLinks && <SettingsLinks />}
            </div>
        </div>
        </div>
        

        
    )
}

