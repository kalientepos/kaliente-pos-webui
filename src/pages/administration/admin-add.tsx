import { FormikErrors, useFormik } from "formik";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../../components/page";
import AdministrationService from "../../services/administration-service";

interface RegisterAdminForm {
    email: '',
    password: ''
}

function AdminAdd() {

    const adminService = new AdministrationService();

    const toast = useRef<any>(null);
    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (data) => {
            let errors: FormikErrors<RegisterAdminForm> = {};

            if (!data.email) {
                errors.email = 'Email is required.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }
            if(data.password.length < 3) {
                errors.password = 'Password length must be greater than 6.'
            }

            return errors;
        },
        onSubmit: async (data) => {
            const response = await adminService.registerAdmin({email: data.email, password: data.password});
            if(response === undefined) {
                toast.current.show({severity:'error', summary: 'Timeout Error', detail: 'Server has failed to respond in time.',  life: 3000});
            }
            if(response.status !== 200) {
                toast.current.show({severity:'error', summary: response.data.message, life: 3000});
            } else {
                console.table(response.data);
                console.warn(toast);
                toast.current.show({severity: 'success', summary: `Admin ${response.data} has been successfully registered!`, life: 3000});
                navigate('/');
            }

            formik.resetForm();
        }
    });

    return (
        <Page classes='flex flex-column'>
                <p className='text-center text-primary text-4xl font-bold m-3 justify-content-start'>RegisterAdmin</p>
                <Card className='surface-100 shadow-7 w-6'>
                    <form className='p-fluid' onSubmit={formik.handleSubmit}>
                        <div className="field pb-3">
                            <span className="p-float-label">
                                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} autoFocus />
                                <label htmlFor="email">Email</label>
                            </span>
                            {
                                (formik.errors.email && formik.touched.email )  && <p className='text-xs text-pink-400 pt-2 pb-2'>{formik.errors.email}</p>
                            }
                        </div>
                        
                        <div className="field pb-3">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                                <label htmlFor="password">Password</label>
                            </span>
                            {
                                (formik.errors.password && formik.touched.password )  && <p className='text-xs text-pink-400 pt-2 pb-2'>{formik.errors.password}</p>
                            }
                        </div>
                        
                        <Button type="submit" label="Register" className="mt-2 font-open-sans" disabled={formik.isSubmitting} loading={formik.isSubmitting}/>
                    </form>
                </Card>

                <Toast ref={toast}/>
        </Page>
        
    );
}

export default AdminAdd;