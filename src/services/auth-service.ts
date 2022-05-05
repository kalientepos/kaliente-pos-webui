import axios, { AxiosError, AxiosResponse } from "axios";
import { baseApiUrl } from "../models/constants";
import { GetPersonnelListResponseDto } from "../models/dtos/administration/get-personnel-list.response";
import { RegisterAdminResponseDto } from "../models/dtos/administration/register-admin.response";
import { RegisterPersonnelResponseDto } from "../models/dtos/administration/register-personnel.response";
import { AuthenticationRequestDto } from "../models/dtos/auth/authentication.request";
import { AuthenticationResponseDto } from "../models/dtos/auth/authentication.response";
import BaseResponse from "../models/dtos/base-response";
import getClient from './clients/http-client';

type ApiResponse<T> = AxiosResponse<BaseResponse<T>>;

const AuthService = {

    async getPersonnelList(): Promise<ApiResponse<GetPersonnelListResponseDto>>  {
        try {
            const response = await getClient().get(`${baseApiUrl}/auth/getPersonnelList`);
            return response;
        } catch (err: any) {
            return err.response;
        }
    },

    async authenticate(authenticateDto: AuthenticationRequestDto): Promise<ApiResponse<AuthenticationResponseDto>>  {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/authenticate`, authenticateDto);
            console.warn(response)
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

    async registerAdmin(registerAdminDto: any): Promise<ApiResponse<RegisterAdminResponseDto>>  {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/registerAdmin`, registerAdminDto);
            return response;
        } catch (err: any) {
            return err.response;
        }
    },

    async registerPersonnel(registerPersonnelDto: any): Promise<ApiResponse<RegisterPersonnelResponseDto>>  {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/registerPersonnel`, registerPersonnelDto);
            return response;
        } catch (err: any) {
            return err.response;
        }
    },


}

export default AuthService;