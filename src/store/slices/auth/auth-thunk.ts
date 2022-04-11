import { ActionReducerMapBuilder, AnyAction, createAsyncThunk, current } from "@reduxjs/toolkit";
import { AuthenticationRequestDto } from "../../../models/dtos/auth/authentication.request";
import { AuthenticationResponseDto } from "../../../models/dtos/auth/authentication.response";
import AuthService from "../../../services/auth-service";

//#region [Thunks]
export const loginWithCredentials = createAsyncThunk<AuthenticationResponseDto, AuthenticationRequestDto>(
    'auth/login',
    async(loginDto, thunkAPI) => {
        console.warn(loginDto);
        const response = await AuthService.authenticate(loginDto);
        console.log(response);
        if(response)
            return response.data.payload as AuthenticationResponseDto;
        else return response;
    }
);
//#endregion

//#region [Thunk Builder]
const authThunkBuilder = (builder: ActionReducerMapBuilder<any>) => {

    builder.addCase(loginWithCredentials.pending, (state: any) => {
        console.log('STILL PENDING...');
    });

    builder.addCase(loginWithCredentials.fulfilled, (state: any) => {
        console.log('FULFILLED...');
    });

    builder.addCase(loginWithCredentials.rejected, (state: any) => {
        console.log('FAILED!');
    });

}
//#endregion

export default authThunkBuilder;