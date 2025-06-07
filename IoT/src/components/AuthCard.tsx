import Card from '@mui/material/Card';
import { Outlet } from 'react-router-dom';

function AuthCard() {
    return (
        <>
            <Card sx={{
                padding: 3,
                boxShadow: 3,
                margin: 'auto',
                minWidth: 350,
                minHeight: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Outlet />
            </Card >
        </>
    )
}

export default AuthCard;