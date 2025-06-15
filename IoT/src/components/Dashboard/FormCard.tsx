import { Typography, Slider } from '@mui/material';
import Card from '@mui/material/Card';
import { useEffect, useState } from 'react';

type FormCardProps = {
    onDevicesValueChange: (value: number) => void;
};


function FormCard({ onDevicesValueChange}: FormCardProps) {

    const [inputDevicesValue, setInputDevicesValue] = useState(5);

    useEffect(() => {
        onDevicesValueChange(inputDevicesValue);
    }, [inputDevicesValue, onDevicesValueChange]);


    return (
        <Card sx={{
            padding: 3,
            ":hover": { boxShadow: "0 4px 12px 0 rgb(90, 90, 90)" },
            margin: 'auto',
            maxWidth: 220,
            minWidth: 180,
            minHeight: 200,
            backgroundColor: '#1e1e1e',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: 2,
        }}>
            <Typography
                variant="h6"
                sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    textAlign: 'center',
                    width: '100%',
                }}
            >
                Ustawienia
            </Typography>
            <Typography sx={{ mt: 2, mb: 1 }}>Urządzenia: {inputDevicesValue}</Typography>
            <Slider
                value={inputDevicesValue}
                onChange={(_, value) => setInputDevicesValue(value as number)}
                min={1}
                max={17}
                step={1}
                marks
                valueLabelDisplay="auto"
                sx={{ color: '#0eb4b2', width: '90%' }}
            />
        </Card>
    )
}

export default FormCard;