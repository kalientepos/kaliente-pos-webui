import { Breadcrumbs, Link, Paper, Box, Card, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit"
        variant="h5" href="/administration/" onClick={() => { }}>
        Administration
    </Link>,
    <Link underline="hover" key="1" color="inherit"
        variant="h5" href="/administration/" onClick={() => { }}>
        Dashboard
    </Link>,
];

function AdministrationDashboard() {

    const navigate = useNavigate()

    return (
        <Paper elevation={0}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <Card>
                <Button variant="contained" onClick={() => navigate('./personnel')}>Personnel Operations</Button>
            </Card>
        </Paper>
    );
}

export default AdministrationDashboard;