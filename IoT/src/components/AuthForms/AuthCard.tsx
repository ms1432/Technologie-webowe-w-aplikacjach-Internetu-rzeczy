import Card from '@mui/material/Card';
import { Outlet } from 'react-router-dom';

function AuthCard() {

    return (
        <>
            <Card sx={{
                padding: 3,
                ":hover": { boxShadow: "0 4px 12px 0 rgb(90, 90, 90)" },
                margin: 'auto',
                minWidth: 350,
                minHeight: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgb(250, 249, 246)',
            }}>
                <Outlet />
            </Card >
        </>
    )
}

export default AuthCard;