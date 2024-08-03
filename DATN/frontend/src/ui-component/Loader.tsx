import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

// ==============================|| LOADER ||============================== //

const Loader: React.FC = () => (
    <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1301, width: '100%' }}>
        <LinearProgress color="primary" />
    </Box>
);

export default Loader;
