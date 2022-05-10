import { Backdrop, Breadcrumbs, Button, Card, CircularProgress, Container, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import { FormikErrors, useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProduct, getProductById, updateProduct } from "../../store/slices/products/products-thunk";
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from "../../store";
import Box from '@mui/material/Box';
import { clearProducts } from "../../store/slices/products/products-slice";
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';
import { getProductCatalogueById } from "../../store/slices/product-catalogues/prod-catalogues-thunk";

interface ProductCatalogueCreateForm {
    title: string;
    description: string;
    price: number;
}

function ProductAdd() {

    const { productId } = useParams();

    const [product, setProduct] = useState({
        id: '',
        title: '',
        description: '',
        price: 0
    });

    const [showBackdrop, setShowBackdrop] = React.useState(false);


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: product,
        validate: (data) => {
            let errors: FormikErrors<ProductCatalogueCreateForm> = {};

            if (!data.title) {
                errors.title = 'Product must have a valid title!'
            }
            
            if (!data.price) {
                errors.price = 'Product must have a defined price!';
            }

            return errors;
        },
        onSubmit: async (data) => {
            if (productId) {
                const result = await dispatch(updateProduct(data));
                if (result.type.includes('fulfilled')) {
                    toast('Successfully updated existing product!', { type: 'success' });
                    navigate('./../../');
                } else {
                    toast(`An error occurred.`, { type: 'error' });
                }
            } else {
                const result = await dispatch(createProduct(data));
                if (result.type.includes('fulfilled')) {
                    toast('Successfully added new product!', { type: 'success' });
                    navigate('./../');
                } else {
                    toast(`An error occurred.`, { type: 'error' });
                }
            }

        }
    });

    useEffect(() => {
        async function fetchById() {
            if (productId) {
                setShowBackdrop(true);
                const response = await dispatch(getProductById(productId)) as any;
                if (response.type.includes('fulfilled')) {
                    setProduct(response.payload.foundProduct);
                    setShowBackdrop(false);
                } else {
                    toast(response.error.message, { type: 'error' });
                    navigate('./../../');
                }
            }
        }
        fetchById();

        return () => {
            dispatch(clearProducts());
        };

    }, []);

    useEffect(() => {
        console.log(product);
        formik.values.title = product.title;
        formik.values.description = product.description;
        formik.values.price = product.price;

    }, [product]);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit"
            variant="h5" href="/" onClick={(e) => { e.preventDefault(); navigate('./../'); }}>
            Products
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            variant="h5"
            onClick={() => { }}
        >
            Add New Product
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
                    <Typography variant="h5" align="center">Add Product</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction="column" spacing={2}>
                            <TextField id="title" label="Title" variant="standard" value={formik.values.title} onChange={formik.handleChange} error={formik.touched.title && Boolean(formik.errors.title)} helperText={formik.touched.title && formik.errors.title} />
                            <TextField id="description" label="Description" variant="standard" value={formik.values.description} onChange={formik.handleChange} error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description} />
                            <TextField id="price" label="Price" variant="standard" value={formik.values.price} onChange={formik.handleChange} error={formik.touched.price && Boolean(formik.errors.price)} helperText={formik.touched.price && formik.errors.price} />
                            <LoadingButton startIcon={<SaveIcon />} loading={formik.isSubmitting} variant="contained" type="submit">Submit</LoadingButton>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Paper>
    );
};

export default ProductAdd;