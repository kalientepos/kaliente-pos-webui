import { FormikErrors, useFormik, useFormikContext } from "formik";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/page";
import ProductCatalogueService from "../../services/product-catalogue-service";

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
    const productCatalogueService = new ProductCatalogueService();

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
                try {
                    const response = await productCatalogueService.updateProductCatalogue({
                        id: productCatalogue.id,
                        title: data.title,
                        description: data.description
                    });
                    console.warn(response);
                    if(response === undefined) {
                        toast.current.show({severity:'error', summary: 'Timeout Error', detail: 'Server has failed to respond in time.',  life: 3000});
                    }
                    if(response.status !== 201) {
                        toast.current.show({severity:'error', summary: response.data.message, life: 3000});
                    } 
                    else {
                        toast.current.show({severity: 'success', summary: `Product Catalogue (${productCatalogue.title}) Updated`, life: 3000});
                        navigate('./../');
                    }
                } catch(ex: any) {
                    console.warn(ex.response);
                    toast.current.show({severity: 'error', summary: `${ex.response.data.message}`, life: 3000});
                }
                
            } else {
                const response = await productCatalogueService.addProductCatalogue({
                    title: data.title,
                    description: data.description
                });
                

                if(response === undefined) {
                    toast.current.show({severity:'error', summary: 'Timeout Error', detail: 'Server has failed to respond in time.',  life: 3000});
                }
                if(response.status !== 201) {
                    toast.current.show({severity:'error', summary: response.data.message, life: 3000});
                } 
                else {
                    toast.current.show({severity: 'success', summary: `Product Catalogue "${data.title}" Created`, life: 3000});
                    navigate('./../');
                }
            }
        }
    });

    const getProductCatalogueDetails = useCallback(async () => {
        console.log(catalogueId);
        if(catalogueId) {
            const result = await productCatalogueService.getProductCatalogueById(catalogueId);
            setProductCatalogue(result.data);
            console.log(result);
        }

    }, []);

    useEffect(() => {
        getProductCatalogueDetails();
    }, []);

    useEffect(() => {
        console.log('changed product catalogue!');
        formik.values.title = productCatalogue.title;
        formik.values.description = productCatalogue.description;
        

    }, [productCatalogue]);

    return (
        <Page>
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
                    <Button type="submit" label="Submit" className="mt-2 font-open-sans" disabled={formik.isSubmitting} loading={formik.isSubmitting}/>
                </form>
            </Card>
            <Toast ref={toast}/>
        </Page>
    )
};

export default ProductCatalogueAdd;