import { ActionReducerMapBuilder, AnyAction, createAsyncThunk, current } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { GetPersonnelListResponseDto } from "../../../models/dtos/administration/get-personnel-list.response";
import { RegisterAdminRequestDto } from "../../../models/dtos/administration/register-admin.request";
import { RegisterAdminResponseDto } from "../../../models/dtos/administration/register-admin.response";
import { RegisterPersonnelRequestDto } from "../../../models/dtos/administration/register-personnel.request";
import { RegisterPersonnelResponseDto } from "../../../models/dtos/administration/register-personnel.response";
import { AuthenticationRequestDto } from "../../../models/dtos/auth/authentication.request";
import { AuthenticationResponseDto } from "../../../models/dtos/auth/authentication.response";
import BaseResponse from "../../../models/dtos/base-response";
import AuthService from "../../../services/auth-service";
import { AdministationState } from "./administration-slice";

//#region [Thunks]
export const getAllPersonnel = createAsyncThunk<GetPersonnelListResponseDto>(
    'admin/personnelList',
    async() => {
        const response = await AuthService.getPersonnelList();
        if(response.data.payload) {
            console.log(response);
            return response.data.payload as GetPersonnelListResponseDto;
        }
        else return response;
    }
);
export const registerAdmin = createAsyncThunk<RegisterAdminResponseDto, RegisterAdminRequestDto>(
    'admin/registerAdmin',
    async(requestDto, thunkAPI) => {
        const response = await AuthService.registerAdmin(requestDto);
        if(response.data.payload) {
            return response.data.payload as RegisterAdminResponseDto;
        }
        else return thunkAPI.rejectWithValue(response);
    }
);
export const registerPersonnel = createAsyncThunk<RegisterPersonnelResponseDto, RegisterPersonnelRequestDto>(
    'admin/registerPersonnel',
    async(requestDto, thunkAPI) => {
        const response = await AuthService.registerPersonnel(requestDto);
        console.warn(response.data.payload)
        if(response.data.payload) {
            return response.data.payload as RegisterPersonnelResponseDto;
        }
        else return thunkAPI.rejectWithValue(response);
    }
);
//#endregion

//#region [Thunk Builder]
const adminstrationThunkBuilder = (builder: ActionReducerMapBuilder<any>) => {

    builder.addCase(getAllPersonnel.pending, (state: AdministationState) => {
        console.log('[GetAllPersonnel] STILL PENDING...');
        state.personnelList.isLoading = true;
        state.personnelList.personnel = [];
        state.personnelList.errorMsg = null;
    });

    builder.addCase(getAllPersonnel.fulfilled, (state: AdministationState, {payload}) => {
        console.log('[GetAllPersonnel] FULFILLED...');
        
        state.personnelList.isLoading = false;
        state.personnelList.personnel = payload ? payload.foundPersonnel : [];
        state.personnelList.errorMsg = null;
    });

    builder.addCase(getAllPersonnel.rejected, (state: AdministationState, {payload}) => {
        console.log('[GetAllPersonnel] FAILED!');
        
        state.personnelList.isLoading = false;
        state.personnelList.personnel = [];
        state.personnelList.errorMsg = "Failed to retrieve personnels.";
    });

}
//#endregion

export default adminstrationThunkBuilder;