import { Card } from "@mui/material";
import React from "react";

interface AdminCardProps {
    children: React.ReactNode;
}

function AdminCard({ children }: AdminCardProps) {
    return (
        <Card
            sx={{
                width: "30vw",
                height: "60vh",
                borderRadius: '20px',
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                textAlign: "center",
                color: 'white',
                backgroundColor: '#1e1e1e',
                ':hover': {
                    transform: "translateY(-6px)",
                    boxShadow: "0 4px 12px 0 rgb(90, 90, 90)",
                    transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
                },
                gap: '10px',
            }}
        >
            {children}
        </Card>
    );
}

export default AdminCard;