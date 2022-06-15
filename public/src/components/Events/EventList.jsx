import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { allUsersRoute, localUser } from '../../utils/APIRoutes';
import LoggedInUser from '../ProfileHome/LoggedInUser';
import { eventListRoute, eventsRoute  } from '../../utils/APIRoutes';
import EventCard from './EventCard';

const EventList = ({event})=>{
    const navigate = useNavigate();
    var username;
    const [events, setEvents] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);
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
                const stringData = ((await userDetails).data);
                username = stringData.username;
                const allEvents = await axios.get(eventListRoute);
                setEvents(allEvents.data.events);
                console.log(allEvents);
                setIsLoaded(true);
            }
        };
        fnc3();

    },[])


    return(
        <>
        {events.length>0? (<div className='eventsHolder'>{events.map((event)=>(<div className='Event'><EventCard event={event}/></div>))}</div>):(<h1>..</h1>)}
        </>
    )
}
export default EventList;