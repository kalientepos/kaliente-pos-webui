import { Breadcrumbs, Button, Card, Container, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { FormikErrors, useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProductCatalogue, getProductCatalogueById, updateProductCatalogue } from "../../store/slices/product-catalogues/prod-catalogues-thunk";
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from "../../store";
import Box from '@mui/material/Box';
import { clearProductCatalogues } from "../../store/slices/product-catalogues/prod-catalogues-slice";
import SaveIcon from '@mui/icons-material/Save';

interface ProductCatalogueCreateForm {
    title: string;
    description: string;
}

function ProductCatalogueAdd() {
    const {catalogueId} = useParams();
    const [productCatalogue, setProductCatalogue] = useState({
        id: '',
        title: '',
        description: ''
    });
    
    const pageState = useAppSelector((state) => state.productCatalogue)

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const toast = useRef<any>(null);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: productCatalogue,
        validate: (data) => {
            let errors: FormikErrors<ProductCatalogueCreateForm> = {};

            if(!data.title) {
                errors.title = 'Catalogue must have a valid title!'
            }

            return errors;
        },
        onSubmit: async(data) => {
            if(catalogueId) {
                const result = await dispatch(updateProductCatalogue(data));
                if (result.type.includes('fulfilled')) {
                    navigate('./../../');
                }
            } else {
                const result = await dispatch(createProductCatalogue(data));
                if (result.type.includes('fulfilled')) {
                    navigate('./../');
                }
            }

        }
    });

    useEffect(() => {
        async function fetchById() {
            if(catalogueId) {
                const response = await dispatch(getProductCatalogueById(catalogueId)) as any;
                if(response)
                    setProductCatalogue(response.payload.product);
            }
        }
        fetchById();

        return () => {
            dispatch(clearProductCatalogues());
        };
        
    }, []);

    useEffect(() => {
        formik.values.title = productCatalogue.title;
        formik.values.description = productCatalogue.description;
    }, [productCatalogue]);

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit"
            variant="h5" href="/" onClick={(e) => { e.preventDefault(); navigate('./../'); }}>
            Product Catalogues
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            variant="h5"
            onClick={() => { }}
        >
            Add New Catalogue
        </Link>
    ];

    return (
        <Paper elevation={0}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <Container fixed>
                <Box mt={2} />
                <Paper sx={{ p: 2 }} elevation={1}>
                    <Typography variant="h5" align="center">Add Product Catalogue</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction="column" spacing={2}>
                            <TextField id="title" label="Title" variant="standard" value={formik.values.title} onChange={formik.handleChange} error={formik.touched.title && Boolean(formik.errors.title)} helperText={formik.touched.title && formik.errors.title} />
                            <TextField id="description" label="Description" variant="standard" value={formik.values.description} onChange={formik.handleChange} error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description}/>
                            <LoadingButton startIcon={<SaveIcon />} loading={formik.isSubmitting } variant="contained" type="submit">Submit</LoadingButton>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Paper>
    );
};

export default ProductCatalogueAdd;