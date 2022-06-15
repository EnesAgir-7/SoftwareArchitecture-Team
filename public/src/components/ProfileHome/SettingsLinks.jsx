import React,{useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { allUsersRoute, localUser } from '../../utils/APIRoutes';
import './ProfileHome.css';
import ManageProfile from '../ManageProfile/ManageProfile';
import Requests from '../Requests/Requests';
import Events from '../Events/Events';
import FriendSuggestion from '../Chat/FriendSuggestion';

export default function SettingsLinks(){
    const buttonRef = useRef(null);
    const [isAddConnection, setIsAddConnection] = useState(false);
    const [isManageProfile, setIsManageProfile] = useState(false);
    const [isEvents, setIsEvents] = useState(false);



    const add_connection_change = event => {
        setIsAddConnection(current => !current);
        setIsManageProfile(current => false);
        setIsEvents(current => false);
    };
    
    const manage_profile_change = event => {
        setIsAddConnection(current => false);
        setIsManageProfile(current => !current);
        setIsEvents(current => false);
    };

    const events_change = event => {
        setIsAddConnection(current => false);
        setIsManageProfile(current => false);
        setIsEvents(current => !current);
    }


    return(
            <div className='settingsLinks'> 
            <button className='settingBtn1' ref={buttonRef} onClick={add_connection_change}>Add Connection</button>      
            <button className='settingBtn3'onClick={manage_profile_change}>Manage Profile</button>
            <button className='settingBtn4' onClick={events_change}>Events</button>
                {isAddConnection && <FriendSuggestion />}
                {isManageProfile && <ManageProfile />}
                {isEvents && <Events />}
        </div>
        

        
    )
}

