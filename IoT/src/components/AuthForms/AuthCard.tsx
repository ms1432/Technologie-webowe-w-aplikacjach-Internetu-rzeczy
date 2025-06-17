import Card from '@mui/material/Card';
import { Outlet } from 'react-router-dom';

function AuthCard() {

    return (
        <>
            <Card sx={{
                backgroundColor: '#1e1e1e',
                color: 'white',
                padding: 2,
                ":hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 4px 12px 0 rgb(90, 90, 90)",
                    transition: "transform 0.2s, box-shadow 0.2s, background 0.2s"
                },
                minWidth: 350,
                minHeight: 200,
            }}>
                <Outlet />
            </Card >
        </>
    )
}

export default AuthCard;