import axios, { AxiosError, AxiosResponse } from "axios";
import { baseApiUrl } from "../models/constants";
import { GetPersonnelByIdResponseDto } from "../models/dtos/administration/get-personnel-by-id.response";
import { GetPersonnelListResponseDto } from "../models/dtos/administration/get-personnel-list.response";
import { GetRolesResponseDto } from "../models/dtos/administration/get-roles.response";
import { RegisterAdminResponseDto } from "../models/dtos/administration/register-admin.response";
import { RegisterPersonnelResponseDto } from "../models/dtos/administration/register-personnel.response";
import { AuthenticationRequestDto } from "../models/dtos/auth/authentication.request";
import BaseResponse from "../models/dtos/base-response";
import { getSystemRoles } from "../store/slices/administration/administration-thunk";
import getClient from './clients/http-client';

type ApiResponse<T> = AxiosResponse<BaseResponse<T>>;

const AdministrationService = {

    async getSystemRoles(): Promise<ApiResponse<GetRolesResponseDto>> {
        try {
            const response = await getClient().get(`${baseApiUrl}/administration/getRoles`);
            return response;
        } catch(err: any) {
            return err.response;
        }
    },

    async getPersonnelById(id: string): Promise<ApiResponse<GetPersonnelByIdResponseDto>> {
        try {
            const response = await getClient().get(`${baseApiUrl}/administration/getPersonnelById?personnelId=${id}`);
            return response;
        } catch (err: any) {
            return err.response;
        }
    },

    async getPersonnelList(): Promise<ApiResponse<GetPersonnelListResponseDto>>  {
        try {
            const response = await getClient().get(`${baseApiUrl}/auth/getPersonnelList`);
            return response;
        } catch (err: any) {
            return err.response;
        }
    },

    async registerAdmin(registerAdminDto: any): Promise<ApiResponse<RegisterAdminResponseDto>> {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/registerAdmin`, registerAdminDto);
            return response;
        } catch (err: any) {
            return err.response;
        }
    },

    async registerPersonnel(registerPersonnelDto: any): Promise<ApiResponse<RegisterPersonnelResponseDto>> {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/registerPersonnel`, registerPersonnelDto);
            return response;
        } catch (err: any) {
            return err.response;
        }
    },

    async updatePersonnel(dto: any) : Promise<ApiResponse<any>> {
        try {
            const response = await getClient().post(`${baseApiUrl}/auth/updatePersonnel`, dto);
            return response;
        } catch (err: any) {
            return err.response;
        }
    },

    async removePersonnel(dto: any): Promise<ApiResponse<any>> {
        try {
            const response = await getClient().delete(`${baseApiUrl}/administration/removePersonnel?personnelEmail=${dto}`);
            return response;
        } catch (err: any) {
            return err.response;
        }
    }


}

export default AdministrationService;