import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//^ axios for api calling && we can call fetch api by script
import axios from 'axios';
import { eventsRoute } from "../../utils/APIRoutes";
import './Events.css';


function CreateEvent() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        eventName: "",
        description: "",
        date: "",
        time: "",
        location: "",
        contact: "",
        isGoing: ""
    });

    //^ this is running olny first time the component is loaded
    // useEffect(()=>{
    //     if(localStorage.getItem('chatapp-user')){
    //         //navigate('/')
    //     }
    // },[]);

    const handleSubmit = async(event)=>{
        event.preventDefault();
            const {eventName, description, date, time, location, contact, isGoing}=values;
            // console.log("in validation",registerRoute);
            const {data} = await axios.post(eventsRoute,{
                eventName, description, date, time, location, contact, isGoing
            });
            if(data.status === true){
                localStorage.setItem('chatapp-user',data.user.token);
                //& user to local storage and navigate to the chat container
            }
    };


    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    
    return (
        <>
            <div className="createEvent">
                <h3>Create Event</h3>
            <form onSubmit={(event)=>handleSubmit(event)}>
                <label>Event Name</label>
                <input className="EventInput" type="text" placeholder="Event Name" name="eventName" onChange={(e) => handleChange(e)}/>
                <br></br>
                <label>Description</label>
                <input className="EventInput" type="text" placeholder="Description" name="description" onChange={(e) => handleChange(e)}/>
                <br></br>
                <label>Date</label>
                <input className="EventInput" type="text" placeholder="Date" name="date" onChange={(e) => handleChange(e)}/>
                <br></br>
                <label>Time</label>
                <input className="EventInput" type="text" placeholder="Time" name="time" onChange={(e) => handleChange(e)}/>
                <br></br>
                <label>Location</label>
                <input className="EventInput" type="text" placeholder="Location" name="location" onChange={(e) => handleChange(e)}/>
                <br></br>
                <label>Contact</label>
                <input className="EventInput" type="text" placeholder="Contact" name="contact" onChange={(e) => handleChange(e)}/>
                <br></br>
                <label>Are you Going?</label>
                <input className="EventInput" type="text" placeholder="Yes or No" name="isGoing?" onChange={(e) => handleChange(e)}/>
                <br></br>
                <button type="submit" className="eventBtn">Create</button>    
            </form>
            </div>     
        <ToastContainer />
        </>
    )
}


export default CreateEvent;