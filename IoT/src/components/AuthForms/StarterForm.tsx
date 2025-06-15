import { Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const StarterForm: React.FC = () => {

    const navigate = useNavigate();

    const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/login");
    }

    const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate("/register");
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            gap: 16, 
        }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Witaj!
            </Typography>
            <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
            >
                Zaloguj
            </Button>
            <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegister}
            >
                Zarejestruj
            </Button>
        </div>
    )
}

export default StarterForm;