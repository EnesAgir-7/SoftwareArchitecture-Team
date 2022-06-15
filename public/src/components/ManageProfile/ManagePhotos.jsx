import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { allUsersRoute, localUser } from '../../utils/APIRoutes';
import LoggedInUser from '../ProfileHome/LoggedInUser';
import './ManagePhotos.css';

export default function ManagePhotos(){

    return(
        <div className='mPhotos'>
        <button className= "PhotosBtn" type="submit">Choose File</button> 
        <button className='PhotosSubmit' type='submit'>Upload</button>
        <div className='uploadedPhotos'>
            <label>Uploaded Photos</label>
        </div>
        </div>
    )
        
}
