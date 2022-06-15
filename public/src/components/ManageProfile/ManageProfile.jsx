import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { allUsersRoute, localUser } from '../../utils/APIRoutes';
import LoggedInUser from '../ProfileHome/LoggedInUser';
import './ManageProfile.css';
import PersonalData from './PersonalData';
import ManageBio from './ManageBio';
import Questionnaire from '../Questionnaire/Questionnaire';


export default function ManageProfile(){
    const [isPersonalData, setIsPersonalData] = useState(false);
    const [isBio, setIsBio] = useState(false);
   

    const Personal_data = event => {
        setIsPersonalData(current => !current);
        setIsBio(current => false);
       
    };

    const Bio_data = event => {
        setIsBio(current => !current);
        setIsPersonalData(current => false);
       
    };
    return(
        <>
        <div className='manageProfile'>
        <LoggedInUser />
        <button className='profileBtn1' onClick={Personal_data}>Personal Data</button>
        <button className='profileBtn2' onClick={Bio_data}>Bio</button>
        {isPersonalData && <PersonalData />}
        {isBio && <ManageBio />}
        </div>
        </>
    )

}