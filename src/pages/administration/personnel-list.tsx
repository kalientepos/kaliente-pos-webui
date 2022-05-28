
import { Box, Breadcrumbs, Button, ButtonGroup, Dialog, DialogActions, DialogTitle, Link, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppPage from "../../components/page/page";
import AdministrationService from "../../services/administration-service";
import { useAppDispatch, useAppSelector } from "../../store";
import { hideRemoveDialog, removePersonnelsFromPage, showRemoveDialog } from "../../store/slices/administration/administration-slice";
import { getAllPersonnel, removePersonnel } from "../../store/slices/administration/administration-thunk";
import AddBoxIcon from '@mui/icons-material/AddBox'; 
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { toast } from "react-toastify";

const skeletonArray = Array(3).fill('');

function PersonnelList() {
    //#region [Hooks]
    const personnelList = useAppSelector(state => state.administration.personnelList);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getAllPersonnel());
    }, []);
    //#endregion

    const confirmRemoveDialog = async () => {
        const personnelId = personnelList.removeDialog.personnelEmailToRemove!!;
        const result = await dispatch(
            removePersonnel(personnelId)
        );
        if (result.type.includes('fulfilled')) {
            toast(`Successfully removed personnel with email: ${personnelId}`, { type: 'success' });
            dispatch(hideRemoveDialog());
        }
    };


    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit"
            variant="h5" href="/administration/" onClick={() => { }}>
            Administration
        </Link>,
        <Link underline="hover" key="1" color="inherit"
            variant="h5" href="/" onClick={() => { }}>
            Personnel Operations
        </Link>,
    ];



    return (
        <Paper elevation={0}>
            <Dialog
                open={personnelList.removeDialog.isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Are you sure you want to remove personnel ${personnelList.removeDialog.personnelEmailToRemove}?`}
                </DialogTitle>
                {/* <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You cannot
                    </DialogContentText>
                </DialogContent> */}
                <DialogActions>
                    <Button onClick={() => dispatch(hideRemoveDialog())}>No</Button>
                    <Button onClick={confirmRemoveDialog} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <Box mt={2}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"><Typography variant="h6">Email</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">First Name</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Last Name</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Operations</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                personnelList.isLoading &&
                                skeletonArray.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            <Skeleton variant="text" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Skeleton variant="text" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Skeleton variant="text" />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Skeleton variant="text" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                            {
                                !personnelList.isLoading && personnelList.personnel.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {row.email}
                                        </TableCell>
                                        <TableCell align="center">{row.firstName}</TableCell>
                                        <TableCell align="center">{row.lastName}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                <Button color="success" variant="contained" onClick={() => navigate(`./update/${row.id}`)}>Edit</Button>
                                                <Button color="error" variant="contained" onClick={() => dispatch(showRemoveDialog(row.email))}>Remove</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box mt={2} />
                <Button startIcon={<PersonPinIcon />} variant="contained" onClick={() => navigate('./add')}>Add New Personnel</Button>
            </Box>
        </Paper>
    )
}

export default PersonnelList;
