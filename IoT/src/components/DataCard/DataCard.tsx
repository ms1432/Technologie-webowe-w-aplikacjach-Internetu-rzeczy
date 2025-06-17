import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Thermostat from '@mui/icons-material/Thermostat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OpacityIcon from '@mui/icons-material/Opacity';
import Link from '@mui/material/Link';
import type { DeviceData } from '../../types/types';

type InfoCardProps = {
    deviceData: DeviceData;
    backgroundColor?: string;
    border?: string;
    details?: boolean;
    handleDetails?: (value: number) => void;
};

function DataCard({ deviceData, backgroundColor, border, details, handleDetails}: InfoCardProps) {

    const noData =
        (deviceData.temperature === undefined) &&
        (deviceData.humidity === undefined) &&
        (deviceData.pressure === undefined);

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
                    Device No {deviceData.deviceId}
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
                    Device No {deviceData.deviceId}
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
                    {deviceData.temperature} °C

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
                    {deviceData.humidity}%

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
                    {deviceData.pressure} hPa

                </Typography>
                {details === true ? 
                <Link
                    onClick={() => {
                        if (!isNaN(Number(deviceData.deviceId)) && typeof handleDetails === 'function') {
                                handleDetails(Number(deviceData.deviceId));
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