import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import './index.css';


const tabs = [{ label: 'Chat', key: 'chat', icon: <ChatIcon fontSize='small' /> }, { label: 'Participant', key: 'participant', icon: <GroupsIcon fontSize='small'  /> }];

export function TabParticipantTab({ updateTabs }) {
    const [activeTab, setActiveTab] = React.useState(0);

    const handleChange = (index) => {
        setActiveTab(index);
    };

    React.useEffect(() => {
        updateTabs(tabs[activeTab].key);
    }, [activeTab]);

    return (
        <Box className='chat-participant-tab'>
            <Box>
                <Stack spacing={0} direction="row" sx={{ background: 'black', borderRadius: '5px' }}>
                    {
                        tabs.map((tab, index) => {
                            let tab_btn_style = 'tab-btn';
                            if (activeTab === index) {
                                tab_btn_style = 'tab-btn tab-active';
                            }

                            return <Button startIcon={tab.icon} key={index} className={tab_btn_style} variant={activeTab === index ? 'contained' : 'text'} sx={{ color: '#6a6e74' }} onClick={() => handleChange(index)}>{tab.label}</Button>

                        })
                    }

                </Stack>
            </Box>
        </Box>
    );
}