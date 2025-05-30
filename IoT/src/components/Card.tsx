import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LanguageIcon from '@mui/icons-material/Language';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Thermostat from '@mui/icons-material/Thermostat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OpacityIcon from '@mui/icons-material/Opacity';

function infoCard() {
    return (
        <div>
            <Toolbar disableGutters>
                <Card sx={{ minWidth: 275, backgroundColor: '#1e1e1e', color: 'white', padding: 2, paddingTop: 3, paddingBottom: 3, width: '100%' }}>
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Device No 3
                    </Typography>
                    <hr style={{ width: '100%', border: '2px solid white', borderRadius: '1px', boxSizing: 'border-box' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >

                        <Thermostat sx={{ mr: 1 }} />
                        23.5 °C

                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >

                        <CloudUploadIcon sx={{ mr: 1 }} />
                        45% Humidity

                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >

                        <OpacityIcon sx={{ mr: 1 }} />
                        1013 hPa Pressure

                    </Typography>
                </Card>
            </Toolbar>
        </div>
    );
}

export default infoCard;