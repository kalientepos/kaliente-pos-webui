import { Button, Card } from "@mui/material";
import { FormikErrors, useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppPage from "../../components/page/page";
import AdministrationService from "../../services/administration-service";
import { registerPersonnel } from "../../store/slices/administration/administration-thunk";
import { register } from "../../store/slices/auth/auth-slice";

interface RegisterPersonnelForm {
    email: '',
    password: ''
}

function PersonnelAdd() {

    const {personnelId} = useParams();
    

    const toast = useRef<any>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (data) => {
            let errors: FormikErrors<RegisterPersonnelForm> = {};

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

            const response = await Promise.resolve(dispatch(registerPersonnel(data))) as any;
            console.log(response);


            if(response === null) {
                toast.current.show({severity:'error', summary: 'Error', detail: 'There has been a problem handling the request.',  life: 3000});
            }
            if(response.status === 200) {
                console.warn(response.data.registeredPersonnelEmail);
                toast.current.show({severity: 'success', summary: `Personnel ${response.registeredPersonnelEmail} has been successfully registered!`});
                navigate('/');
            } else {
                toast.current.show({severity:'error', summary: 'Timeout Error', detail: 'Server has failed to respond in time.',  life: 3000});
            }

            formik.resetForm();
        }
    });

    return (
        <div>
                <p className='text-center text-primary text-4xl font-bold m-3 justify-content-start'>Register Personnel</p>
                <Card className='surface-100 shadow-7 w-6'>
                    <form className='p-fluid' onSubmit={formik.handleSubmit}>
                        <div className="field pb-3">
                            <span className="p-float-label">
                                <input id="email" name="email" value={formik.values.email} onChange={formik.handleChange} autoFocus />
                                <label htmlFor="email">Email</label>
                            </span>
                            {
                                (formik.errors.email && formik.touched.email )  && <p className='text-xs text-pink-400 pt-2 pb-2'>{formik.errors.email}</p>
                            }
                        </div>
                        
                        <div className="field pb-3">
                            <span className="p-float-label">
                                <input id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                                <label htmlFor="password">Password</label>
                            </span>
                            {
                                (formik.errors.password && formik.touched.password )  && <p className='text-xs text-pink-400 pt-2 pb-2'>{formik.errors.password}</p>
                            }
                        </div>
                        
                        <Button type="submit" title="Register"/>
                    </form>
                </Card>
        </div>
    );
}

export default PersonnelAdd;