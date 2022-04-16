import { ActionReducerMapBuilder, AnyAction, createAsyncThunk, current } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { AuthenticationRequestDto } from "../../../models/dtos/auth/authentication.request";
import { AuthenticationResponseDto } from "../../../models/dtos/auth/authentication.response";
import AuthService from "../../../services/auth-service";

const initialState = { email: '', token: '', role: ''};

//#region [Thunks]
export const loginWithCredentials = createAsyncThunk<AuthenticationResponseDto, AuthenticationRequestDto>(
    'auth/login',
    async(loginDto, thunkAPI) => {
        const response = await AuthService.authenticate(loginDto);
        console.warn(response)
        if(response.data.payload) {
            console.log(jwtDecode(response.data.payload['jwt']));
            return response.data.payload as AuthenticationResponseDto;
        }
        else return thunkAPI.rejectWithValue(null);
    }
);
//#endregion

//#region [Thunk Builder]
const authThunkBuilder = (builder: ActionReducerMapBuilder<any>) => {

    builder.addCase(loginWithCredentials.pending, (state: any) => {
        console.log('[Authenticate] STILL PENDING...');
    });

    builder.addCase(loginWithCredentials.fulfilled, (state: any, action) => {
        console.log('[Authenticate] FULFILLED...');
        const decodedInfo: any = jwtDecode(action.payload['jwt']);
        state.token = action.payload['jwt'];
        state.email = decodedInfo.sub;
        state.role = decodedInfo.scopes
    });

    builder.addCase(loginWithCredentials.rejected, (state: any) => {
        console.log('[Authenticate] FAILED!');
        state.email = initialState.email;
        state.token = initialState.token;
        state.role = initialState.role;
    });

}
//#endregion

export default authThunkBuilder;