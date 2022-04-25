import React, { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';

import {login} from '../../store/slices/auth/auth-slice';
import AuthService from '../../services/auth-service';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { Toast } from 'primereact/toast';

import { FormikErrors, useFormik } from 'formik';
import './login.scss';
import Page from '../../components/page/page';
import { loginWithCredentials } from '../../store/slices/auth/auth-thunk';
import { AuthenticationRequestDto } from '../../models/dtos/auth/authentication.request';
import { getRequestStatusFlags } from '@reduxjs/toolkit/dist/query/core/apiState';
import { Button, Card } from '@mui/material';

interface LoginForm {
    email: string;
    password: string;
}

function Login() {

    const toast = useRef<any>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    

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

            const request: AuthenticationRequestDto = { email: data.email, password: data.password };
            
            dispatch(loginWithCredentials(request))
            .then(success => navigate('/'));

            formik.resetForm();
        }
    });

    return (
        <div>
                <p className='text-center text-primary text-4xl font-bold m-3'>Kaliente POS Backoffice</p>
                <Card className='w-6'>
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
                        <Button type="submit" title="Submit" />
                    </form>
                </Card>
        </div>
    );
}

export default Login;