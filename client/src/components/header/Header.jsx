import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import broadcastLogo from '../../assets/logo/broadcast-logo.png';
import './index.css';

import { StartMeeting } from '../meeting/start-meeting/start-meeting';
import { JoinMeeting } from '../meeting/join-meeting/join-meeting';

const drawerWidth = 240;
const navItems = [{ key: 'sign-in', value: 'Sign in' }, { key: 'join-meeting', value: 'Join a meeting' }, { key: 'start-meeting', value: 'Start a meeting' }];


function GenerateButton({ item, clickHandler, joinMeetingButtonState, setJoinMeetingButtonState, }) {

    const toggleJoinButtonDelayTimerId = React.useRef('');

    // React.useEffect(() => {
    //     document.addEventListener('click', () => {
    //         toggleJoinButton('join-input');
    //     });
    // }, []);

    function toggleJoinButton(params) {
        let toggleValue = '';
        if (params === 'join-input') {
            toggleValue = 'join-button';
        }
        else if (params === 'join-button') {
            toggleValue = 'join-input';
        }
        setJoinMeetingButtonState(toggleValue)
    }


    function toggleJoinButtonWithDelayOnMouseLeave() {
        window.clearTimeout(toggleJoinButtonDelayTimerId.current);
        toggleJoinButtonDelayTimerId.current = window.setTimeout(() => {
            toggleJoinButton('join-input');
        }, 500);
    }

    let variant = '';
    let color = '';
    let button = null;
    if (item.key === 'sign-in') {
        let variant = 'text';
        let color = 'primary';
        button = <Button key={item.key} sx={{ color: '#fff', margin: '0 5px' }} variant={variant} color={color} onClick={() => clickHandler(item.key)}>{item.value}</Button>
    }
    else if (item.key === 'join-meeting') {
        variant = 'outlined';
        color = 'inherit';
        if (joinMeetingButtonState === 'join-button') {
            button = <Button key={item.key} sx={{ color: '#fff', margin: '0 5px' }} variant={variant} color={color} onClick={() => toggleJoinButton('join-button')}>{item.value}</Button>
        }
        else if (joinMeetingButtonState === 'join-input') {
            button = <span onMouseLeave={toggleJoinButtonWithDelayOnMouseLeave}><JoinMeeting /></span>
        }

    }
    else if (item.key === 'start-meeting') {
        button = <StartMeeting />
    }

    return button;
}

export function Header(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [joinMeetingButtonState, setJoinMeetingButtonState] = React.useState('join-button'); // join button or join input


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <img src={broadcastLogo} alt='broadcast-logo' />
            </Typography>
            <Divider />
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={item.value + index} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.value} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );


    function handleButtonClick() {

    }



    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" className='nav-bar'>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <Box className='app-logo'>
                            <img src={broadcastLogo} alt='broadcast-logo' />
                        </Box>

                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }} className={joinMeetingButtonState === 'join-input' && 'header-right-section-lg'}>
                        {navItems.map((item, index) => (
                            <GenerateButton
                                key={index}
                                item={item}
                                clickHandler={handleButtonClick}
                                joinMeetingButtonState={joinMeetingButtonState}
                                setJoinMeetingButtonState={setJoinMeetingButtonState}
                            />))}
                    </Box>

                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />

            </Box>
        </Box>
    );
}

Header.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
