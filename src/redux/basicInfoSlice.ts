import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type BasicInfo } from '@/components/forms/BasicInformation/schema';
import { possibleDefaultNation } from '@/utils/inferPossibleNationAsDefault';

const initialState: BasicInfo = {
  name: '',
  email: '',
  phone: '',
  nationality: possibleDefaultNation,
  gender: '',
  address: '',
  birthDate: '', //formatDate(today), // formatDate(new Date('1981-15-31'))
};

export const basicInfoSlice = createSlice({
  name: 'basicInfoSlice',
  initialState,
  reducers: {
    updateBasicInfoForm: (state, action: PayloadAction<BasicInfo>) => Object.assign(state, action.payload),
    // resetBasicInfoForm: () => initialState,
  },
});

export const {
  updateBasicInfoForm,
  // resetBasicInfoForm
} = basicInfoSlice.actions;

export default basicInfoSlice.reducer;
