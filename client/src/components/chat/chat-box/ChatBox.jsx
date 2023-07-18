import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import './index.css';


export function UserChatBox({ message }) {



    return (
        <>
            <div className='chat-box'>
                <Paper elevation={3} className='chat-box-paper local-user-chat'>
                    {message}
                </Paper>
            </div>
        </>

    );

}
