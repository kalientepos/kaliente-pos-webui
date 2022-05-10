
import { Box, Breadcrumbs, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useAppDispatch, useAppSelector } from "../../store";
import { hideRemoveDialog, showRemoveDialog, clearProducts } from "../../store/slices/products/products-slice";
import { getAllProducts, removeProduct } from "../../store/slices/products/products-thunk";
import { toast } from 'react-toastify';

const skeletonArray = Array(3).fill('');


function ProductList() {
    const productsState = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllProducts());

        return () => { dispatch(clearProducts()); }
    }, []);

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit"
            variant="h5" href="/" onClick={() => { }}>
            Products
        </Link>,
    ];

    const confirmRemoveDialog = async () => {
        const productId = productsState.removeDialog.productIdToRemove!!;
        const result = await dispatch(
            removeProduct(productId)
        );
        if (result.type.includes('fulfilled')) {
            toast(`Successfully removed product #${productId}`, { type: 'success' });
            dispatch(hideRemoveDialog());
        }
    };


    return (
        <Paper elevation={0}>
            <Dialog
                open={productsState.removeDialog.isOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to remove product?"}
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
                                <TableCell align="center"><Typography variant="h6">Title</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Description</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Catalogue</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Price</Typography></TableCell>
                                <TableCell align="center"><Typography variant="h6">Operations</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                productsState.isLoading &&
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
                                !productsState.isLoading && productsState.products.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                        <TableCell align="center">{row.description}</TableCell>
                                        <TableCell align="center">{row.catalogueId}</TableCell>
                                        <TableCell align="center">{row.price}</TableCell>
                                        <TableCell align="center">
                                            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                                <Button color="success" variant="contained" onClick={() => navigate(`./update/${row.id}`)}>Edit</Button>
                                                <Button color="error" variant="contained" onClick={() => dispatch(showRemoveDialog(row.id))}>Remove</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box mt={2} />
                <Button startIcon={<AddBoxIcon />} variant="contained" onClick={() => navigate('./add')}>Add New Product</Button>
            </Box>
        </Paper>
    )
};

export default ProductList;