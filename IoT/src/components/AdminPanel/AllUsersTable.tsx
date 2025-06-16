import { TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Table, Alert, Box } from "@mui/material";
import { useEffect, useState } from "react";


function AllUsersTable() {
    const [userData, setUserData] = useState<any[]>([]);
    const [userID, setUserID] = useState('');
    const [alertState, setAlertState] = useState(0);

    const GETheaderOptions = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${localStorage.getItem('token')}` || ''
        }
    };

    const DeleteheaderOptions = {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${localStorage.getItem('token')}` || ''
        }
    };

    function getAllUsersData() {
        fetch(`http://localhost:3100/api/user/getAllUsersData`, GETheaderOptions)
            .then(response => response.json())
            .then(data => setUserData(data))
        console.log(userData);
    }

    async function deleteUser(userID: string) {
        const response = await fetch(
            `http://localhost:3100/api/user/deleteUser/${userID}`,
            DeleteheaderOptions
        );

        if (!response.ok || userID === '') {
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
        getAllUsersData();
    }

    useEffect(() => {
        getAllUsersData();
    }, [])

    return (
        <>
            <TableContainer sx={{
                display: 'flex',
                justifyContent: 'center',
                border: 'solid 2px #0eb4b2',
                borderRadius: '10px'
            }}>
                <Table>
                    <TableHead sx={{
                        "& .MuiTableCell-root": { color: "white" },
                    }}>
                        <TableCell>ID</TableCell>
                        <TableCell>Login</TableCell>
                        <TableCell>Imię</TableCell>
                        <TableCell>Rola</TableCell>
                    </TableHead>
                    <TableBody>
                        {userData.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{
                                    "&:last-child td, &:last-child th": { border: 0 },
                                    "& .MuiTableCell-root": { color: "rgb(255, 255, 255)" },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {user._id}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TextField
                variant="outlined"
                placeholder='ID użytkownika'
                onChange={(event) => setUserID(event.target.value)}
                sx={{
                    borderRadius: '8px',
                    bgcolor: '#cccccc',
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                        borderColor: "#0eb4b2",
                    },
                    color: 'black',

                }} />
            <Button
                variant="contained"
                color='error'
                onClick={() => deleteUser(userID)}>
                Usuń użytkownika o podanym ID
            </Button>
            <Box sx={{ minHeight: "50px", mb: 2 }}>
                {alertState === 1 ?
                    <Alert variant="outlined" severity="error" sx={{
                        color: 'white'
                    }}>
                        Error! Nie udało się usunąć użytkownika
                    </Alert>
                    :
                    alertState === 2 ?
                        <Alert variant="outlined" severity="success" sx={{
                            color: 'white'
                        }}>
                            Usunięto użytkownika
                        </Alert>
                        :
                        null
                }
            </Box>
        </>
    )
}

export default AllUsersTable;