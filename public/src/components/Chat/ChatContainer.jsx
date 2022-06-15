import React ,{useEffect, useState,useRef} from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { getAllMessageRoute, sendMessageRoute } from '../../utils/APIRoutes';





export default function ChatContainer({currentChat, currentUser, socket}) {
    const [messages,setMessages]= useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    //^ REF will scroll into the view the new messages  
    const scrollRef = useRef();
    console.log(currentChat);
    //console.log(currentUser);
    useEffect(()=>{
        var fnc10 = async function(){
            if(socket.current){
                //! we need check this 
            }
        };
        fnc10();
    },[]);

    useEffect(()=>{
        var fnc13 = async function(){
            const response = await axios.post(getAllMessageRoute,{
                from:currentUser._id,
                to:currentChat._id,
            });
            setMessages(response.data);
        };
        fnc13();
    },[currentChat]);

    const handleSendMessage = async (message)=>{
        //alert(message)
        await axios.post(sendMessageRoute,{
            from:currentUser._id,
            to: currentChat._id,
            message: message,
        });
        socket.current.emit("send-message",{
            //^ need chat id also
            to:currentChat._id,
            from: currentUser._id,
            message: message,
        });

        const messages = [...messages];
        messages.push({fromSelf:true,message:message});
        //^ need to check again 
        setMessages(messages);

    };

    useEffect(()=>{
        var fnc7 = async function(){
            if(socket.current){
                socket.current.on("message-receive",(message)=>{
                    setArrivalMessage({fromSelf:false, message:message});
                })
            }
        };
        fnc7();
    },[]);

    useEffect(()=>{
        var fnc8 = async function(){
            arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
        };
        fnc8();
    },[arrivalMessage]);

    useEffect(()=>{
        var fnc9 = async function(){
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        };
        fnc9();
    },[messages]);

return (
<>
    {
    currentChat && (
    <Container>
        <div className="chat-header">
            <div className="user-details">
                <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
                </div>
                <div className="username">
                    <h3>{currentChat.username}</h3>
                </div>
            </div>            
            
        </div>
        
        <div className="chat-messages">
            {messages.map((message) => {
            return (
                <div>
                <div
                    className={`message ${
                    message.fromSelf ? "sended" : "received"
                    }`}
                >
                    <div className="content ">
                    <p>{message.message}</p>
                    </div>
                </div>
                </div>
            );
            })}
        </div>
        {console.log(messages)}
        <ChatInput handleSendMessage={handleSendMessage} />
    </Container>
    )
}
</>
)
}

const Container = styled.div`
display: grid;
grid-template-rows: 10% 80% 10%;
gap: 0.1rem;
overflow: hidden;

@media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
}

.chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
        display: flex;
        align-items: center;
        gap: 1rem;

        .avatar {
            img {
                height: 3rem;
            }
        }

        .username {
            h3 {
                color: 1F5CA5;
                margin-top: -1rem;
            }
        }
    }
}

.chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin:
    width: 1000px;
    overflow: auto;
    margin-top: 13rem;

    .message {
        display: flex;
        align-items: center;

        .content {
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
            color: #d1d1d1;

            @media screen and (min-width: 720px) and (max-width: 1080px) {
                max-width: 70%;
            }
        }
    }

    .sended {
        justify-content: flex-end;

        .content {
            background-color: navy;
        }
    }

    .recieved {
        justify-content: flex-start;

        .content {
            background-color: navy;
        }
    }
}
`;