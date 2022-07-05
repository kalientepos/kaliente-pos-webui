import {
  ActionReducerMapBuilder,
  AnyAction,
  createAsyncThunk,
  current,
} from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { GetPersonnelByIdResponseDto } from '../../../models/dtos/administration/get-personnel-by-id.response';
import { GetPersonnelListResponseDto } from '../../../models/dtos/administration/get-personnel-list.response';
import { GetRolesResponseDto } from '../../../models/dtos/administration/get-roles.response';
import { RegisterAdminRequestDto } from '../../../models/dtos/administration/register-admin.request';
import { RegisterAdminResponseDto } from '../../../models/dtos/administration/register-admin.response';
import { RegisterPersonnelRequestDto } from '../../../models/dtos/administration/register-personnel.request';
import { RegisterPersonnelResponseDto } from '../../../models/dtos/administration/register-personnel.response';
import { RemovePersonnelResponseDto } from '../../../models/dtos/administration/remove-personnel-response';
import { UpdatePersonnelRequest } from '../../../models/dtos/administration/update-personnel.request';
import { UpdatePersonnelResponse } from '../../../models/dtos/administration/update-personnel.response';
import { AuthenticationRequestDto } from '../../../models/dtos/auth/authentication.request';
import { AuthenticationResponseDto } from '../../../models/dtos/auth/authentication.response';
import BaseResponse from '../../../models/dtos/base-response';
import AdministrationService from '../../../services/administration-service';
import AuthService from '../../../services/auth-service';
import { AdministationState } from './administration-slice';

// #region [Thunks]
export const getAllPersonnel = createAsyncThunk<GetPersonnelListResponseDto>(
  'admin/personnelList',
  async (thunkAPI) => {
    const response = await AuthService.getPersonnelList();
    console.warn(response);
    if (response) {
      return response.data.payload;
    }
    return response;
  }
);

export const getPersonnelById = createAsyncThunk<
  GetPersonnelByIdResponseDto,
  string
>('admin/getPersonnelById', async (id, thunkAPI) => {
  const response = await AdministrationService.getPersonnelById(id);
  console.warn(response);
  if (response) {
    return response.data.payload as GetPersonnelByIdResponseDto;
  }
  return response;
});

export const removePersonnel = createAsyncThunk<
  RemovePersonnelResponseDto,
  string
>('admin/removePersonnel', async (personnelId, thunkAPI) => {
  const response = await AdministrationService.removePersonnel(personnelId);
  if (response.data.payload) {
    return response.data.payload as RemovePersonnelResponseDto;
  }
  return thunkAPI.rejectWithValue(response);
});
export const registerPersonnel = createAsyncThunk<
  RegisterPersonnelResponseDto,
  RegisterPersonnelRequestDto
>('admin/registerPersonnel', async (requestDto, thunkAPI) => {
  const response = await AuthService.registerPersonnel(requestDto);
  console.warn(response.data.payload);
  if (response.data.payload) {
    return response.data.payload as RegisterPersonnelResponseDto;
  }
  return thunkAPI.rejectWithValue(response);
});
export const registerAdmin = createAsyncThunk<
  RegisterAdminResponseDto,
  RegisterAdminRequestDto
>('admin/registerAdmin', async (requestDto, thunkAPI) => {
  const response = await AuthService.registerAdmin(requestDto);
  if (response.data.payload) {
    return response.data.payload as RegisterAdminResponseDto;
  }
  return thunkAPI.rejectWithValue(response);
});
export const updatePersonnel = createAsyncThunk<
  UpdatePersonnelResponse,
  UpdatePersonnelRequest
>('admin/updatePersonnel', async (requestDto, thunkAPI) => {
  const response = await AdministrationService.updatePersonnel(requestDto);
  console.warn(response.data.payload);
  if (response.data.payload) {
    return response.data.payload as UpdatePersonnelResponse;
  }
  return thunkAPI.rejectWithValue(response);
});

export const getSystemRoles = createAsyncThunk<GetRolesResponseDto>(
  'admin/getSystemRoles',
  async (thunkAPI) => {
    const response = await AdministrationService.getSystemRoles();
    if (response) {
      return response.data.payload as GetRolesResponseDto;
    }
    return response;
  }
);
// #endregion

// #region [Thunk Builder]
const adminstrationThunkBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(getAllPersonnel.pending, (state: AdministationState) => {
    console.log('[GetAllPersonnel] STILL PENDING...');
    state.personnelList.isLoading = true;
    state.personnelList.personnel = [];
    state.personnelList.errorMsg = null;
  });

  builder.addCase(
    getAllPersonnel.fulfilled,
    (state: AdministationState, { payload }) => {
      console.log('[GetAllPersonnel] FULFILLED...');

      state.personnelList.isLoading = false;
      state.personnelList.personnel = payload ? payload.foundPersonnel : [];
      state.personnelList.errorMsg = null;
    }
  );

  builder.addCase(
    getAllPersonnel.rejected,
    (state: AdministationState, { payload }) => {
      console.log('[GetAllPersonnel] FAILED!');

      state.personnelList.isLoading = false;
      state.personnelList.personnel = [];
      state.personnelList.errorMsg = 'Failed to retrieve personnels.';
    }
  );
};
// #endregion

export default adminstrationThunkBuilder;
