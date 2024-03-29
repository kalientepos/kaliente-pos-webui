import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  Link,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useAppDispatch, useAppSelector } from '../../store/index';
import { getAllPersonnel } from '../../store/slices/administration/administration-thunk';

const skeletonArray = Array(3).fill('');

function AdminList() {
  // #region [Hooks]
  const personnelList = useAppSelector(
    (state) => state.administration.personnelList
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPersonnel());
  }, []);
  // #endregion

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      variant="h5"
      href="/"
      onClick={() => {}}
    >
      Admin Operations
    </Link>,
  ];

  // const confirmRemoveDialog = async () => {
  //     const productId = personnelList.removeDialog.productIdToRemove!!;
  //     const result = await dispatch(
  //         removeProduct(productId)
  //     );
  //     if (result.type.includes('fulfilled')) {
  //         toast(`Successfully removed product #${productId}`, { type: 'success' });
  //         dispatch(hideRemoveDialog());
  //     }
  // };

  return (
    <Paper elevation={0}>
      <Dialog
        open={false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to remove personnel?
        </DialogTitle>
        {/* <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You cannot
                    </DialogContentText>
                </DialogContent> */}
        {/* <DialogActions>
                    <Button onClick={() => dispatch(hideRemoveDialog())}>No</Button>
                    <Button onClick={confirmRemoveDialog} autoFocus>
                        Yes
                    </Button>
                </DialogActions> */}
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
                  <Typography variant="h6">Email</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">First Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Last Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">Operations</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personnelList.isLoading &&
                skeletonArray.map(() => (
                  <TableRow key={Math.random()}>
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
              {!personnelList.isLoading &&
                personnelList.personnel.map((row) => (
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
                        <Button color="error" variant="contained">
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
          startIcon={<PersonPinIcon />}
          variant="contained"
          onClick={() => navigate('./add')}
        >
          Add New Personnel
        </Button>
      </Box>
    </Paper>
  );
}

export default AdminList;
