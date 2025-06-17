import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Thermostat from '@mui/icons-material/Thermostat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OpacityIcon from '@mui/icons-material/Opacity';
import Link from '@mui/material/Link';

type InfoCardProps = {
    deviceID: number | string | undefined;
    temperature?: number | string | undefined;
    humidity?: number | string | undefined;
    pressure?: number | string | undefined;
    backgroundColor?: string;
    border?: string;
    details?: boolean;
    handleDetails?: (value: number) => void;
};

function DataCard({ deviceID, temperature, humidity, pressure, backgroundColor, border, details, handleDetails}: InfoCardProps) {

    const noData =
        (temperature === undefined || temperature === 'undefined') &&
        (humidity === undefined || humidity === 'undefined') &&
        (pressure === undefined || pressure === 'undefined');

    return (
        <Card sx={{
            backgroundColor: backgroundColor || '#1e1e1e',
            color: 'white',
            padding: 2,
            width: '260px',
            height: '220px',
            minHeight: 175,
            ...(border ? { border } : {}),
            ":hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 4px 12px 0 rgb(90, 90, 90)",
                transition: "transform 0.2s, box-shadow 0.2s, background 0.2s"
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }}>
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
                {details === true ? 
                <Link
                    onClick={() => {
                        if (!isNaN(Number(deviceID)) && typeof handleDetails === 'function') {
                                handleDetails(Number(deviceID));
                            } else {
                                return null;
                            }
                    }}
                    sx={{
                        marginTop: 'auto', 
                        alignSelf: 'flex-start', 
                        color: 'inherit', 
                        textDecoration: 'underline', 
                        ':hover': {
                            color: 'lightblue',
                        }
                    }}
                >Details</Link>
                :
                <></>
                }
            </>)}
        </Card>
    );
}

export default DataCard;