import Card from '@mui/material/Card';
import { Outlet } from 'react-router-dom';

function AuthCard() {
    return (
        <>
            <Card sx={{
                padding: 3,
                boxShadow: 3,
                margin: 'auto'
            }}>
                <Outlet />
            </Card >
        </>
    )
}

export default AuthCard;