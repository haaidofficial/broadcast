import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import './index.css';


export function UserChatBox({ data }) {

    const { message, isRemoteUser, user, dateTime } = data;
    const { username } = user;

    console.log(message, isRemoteUser, user, dateTime);

    return (
        <>
            <div className={(isRemoteUser === true) ? 'chat-box chat-box-left' : 'chat-box chat-box-right'}>
                <div className='chat-box-username'>
                    <span>{username}</span>
                </div>
                <div className='chat-box-datetime'>
                    <span>{dateTime}</span>
                </div>
                <Paper elevation={3} className={(isRemoteUser === true) ? 'chat-box-paper remote-user-chat' : 'chat-box-paper local-user-chat'}>
                    {message}
                </Paper>
            </div>
        </>

    );

}
