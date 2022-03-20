import axios, { AxiosResponse } from "axios";
import { baseApiUrl } from "../models/constants";
import { LoginDto } from "../models/dtos/auth/login-dto";
import { RegisterDto } from "../models/dtos/auth/register-dto";
import getClient from './clients/http-client';

class AuthService {

    async getPersonnelList() {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/getPersonnelList`);
            return response;
        } catch (err: any) {
            return err.response;
        }
    }

    async authenticate(authenticateDto: LoginDto) {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/authenticate`, authenticateDto);
            if(response !== undefined) {
                console.log(`Storing data on local storage: ${response.data.data}`);
                localStorage.removeItem('token');
                localStorage.setItem('token', response.data.data);
            }
            return response;
        } catch (err: any) {
            localStorage.removeItem('token');
            return err.response;
        }
    }

    async register(registerDto: RegisterDto) {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/register`, registerDto);
            return response.data;
        } catch (err: any) {
            return err.response;
        }
    }

    async registerAdmin(registerAdminDto: any) {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/registerAdmin`, registerAdminDto);
            return response;
        } catch (err: any) {
            return err.response;
        }
    }

    async registerPersonnel(registerPersonnelDto: any) {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/registerPersonnel`, registerPersonnelDto);
            return response;
        } catch (err: any) {
            return err.response;
        }
    }


}

export default AuthService;