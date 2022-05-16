import { createSlice, current } from "@reduxjs/toolkit";
import adminstrationThunkBuilder from "./administration-thunk";

export interface AdministationState {
    personnelList: PersonnelListState
}

export interface PersonnelListState {
    isLoading: boolean,
    personnel: Array<any>,
    errorMsg: string | null
}

const initialState: AdministationState = {
    personnelList: {
        isLoading: false,
        personnel: [],
        errorMsg: null
    }
}

const administrationSlice = createSlice({
    name: 'Administration', 
    initialState,
    reducers: {
        removePersonnelsFromPage(state) {
            state.personnelList.personnel = [];
            state.personnelList.errorMsg = null;
            state.personnelList.isLoading = false;
        }
    },
    extraReducers: (builder) => adminstrationThunkBuilder(builder),
});
export const { removePersonnelsFromPage  } = administrationSlice.actions;
export default administrationSlice.reducer;