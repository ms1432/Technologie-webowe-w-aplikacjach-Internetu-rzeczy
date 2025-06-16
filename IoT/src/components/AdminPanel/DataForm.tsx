import { Button, Slider, Typography, MenuItem, Select, Box, Alert } from "@mui/material";
import { useState } from "react";

function DataForm() {

    const [inputHourValue, setInputHourValue] = useState(1);
    const [indexValue, setIndexValue] = useState(2);
    const [alertState, setAlertState] = useState(0);

    const headerOptions = {
        method: "Delete",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${localStorage.getItem('token')}` || ''
        }
    };

    async function deleteDataOlderThan(idx: number) {
        const response = await fetch(`http://localhost:3100/api/data/${idx}/${inputHourValue}`, headerOptions)
            .then(response => response.json())
            .then(data => data)
        handleResponse(response.ok);
    }

    async function deleteDataOlderThanForAllDev() {
        const results = [];
        for (let i = 0; i < 17; i++) {
            const response = await fetch(`http://localhost:3100/api/data/${i}/${inputHourValue}`, headerOptions)
                .then(response => response.json())
                .then(data => data)
            results.push(response.ok)
        }
        const result = results.some(i => i === 1);
        handleResponse(result);
    }
    function handleResponse(res: boolean){
        if (res) {
            setAlertState(1);
            setTimeout(() => {
                setAlertState(0);
            }, 5000);
        } else {
            setAlertState(2);
            setTimeout(() => {
                setAlertState(0);
            }, 5000);
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
                sx={{
                    color: "black",
                    bgcolor: '#cccccc',
                    width: "20%",
                    mt: 2,
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#0eb4b2",
                    },
                }}
                onChange={(event) => setIndexValue(parseInt(event.target.value as string))}
            >
                {Array.from({ length: 17 }, (_, i) => i).map((number) => (
                    <MenuItem key={number} value={number} sx={{}}>
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
            <Box sx={{ minHeight: "50px", mb: 2 }}>
                {alertState === 1 ?
                    <Alert variant="outlined" severity="error" sx={{
                        color: 'white'
                    }}>
                        Error! Nie udało się usunąć danych
                    </Alert>
                    :
                    alertState === 2 ?
                        <Alert variant="outlined" severity="success" sx={{
                            color: 'white'
                        }}>
                            Usunięto dane
                        </Alert>
                        :
                        null
                }
            </Box>
        </>
    )
}

export default DataForm;