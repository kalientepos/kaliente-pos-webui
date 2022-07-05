import { LoadingButton } from '@mui/lab';
import {
  Backdrop,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CircularProgress,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FormikErrors, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch } from '../../store';
import {
  getSystemRoles,
  registerAdmin,
} from '../../store/slices/administration/administration-thunk';

interface RegisterAdminForm {
  email: '';
  password: '';
}

const AdminAdd: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showBackdrop, setShowBackdrop] = React.useState(false);

  const [sysRoles, setSysRoles] = useState([]);

  useEffect(() => {
    dispatch(getSystemRoles()).then((r: any) => setSysRoles(r.payload.title));

    return () => {};
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: '',
    },
    validate: (data) => {
      const errors: FormikErrors<RegisterAdminForm> = {};

      if (!data.email) {
        errors.email = 'Admin must have a valid email!';
      }

      if (!data.password) {
        errors.password = 'A password is necessary.';
      }

      return errors;
    },
    onSubmit: async (data) => {
      const result = await dispatch(registerAdmin(data));
      if (result.type.includes('fulfilled')) {
        toast('Successfully registered new admin!', { type: 'success' });
        navigate('./../');
      } else {
        toast('An error occurred.', { type: 'error' });
      }
    },
  });

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      variant="h5"
      href="/administration/"
      onClick={() => {}}
    >
      Administration
    </Link>,
    <Link
      underline="hover"
      key="1"
      color="inherit"
      variant="h5"
      href="/"
      onClick={() => {}}
    >
      Personnel Operations
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      variant="h5"
      onClick={() => {}}
    >
      Add New Admin
    </Link>,
  ];

  return (
    <Paper elevation={0}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={showBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <Container fixed>
        <Box mt={2} />
        <Paper sx={{ p: 2 }} elevation={1}>
          <Typography variant="h5" align="center">
            Add New Admin
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack direction="column" spacing={2}>
              <TextField
                id="email"
                label="Email"
                variant="standard"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                id="password"
                label="Password"
                variant="standard"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <LoadingButton
                startIcon={<SaveIcon />}
                loading={formik.isSubmitting}
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Paper>
  );
};

export default AdminAdd;
