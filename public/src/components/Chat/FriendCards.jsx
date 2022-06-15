import {React, useState, useEffect} from "react";
import axios from "axios";
const FriendCards = ({friend})=>{
    return(
        <div>
            <img src={`data:image/svg+xml;base64,${friend.avatarImage}`} alt="" style={{height:"6.5rem", marginRight:"12rem", marginLeft:"3.3rem", marginTop:"10px"}} />
            <h4 >{friend.firstName}</h4>
            <h4 >{friend.lastName}</h4>
        </div>
    )
}
export default FriendCards;