import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Thermostat from '@mui/icons-material/Thermostat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OpacityIcon from '@mui/icons-material/Opacity';

type InfoCardProps = {
    deviceID: number | string | undefined;
    temperature?: number | string | undefined;
    humidity?: number | string | undefined;
    pressure?: number | string | undefined;
};

function DataCard({ deviceID, temperature, humidity, pressure }: InfoCardProps) {

    const noData =
        (temperature === undefined || temperature === 'undefined') &&
        (humidity === undefined || humidity === 'undefined') &&
        (pressure === undefined || pressure === 'undefined');

    return (
        <Card sx={{ backgroundColor: '#1e1e1e', color: 'white', padding: 2, width: '260px', height: '220px', minHeight: 175, ":hover": { backgroundColor: '#0eb4b2' } }}>
            {noData ? (<>
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
                    Device No {deviceID}
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
                    No data
                </Typography>
            </>
            ) : (<>
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
                    Device No {deviceID}
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
                    {temperature} °C

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
                    {humidity}%

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
                    {pressure} hPa

                </Typography>
            </>)}
        </Card>
    );
}

export default DataCard;