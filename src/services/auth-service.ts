import axios, { AxiosError, AxiosResponse } from "axios";
import { baseApiUrl } from "../models/constants";
import { AuthenticationRequestDto } from "../models/dtos/auth/authentication.request";
import getClient from './clients/http-client';

const AuthService = {

    async getPersonnelList() {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/getPersonnelList`);
            return response;
        } catch (err: any) {
            return err.response;
        }
    },

    async authenticate(authenticateDto: AuthenticationRequestDto) {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/authenticate`, authenticateDto);
            if(response !== undefined) {
                console.log(`Storing data on local storage: ${response.data.payload.jwt}`);
                localStorage.removeItem('token');
                localStorage.setItem('token', response.data.payload.jwt);
            }
            return response;
        } catch (err: any) {
            localStorage.removeItem('token');
            console.log(err);
            return err.response;
        }
    },

    async registerAdmin(registerAdminDto: any) {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/registerAdmin`, registerAdminDto);
            return response;
        } catch (err: any) {
            return err.response;
        }
    },

    async registerPersonnel(registerPersonnelDto: any) {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/registerPersonnel`, registerPersonnelDto);
            return response;
        } catch (err: any) {
            return err.response;
        }
    },


}

export default AuthService;