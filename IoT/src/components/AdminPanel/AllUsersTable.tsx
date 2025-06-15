import { TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { Table } from "reactstrap";


function AllUsersTable() {
    const [userData, setUserData] = useState<any[]>([]);

    const headerOptions = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': `Bearer ${localStorage.getItem('token')}` || ''
        }
    };

    function getAllUsersData() {
        fetch(`http://localhost:3100/api/user/getAllUsersData`, headerOptions)
            .then(response => response.json())
            .then(data => setUserData(data))
        console.log(userData);
    }

    useEffect(() => {
        getAllUsersData();
    }, [])

    return (
        <TableContainer sx={{
            display: 'flex',
            justifyContent: 'center',
            border: 'solid 2px #0eb4b2',
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
    )
}

export default AllUsersTable;