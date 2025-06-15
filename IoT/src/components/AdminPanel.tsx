import { Button, Card, Slider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";

function AdminPanel() {

    const [inputHourValue, setInputHourValue] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdmin = token ? JSON.parse(atob(token.split('.')[1])).isAdmin : false;
        if (isExpired(localStorage.getItem('token') || '') || !isAdmin) {
            navigate('/dashboard');
        }

    }, []);

    return (
        <Card
            sx={{
                width: "50vh",
                height: "60vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                textAlign: "center",
                color: 'white',
                backgroundColor: '#1e1e1e',
            }}
        >
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
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                }}
            >
                Wybierz z ilu ostatnich godzin dane mają pozostać w systemie
            </Typography>
            <Slider
                value={inputHourValue}
                onChange={(_, value) => setInputHourValue(value as number)}
                min={0}
                max={10}
                step={1}
                marks
                valueLabelDisplay="auto"
                sx={{ color: "#0eb4b2", width: "90%", mt: 2 }}
            />
            <Button
                variant="contained"
                color='error'>
                Usuń resztę danych
            </Button>
        </Card>
    )
}

export default AdminPanel;