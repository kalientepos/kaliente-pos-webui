import { Backdrop, Breadcrumbs, Button, Card, CircularProgress, Container, FormControl, InputLabel, Link, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { FormikErrors, useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from "../../store";
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import { toast } from 'react-toastify';
import { clearProductCatalogue, loadProductCatalogue } from "../../store/slices/product-catalogues/prod-catalogues-add-slice";
import { createProductCatalogue, getAllProductCatalogues, getProductCatalogueById, updateProductCatalogue } from "../../store/slices/product-catalogues/prod-catalogues-add-thunk";

interface ProductCatalogueUpdateForm {
    id?: string;
    title: string;
    description: string;
    parentCatalogueId: string;
}

const formData : ProductCatalogueUpdateForm = {
    parentCatalogueId: '',
    title: '',
    description: ''
};

function ProductCatalogueAdd() {
    const { catalogueId } = useParams();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const pageState = useAppSelector(state => state.addProdCatalogue);
    
    const [showBackdrop, setShowBackdrop] = React.useState(false);

    const [parentCatalogueOptions, setParentCatalogueOptions] = useState([]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: pageState.productCatalogue,
        validate: (data) => {
            let errors: FormikErrors<ProductCatalogueUpdateForm> = {};

            if(!data.title) {
                errors.title = 'Catalogue must have a valid title!'
            }

            return errors;
        },
        onSubmit: async(data) => {
            if(catalogueId) {
                const result = await dispatch(updateProductCatalogue({ id: data.id!, title: data.title!, description: data.description, parentCatalogueId: data.parentCatalogueId! }));
                console.warn(result);
                if (result.type.includes('fulfilled')) {
                    toast('Successfully updated existing catalogue!', { type: 'success' });
                    navigate('./../../');
                } else {
                    toast(`An error occurred.`, {type: 'error'});
                }
            } else {
                const result = await dispatch(createProductCatalogue(data));
                console.warn(result);
                if (result.type.includes('fulfilled')) {
                    toast('Successfully added new catalogue!', { type: 'success' });
                    navigate('./../');
                } else {
                    toast(`An error occurred. ${result.payload}`, { type: 'error' });
                }
            }

        }
    });

    useEffect(() => {
        async function fetchById() {
            if(catalogueId) {
                setShowBackdrop(true);
                const response = await dispatch(getProductCatalogueById(catalogueId)) as any;
                if(response.type.includes('fulfilled')) {
                    dispatch(loadProductCatalogue(response.payload.product));
                    setShowBackdrop(false);
                } else {
                    toast(response.error.message, { type: 'error' });
                    navigate('./../../');
                }
            }
        }
        async function fetchCataloguesForParenting() {
            await dispatch(getAllProductCatalogues());
        }

        fetchById();
        fetchCataloguesForParenting();

        return () => {
            dispatch(clearProductCatalogue());
        };
        
    }, []);

    useEffect(() => {
        console.log(pageState.productCatalogue);
        formik.setFieldValue('title', pageState.productCatalogue.title);
        formik.setFieldValue('description', pageState.productCatalogue.description);
        formik.setFieldValue('parentCatalogueId', pageState.productCatalogue.parentCatalogueId!);
    }, [pageState.productCatalogue])



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

    const handleParentCatalogueIdChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);
        formik.setFieldValue('parentCatalogueId', event.target.value);
    };

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
                    <Typography variant="h5" align="center">Add Product Catalogue</Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction="column" spacing={2}>
                            <TextField id="title" label="Title" variant="standard" value={formik.values.title} onChange={formik.handleChange} error={formik.touched.title && Boolean(formik.errors.title)} helperText={formik.touched.title && formik.errors.title} />
                            <TextField id="description" label="Description" variant="standard" value={formik.values.description} onChange={formik.handleChange} error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description}/>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Parent Catalogue</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Parent Catalogue"
                                    value={(formik.values.parentCatalogueId) ? formik.values.parentCatalogueId : ''}
                                    onChange={handleParentCatalogueIdChange}
                                >
                                    {pageState.availableCatalogues.map(x => <MenuItem key={x.id!} value={x.id!}>{x.title}</MenuItem>) }
                                </Select>
                            </FormControl>
                            <LoadingButton startIcon={<SaveIcon />} loading={formik.isSubmitting } variant="contained" type="submit">Submit</LoadingButton>
                        </Stack>
                    </form>
                </Paper>
            </Container>
        </Paper>
    );
};

export default ProductCatalogueAdd;