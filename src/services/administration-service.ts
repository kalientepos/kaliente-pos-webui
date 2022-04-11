import axios, { AxiosError, AxiosResponse } from "axios";
import { baseApiUrl } from "../models/constants";
import { AuthenticationRequestDto } from "../models/dtos/auth/authentication.request";
import { RegisterDto } from "../models/dtos/auth/register-dto";
import getClient from './clients/http-client';

class AdministrationService {

    async getPersonnelList() {
        try {
            const response = await getClient().get(`${baseApiUrl}/auth/getPersonnelList`);
            return response;
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

export default AdministrationService;