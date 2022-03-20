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

import { FormikErrors, FormikTouched, useFormik } from 'formik';
import './login.css';

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
        <div className='page'>
            <p style={{margin: '1rem 0', fontSize: '24px', fontWeight: 500}}>Login</p>
            <Card style={{margin: '0.5rem', width: '50%'}}>
                <form onSubmit={formik.handleSubmit} className="p-fluid" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3rem'
                }}>
                    <div className="field">
                        <span className="p-float-label">
                            <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} autoFocus />
                            <label htmlFor="email">Email</label>
                        </span>
                    </div>
                    {
                        (formik.errors.email && formik.touched.email )  && <p>{formik.errors.email}</p>
                    }
                    <div className="field">
                        <span className="p-float-label">
                            <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                            <label htmlFor="password">Password</label>
                        </span>
                    </div>
                    {
                        (formik.errors.password && formik.touched.password )  && <p>{formik.errors.password}</p>
                    }
                    <Button type="submit" label="Submit" className="mt-2" disabled={formik.isSubmitting}/>
                </form>
            </Card>

            <Toast ref={toast}/>
        </div>
    );
}

export default Login;