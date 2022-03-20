import axios, { AxiosResponse } from "axios";
import { baseApiUrl } from "../models/constants";
import { LoginDto } from "../models/dtos/auth/login-dto";
import { RegisterDto } from "../models/dtos/auth/register-dto";
import http from './clients/http-client';

class AuthService {

    async getPersonnelList() {
        try {
            const response = await http.post(`${baseApiUrl}/auth/getPersonnelList`);
            return response;
        } catch (err: any) {
            return Promise.reject(err.response);
        }
    }

    async authenticate(authenticateDto: LoginDto) {
        try {
            const response = await http.post(`${baseApiUrl}/auth/authenticate`, authenticateDto);
            return Promise.resolve(response);
        } catch (err: any) {
            return err.response;
        }
    }

    async register(registerDto: RegisterDto) {
        try {

            const response = await http.post(`${baseApiUrl}/auth/register`, registerDto);
            return Promise.resolve(response.data);
        } catch (err: any) {
            return Promise.reject(err.response);
        }
    }

    async registerAdmin(registerAdminDto: any) {
        try {
            const response = await http.post(`${baseApiUrl}/auth/registerAdmin`, registerAdminDto);
            return Promise.resolve(response.data);
        } catch (err: any) {
            return Promise.reject(err.response);
        }
    }

    async registerPersonnel(registerPersonnelDto: any) {
        try {
            const response = await http.post(`${baseApiUrl}/auth/registerPersonnel`, registerPersonnelDto);
            return Promise.resolve(response.data);
        } catch (err: any) {
            return Promise.reject(err.response);
        }
    }


}

export default AuthService;