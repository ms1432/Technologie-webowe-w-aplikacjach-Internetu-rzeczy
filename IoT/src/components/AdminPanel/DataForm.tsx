import { Button, Slider, Typography, MenuItem, Select } from "@mui/material";
import { useState } from "react";

function DataForm() {

    const [inputHourValue, setInputHourValue] = useState(1);
    const [indexValue, setIndexValue] = useState(2);

    const headerOptions = {
        method: "Delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${localStorage.getItem('token')}` || ''
        }
    };

    function deleteDataOlderThan(idx: number) {
        fetch(`http://localhost:3100/api/data/${idx}/${inputHourValue}`, headerOptions)
            .then(response => response.json())
            .then(data => data)
    }

    function deleteDataOlderThanForAllDev() {
        for (let i = 0; i < 17; i++) {
            fetch(`http://localhost:3100/api/data/${i}/${inputHourValue}`, headerOptions)
                .then(response => response.json())
                .then(data => data)
        }
    }

    return (
        <>
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
                Wybierz z ilu ostatnich godzin dane mają pozostać w systemie
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
                ID urządzenia
            </Typography>
            <Select
                value={indexValue}
                sx={{ bgcolor: '#0eb4b2', color: "black", width: "20%", mt: 2 }}
                onChange={(event) => setIndexValue(parseInt(event.target.value as string))}
            >
                {Array.from({ length: 17 }, (_, i) => i).map((number) => (
                    <MenuItem key={number} value={number}>
                        {number}
                    </MenuItem>
                ))}
            </Select>
            <Button
                variant="contained"
                color='error'
                onClick={() => deleteDataOlderThan(indexValue)}
            >
                Usuń resztę danych
            </Button>
            <Button
                variant="contained"
                color='error'
                onClick={() => deleteDataOlderThanForAllDev()}>
                Usuń resztę danych dla każdego urządzenia
            </Button>
        </>
    )
}

export default DataForm;