import { Button, Card, Slider, Typography, Input, MenuItem, Select, InputLabel, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";
import DataForm from "./DataForm"
import AdminCard from "./AdminCard";
import AllUsersTable from "./AllUsersTable";

function AdminPanel() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const isAdmin = token ? JSON.parse(atob(token.split('.')[1])).isAdmin : false;
        if (isExpired(localStorage.getItem('token') || '') || !isAdmin) {
            navigate('/dashboard');
        }

    }, []);

    return (
        <Box sx={{
            display: 'flex',
            justifyItems: 'center',
            gap: '5vw'
        }}>
            <AdminCard>
                <DataForm />
            </AdminCard>
            <AdminCard>
                <AllUsersTable />
            </AdminCard>
        </Box>
    )
}

export default AdminPanel;