import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';

import {login} from './../../store/slices/auth-slice';
import AuthService from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';

import { FormikErrors, useFormik } from 'formik';
import './login.scss';

interface LoginForm {
    email: string;
    password: string;
}

function Login() {

    const toast = useRef<any>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authService = new AuthService();
    

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (data) => {
            let errors: FormikErrors<LoginForm> = {};

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
            const response = await authService.authenticate({email: data.email, password: data.password});
            if(response === undefined) {
                toast.current.show({severity:'error', summary: 'Timeout Error', detail: 'Server has failed to respond in time.',  life: 3000});
            }
            if(response.status !== 200) {
                toast.current.show({severity:'error', summary: response.data.message, life: 3000});
            } else {
                const userInfo: any = jwtDecode(response.data.data);
                console.table(userInfo);
                dispatch(login({email: userInfo.sub, token: response.data.data, role: userInfo.scopes}));
                navigate('/');
            }

            formik.resetForm();
        }
    });


    return (
        <div className=' flex flex-column align-items-center justify-content-center'>
            <p className='text-center text-primary text-4xl font-bold m-6'>Login</p>
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
                    
                    <Button type="submit" label="Submit" className="mt-2 font-open-sans" disabled={formik.isSubmitting} loading={formik.isSubmitting}/>
                </form>
            </Card>

            <Toast ref={toast}/>
        </div>
    );
}

export default Login;