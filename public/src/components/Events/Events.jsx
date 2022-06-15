import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CreateEvent from './CreateEvent';
import EventList from "./EventList";
import './Events.css';


function Events() {
    const [isEventList, setIsEventList] = useState(false);
    const [isCreateEvent, setIsCreateEvent] = useState(false);


    const event_list = event => {
        setIsEventList(current => true);
        setIsCreateEvent(current => false);
    };

    const event_form = event => {
        setIsEventList(current => false);
        setIsCreateEvent(current => true);
    };

    return (
        <>
            <div className="events">
               <button className="eventBtn1" onClick={event_list}>Events</button>
               <button className="eventBtn2" onClick={event_form}>Create Event</button>
               {isEventList && <EventList />}
               {isCreateEvent && <CreateEvent />}

            </div>     
        </>
    )
}


export default Events;