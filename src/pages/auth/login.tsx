import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { useNavigate } from 'react-router-dom';
import { FormikErrors, useFormik } from 'formik';
import './login.scss';
import {
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/SaveAsSharp';
import { AuthenticationRequestDto } from '../../models/dtos/auth/authentication.request';
import { loginWithCredentials } from '../../store/slices/auth/auth-thunk';
import AppPage from '../../components/page/page';

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (data) => {
      const errors: FormikErrors<LoginForm> = {};

      if (!data.email) {
        errors.email = 'Email is required.';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)
      ) {
        errors.email = 'Invalid email address. E.g. example@email.com';
      }

      if (!data.password) {
        errors.password = 'Password is required.';
      }
      if (data.password.length < 3) {
        errors.password = 'Password length must be greater than 6.';
      }

      return errors;
    },
    onSubmit: async (data) => {
      const request: AuthenticationRequestDto = {
        email: data.email,
        password: data.password,
      };

      const result = (await dispatch(loginWithCredentials(request))) as any;
      console.warn(result.type);

      if (result.type.includes('fulfilled')) {
        navigate('/');
      } else {
        toast(`Failed to login. Reason: ${result.error.message}`, {
          type: 'error',
        });
      }
    },
  });

  return (
    <Paper elevation={0}>
      <Container fixed>
        <Box mt={2} />
        <Paper sx={{ p: 2 }} elevation={1}>
          <Typography variant="h5" align="center">
            Login
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
                type="password"
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
}

export default Login;
