import { Button, Card } from "@mui/material";
import { FormikErrors, useFormik, useFormikContext } from "formik";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/page/page";
import { ProductDto } from "../../models/dtos/product/product.dto";
import ProductCatalogueService from "../../services/product-catalogue-service";
import { createProductCatalogue, getProductCatalogueById, updateProductCatalogue } from "../../store/slices/product-catalogues/prod-catalogues-thunk";
import { getProductById } from "../../store/slices/products/products-thunk";

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

    const dispatch = useDispatch();

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
                dispatch(updateProductCatalogue(data));
            } else {
                dispatch(createProductCatalogue(data));
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

        };
        
    }, []);

    useEffect(() => {
        console.log('changed product catalogue!');
        formik.values.title = productCatalogue.title;
        formik.values.description = productCatalogue.description;
        

    }, [productCatalogue]);

    return (
        <div>
            <Card>
                <form className="p-fluid" onSubmit={formik.handleSubmit}>
                    <div className="field pb-3">
                        <span className="p-float-label">
                            <input id="title" name="title" value={formik.values.title} onChange={formik.handleChange} autoFocus />
                            <label htmlFor="title">Title</label>
                        </span>
                        {
                            (formik.errors.title && formik.touched.title )  && <p className='text-xs text-pink-400 pt-2 pb-2'>{formik.errors.title}</p>
                        }
                    </div>
                    <div className="field pb-3">
                        <span className="p-float-label">
                            <input id="description" name="description" value={formik.values.description} onChange={formik.handleChange} autoFocus />
                            <label htmlFor="description">Description</label>
                        </span>
                        {
                            (formik.errors.description && formik.touched.description )  && <p className='text-xs text-pink-400 pt-2 pb-2'>{formik.errors.description}</p>
                        }
                    </div>
                    <Button />
                </form>
            </Card>
        </div>
    )
};

export default ProductCatalogueAdd;