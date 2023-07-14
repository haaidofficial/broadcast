import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import './index.css';

const Heading = "Video call and meeting facility for all.";
const subHeading = "Broadcast is a service that is available to everyone on every device. It can be used for secure and high quality video meetings and calls.";


export function AppDetails({ children }) {

    return (
        <>
            <Grid item md={6} sm={12} xs={12}>
                <Stack spacing={2} className='header-section'>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="h1" gutterBottom className='heading-text'>
                            {Heading}
                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="h2" gutterBottom className='sub-heading-text'>
                            {subHeading}
                        </Typography>
                    </Box>
                </Stack>
                {children}
            </Grid>
        </>
    );

}