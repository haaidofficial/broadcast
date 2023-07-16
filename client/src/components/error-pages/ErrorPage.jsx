import Box from '@mui/material/Box';
import error404Icon from '../../assets/icons/error-404.png';


const icons = {
    404: error404Icon,

}

export function ErrorPage({ errorCode }) {


    return (
        <>
            <Box sx={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '250px', height: '250px' }}>
                    <img src={icons[errorCode]} alt='error-404-icon' style={{ width: '100%', height: '100%' }} title='Page Not Found'/>
                </Box>
            </Box>
        </>
    );
}