import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { allUsersRoute, localUser } from '../../utils/APIRoutes';
import LoggedInUser from '../ProfileHome/LoggedInUser';
import './ManageInterests.css';

export default function ManageInterests(){

    return(
        <div className='mBio'>
        <label style={{marginRight:"48.5rem", marginBottom:"10px", fontSize:"large", textAlign:"-webkit-center"}}>About</label>
        <br></br>
        <input className='aboutInput' type="text" placeholder='About'/>
        <br></br>
        <button className= "BioBtn" type="submit">Save</button> 
        </div>
    )
        
}
