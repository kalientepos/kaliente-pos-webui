import { createSlice, current } from '@reduxjs/toolkit';
import adminstrationThunkBuilder from './administration-thunk';

export interface AdministationState {
  personnelList: PersonnelListState;
}

export interface PersonnelListState {
  isLoading: boolean;
  personnel: Array<any>;
  errorMsg: string | null;
  removeDialog: {
    isOpen: boolean;
    personnelEmailToRemove: string | null;
  };
}

const initialState: AdministationState = {
  personnelList: {
    isLoading: false,
    personnel: [],
    errorMsg: null,
    removeDialog: {
      isOpen: false,
      personnelEmailToRemove: null,
    },
  },
};

const administrationSlice = createSlice({
  name: 'Administration',
  initialState,
  reducers: {
    removePersonnelsFromPage(state) {
      state.personnelList.personnel = [];
      state.personnelList.errorMsg = null;
      state.personnelList.isLoading = false;
    },
    showRemoveDialog(state, action) {
      state.personnelList.removeDialog = {
        isOpen: true,
        personnelEmailToRemove: action.payload,
      };
    },
    hideRemoveDialog(state) {
      state.personnelList.removeDialog = {
        isOpen: false,
        personnelEmailToRemove: null,
      };
    },
  },
  extraReducers: (builder) => adminstrationThunkBuilder(builder),
});
export const { removePersonnelsFromPage, showRemoveDialog, hideRemoveDialog } =
  administrationSlice.actions;
export default administrationSlice.reducer;
