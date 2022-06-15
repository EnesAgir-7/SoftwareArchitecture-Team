import {React, useState, useEffect} from "react";

const EventCard = ({event})=>{
    return(
        <div className="eventCard">
            <h4 >{event.eventName}</h4>
            <h4 >{event.description}</h4>
            <h4 >{event.date}</h4>
            <h4 >{event.time}</h4>
            <h4 >{event.location}</h4>
            <h4 >{event.contact}</h4>
        </div>
    )
}
export default EventCard;