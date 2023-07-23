import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './index.css';

export function ParticipantList() {

    return (
        <>
            <Box className='participant-list'>
                <div className='participant-list-container'>
                    <div className='participant-list-wrapper'>
                        <div className='participant-list-header'>

                        </div>
                        <div className='participant-list-box'>

                        </div>
                    </div>
                </div>
            </Box>
        </>
    )
}