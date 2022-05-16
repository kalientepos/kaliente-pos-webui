import { Breadcrumbs, Link, Paper } from "@mui/material";
import React from "react";

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

    
    return (
        <Paper elevation={5}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </Paper>
    );
}

export default AdministrationDashboard;