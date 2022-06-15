import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import './Contacts.css'
import Logout from '../../components/Logout/Logout'

export default function Contacts({contacts,currentUser,changeChat}) {
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [currentUserName, setCurrentUserName]= useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    
    useEffect(()=>{
        var fnc4 = async function(){
            //! ?contactlara ulasamiyorum neden anlamadim 
            //console.log(contacts);
            if(currentUser){
                setCurrentUserImage(currentUser.avatarImage);
                setCurrentUserName(currentUser.username);
            }
        };
        fnc4();
    },[currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

    return <>
        {currentUserImage && currentUserName &&
            (
                    

                <Container>
                    <div className="content">
                    
                    
                    <div className="contacts">
                        {
                            contacts.map((contact, index) =>{
                                return(
                                    <div className={`contact ${index === currentSelected? "selected":""}`} key={index} onClick={()=>changeCurrentChat(index,contact)}>
                                        <div className="avatar">
                                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" />
                                        </div>
                                        <h3>{contact.username}</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                    </div>
                     
                </Container>
            )
        }
    </>
}

const Container = styled.div`
  position: absolute;
width: 350px;
height: 612px;
left: 1px;
top: 7.4rem;
background: rgba(78, 136, 204, 0.5);
overflow-y: scroll;

        img {
            height: 2rem;
            left:2px;
        }
        h3 {
            color: 1F5CA5;
            text-transform: uppercase;
            font-size: 15px;
        }
    }
    .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    margin-top: 1rem;
    &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
        }
    }
    .selected {
        background-color: #9a86f3;
    }
    }
    .current-user {
    background-color: #0757AA;
    display:flex;
    .avatar {
        img {
        height: 3rem;
        margin-left: 20%;
        }
    }
}
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
        h2 {
            
            font-size: 1rem;
        }
        }
    }
    }
`;
