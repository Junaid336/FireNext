import React, { useEffect, useState } from 'react'

import { auth, writeMessage, loadMessages, loadContactByChatId } from '../Firebase';

import Box from '@mui/material/Box'

import Contact from './Contact';
import Message from './Message';
import SendMessage from './SendMessage';
import NoContent from './NoContent';
import Loading from './Loading'


const Chat = ({chatId}) => {
    const [contact, setContact] = useState({});
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = async() =>{
        setLoading(true);
        await Promise.all([
            loadContactByChatId(chatId, setContact),
            loadMessages(chatId, setMessages, messages)
        ]);
        setLoading(false);
    }

    useEffect(()=>{
        load();
    }, []);

    const renderedMessages = messages.map((message,index)=>(
        <Message
         myMessage={message.uid === auth.currentUser.uid}
         text={message.text}
         key={index}
        />
    ))

    const onMessageSend = async (messageText) => {
        await writeMessage(messageText, chatId);
    }

    

    const conversation = (
        <Box sx={{
            // maxHeight: '75%',
            width: '100%',
            height: '80%',
            display: 'flex',
            flexDirection: 'column-reverse',
            overflowY: 'scroll',
            margin: 0,
            padding: 0
        }}
            className='conversation'
        >
            {
                messages.length > 0
                ? renderedMessages
                : <NoContent text='Start Messaging' />
            }
        </Box>
    )

    return(
        <>
            <Contact
             photoUrl={contact.photoUrl}
             name={contact.name}
             onClick={()=>1}
            />
            {
                loading
                ? <Loading />
                : conversation
            }
            <SendMessage onMessageSend={onMessageSend} /> 
        </>
    );
}

export default Chat;