import React, {useState} from 'react';
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import Picker from 'emoji-picker-react'
import styled from 'styled-components';


export default function ChatInput({handleSendMessage}) {

    const [showEmojiPicker,setShowEmojiPicker]=useState(false);
    const [message,setMessage] = useState("");

    //! send message than clear input
    const sendChat = (event) =>{
        event.preventDefault();
        if(message.length>0){
            handleSendMessage(message);
            setMessage("");
        }
    }

    const handleEmojiClick = (event, emoji)=>{
        let message = message;
        message += emoji.emoji;
        setMessage(message);
    }

    const handleEmojiPickerHideShow =()=>{
        setShowEmojiPicker(!showEmojiPicker);
    }

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                    {
                        showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>
                    }
                </div>

            </div>

            <div className='type-box'>

            <form className='input-container' onSubmit={(event)=>sendChat(event)}>
                <input type="text" placeholder='type your message...' value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <button type='submit'>
                    <IoMdSend />
                </button>
            </form>
            </div> 
        </Container>
    )
}

const Container = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 5% 95%;
    background-color: rgba(78, 136, 204, 0.1);
    padding: 0 2rem;
    width: 1000px;
    margin-left: -10rem;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0 1rem;
        gap: 1rem;
    }
    

    .button-container {
        display: flex;
        align-items: center;
        color: white;
        margin: 3rem;
        gap: 1rem;

        .emoji {
            position: relative;
            margin-top: -9rem;
            margin-left: 7rem;

            svg {
                font-size: 1.5rem;
                color: #07575B;
                cursor: pointer;
            }

            .emoji-picker-react {
                position: absolute;
                top: -350px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                border-color: #9a86f3;

                .emoji-scroll-wrapper::-webkit-scrollbar {
                    background-color: #080420;
                    width: 5px;

                    &-thumb {
                        background-color: #9a86f3;
                    }
                }

                .emoji-categories {
                    button {
                        filter: contrast(0);
                    }
                }

                .emoji-search {
                    background-color: transparent;
                    border-color: #9a86f3;
                }

                .emoji-group:before {
                    background-color: #080420;
                }
            }
        }
    }
    .type-box{
        height:100px;
        width: 750px;
        margin-left: 9rem;
        margin-top: -3em;
    }

    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: white;

        input {
            width: 90%;
            height: 60%;
            background-color: transparent;
            color: black;
            border: none;
            padding-left: 1rem;
            font-size: 1.2rem;

            &::selection {
                background-color: 1F5CA5;
            }

            &:focus {
                outline: none;
            }
        }

        button {
            padding: 0.3rem 2rem;
            border-radius: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: navy;
            border: none;

            @media screen and (min-width: 720px) and (max-width: 1080px) {
                padding: 0.3rem 1rem;

                svg {
                    font-size: 1rem;
                }
            }

            svg {
                font-size: 2rem;
                color: white;
            }
        }
    }
`;
