import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { ChatThread } from '../chat-thread/ChatThread';
import './index.css';


export function Chat() {



    return (
        <>
            <Grid item md={4} sm={12} xs={12}>
                <div className='chat-container-parent'>
                    <ChatThread />
                </div>
            </Grid>
        </>

    );

}
