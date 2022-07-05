import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  clearProductCatalogues,
  hideRemoveDialog,
  showRemoveDialog,
} from '../../store/slices/product-catalogues/prod-catalogues-slice';
import {
  getAllProductCatalogues,
  removeProductCatalogue,
} from '../../store/slices/product-catalogues/prod-catalogues-thunk';

const skeletonArray = Array(3).fill('');

function ProductCatalogueList() {
  const productCatalogueState = useAppSelector(
    (state) => state.productCatalogue
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductCatalogues());

    return () => {
      dispatch(clearProductCatalogues());
    };
  }, []);

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      variant="h5"
      href="/"
      onClick={() => {}}
    >
      Product Catalogues
    </Link>,
  ];

  const confirmRemoveDialog = async () => {
    const catalogueId =
      productCatalogueState.removeDialog.catalogueIdToRemove!!;
    const result = await dispatch(removeProductCatalogue(catalogueId));
    if (result.type.includes('fulfilled')) {
      toast(`Successfully removed catalogue #${catalogueId}`, {
        type: 'success',
      });
      dispatch(hideRemoveDialog());
    }
  };

  return (
    <Paper elevation={0}>
      <Dialog
        open={productCatalogueState.removeDialog.isOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to remove product catalogue?
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
                <TableCell align="center">
                  <Typography variant="h6">Title</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Description</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Parent Catalogue</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Operations</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productCatalogueState.isLoading &&
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
                ))}
              {!productCatalogueState.isLoading &&
                productCatalogueState.productCatalogues.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">
                      {row.parentCatalogueId}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup
                        variant="contained"
                        aria-label="outlined primary button group"
                      >
                        <Button
                          color="success"
                          variant="contained"
                          onClick={() => navigate(`./update/${row.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={() => dispatch(showRemoveDialog(row.id))}
                        >
                          Remove
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box mt={2} />
        <Button
          startIcon={<AddBoxIcon />}
          variant="contained"
          onClick={() => navigate('./add')}
        >
          Add New Product Catalogue
        </Button>
      </Box>
    </Paper>
  );
}

export default ProductCatalogueList;
