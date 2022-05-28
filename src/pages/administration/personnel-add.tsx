import { LoadingButton } from "@mui/lab";
import { Backdrop, Box, Breadcrumbs, Button, Card, CircularProgress, Container, Link, Paper, Stack, TextField, Typography } from "@mui/material";

import SaveIcon from '@mui/icons-material/Save';
import { FormikErrors, useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { registerPersonnel, updatePersonnel } from "../../store/slices/administration/administration-thunk";
import { register } from "../../store/slices/auth/auth-slice";
import { toast } from 'react-toastify';

interface RegisterPersonnelForm {
    email: '',
    username?: '',
    password: ''
}

function PersonnelAdd() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {personnelId} = useParams();

    const [personnelInfo, setPersonnelInfo] = useState({
        id: '',
        email: '',
        username: '',
        password: ''
    });

    const [showBackdrop, setShowBackdrop] = React.useState(false);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: personnelInfo,
        validate: (data) => {
            let errors: FormikErrors<RegisterPersonnelForm> = {};

            if (!data.email) {
                errors.email = 'Personnel must have a valid email!'
            }

            return errors;
        },
        onSubmit: async (data) => {
            if(personnelId) {
                const result = await dispatch(updatePersonnel(data));
            } else {
                const result = await dispatch(registerPersonnel(data));
                if(result.type.includes('fulfilled')) {
                    toast('Successfully registered new personnel!', { type: 'success' });
                    navigate('./../');
                } else {
                    toast(`An error occurred.`, { type: 'error' });
                }
            }
            // if (catalogueId) {
            //     const result = await dispatch(updatePersonnel(data));
            //     if (result.type.includes('fulfilled')) {
            //         toast('Successfully updated existing personnel!', { type: 'success' });
            //         navigate('./../../');
            //     } else {
            //         toast(`An error occurred.`, { type: 'error' });
            //     }
            // } else {
            //     const result = await dispatch(createPersonnel(data));
            //     if (result.type.includes('fulfilled')) {
            //         toast('Successfully added new personnel!', { type: 'success' });
            //         navigate('./../');
            //     } else {
            //         toast(`An error occurred.`, { type: 'error' });
            //     }
            // }

        }
    });

    useEffect(() => {
        async function fetchById() {
            if (personnelId) {
                // setShowBackdrop(true);
                // const response = await dispatch(getPersonnelById(personnelId)) as any;
                // if (response.type.includes('fulfilled')) {
                //     setPersonnelInfo(response.payload.product);
                //     setShowBackdrop(false);
                // } else {
                //     toast(response.error.message, { type: 'error' });
                //     navigate('./../../');
                // }
            }
        }
        fetchById();


    }, []);
    

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit"
            variant="h5" href="/administration/" onClick={() => { }}>
            Administration
        </Link>,
        <Link underline="hover" key="1" color="inherit"
            variant="h5" href="/" onClick={() => { }}>
            Personnel Operations
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            variant="h5"
            onClick={() => { }}
        >
            Add New Personnel
        </Link>
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
                    <Typography variant="h5" align="center">Add New Personnel</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction="column" spacing={2}>
                            <TextField id="email" label="Email" variant="standard" value={formik.values.email} onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)} helperText={formik.touched.email && formik.errors.email} />
                            <TextField id="password" label="Password" variant="standard" value={formik.values.password} onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)} helperText={formik.touched.password && formik.errors.password} />
                            <LoadingButton startIcon={<SaveIcon />} loading={formik.isSubmitting} variant="contained" type="submit">Submit</LoadingButton>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Paper>
    );
}

export default PersonnelAdd;