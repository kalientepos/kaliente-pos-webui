import { FormikErrors, useFormik } from "formik";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/page/page";
import ProductService from "../../services/product-service";
import { createProduct, getProductById, updateProduct } from "../../store/slices/products/products-thunk";

interface ProductCreateForm {
    title: string;
    description?: string;
    price: string;
}

function ProductAdd() {
    //#region [Hooks]
    const {productId} = useParams();
    const [product, setProduct] = useState({
        id: '',
        title: '',
        description: '',
        price: 0.0
    });

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const toast = useRef<any>(null);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: product,
        validate: (data) => {
            let errors: FormikErrors<ProductCreateForm> = {};

            if(!data.title) {
                errors.title = 'Product must have a valid title!'
            }

            if(!data.price) {
                errors.price = 'Price must be within a valid range (ie. 0 - N)'
            }

            return errors;
        },
        onSubmit: async(data) => {
            if(productId) {
                dispatch(updateProduct(data));
            } else {
                dispatch(createProduct(data));
            }
        }
    });

    useEffect(() => {
        async function fetchById() {
            if(productId) {
                const response = await dispatch(getProductById(productId)) as any;
                
                if(response)
                    setProduct(response.payload.product);
            }
            
        }
        
        fetchById();
        return () => {

        };
        
    }, []);

    useEffect(() => {
        console.log('changed product catalogue!');
        formik.values.title = product.title;
        formik.values.description = product.description;
        formik.values.price = product.price;

    }, [product]);
    //#endregion

    //#region [Render]
    return (
        <Page showDrawer>
            <Card>
                <form className="p-fluid" onSubmit={formik.handleSubmit}>
                    <div className="field pb-3">
                        <span className="p-float-label">
                            <InputText id="title" name="title" value={formik.values.title} onChange={formik.handleChange} autoFocus />
                            <label htmlFor="title">Title</label>
                        </span>
                        {
                            (formik.errors.title && formik.touched.title )  && <p className='text-xs text-pink-400 pt-2 pb-2'>{formik.errors.title}</p>
                        }
                    </div>
                    <div className="field pb-3">
                        <span className="p-float-label">
                            <InputText id="description" name="description" value={formik.values.description} onChange={formik.handleChange} autoFocus />
                            <label htmlFor="description">Description</label>
                        </span>
                        {
                            (formik.errors.description && formik.touched.description )  && <p className='text-xs text-pink-400 pt-2 pb-2'>{formik.errors.description}</p>
                        }
                    </div>
                    <div className="field pb-3">
                        <span className="p-float-label">
                            <InputText id="price" name="price" type="number" value={formik.values.price} onChange={formik.handleChange} autoFocus />
                            <label htmlFor="price">Price</label>
                        </span>
                        {
                            (formik.errors.description && formik.touched.price )  && <p className='text-xs text-pink-400 pt-2 pb-2'>{formik.errors.price}</p>
                        }
                    </div>
                    <Button type="submit" label="Submit" className="mt-2 font-open-sans" disabled={formik.isSubmitting} loading={formik.isSubmitting}/>
                </form>
            </Card>
        </Page>
    )
    //#endregion
};

export default ProductAdd;