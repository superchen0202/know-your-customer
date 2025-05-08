import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type BasicInfo } from '@/forms/BasicInformation/schema';
import { possibleDefaultNation } from '@/utils/inferDefaultNation';

// TODO for demo
const initialState: BasicInfo = {
  name: '王小明(測試用假資料)',
  email: 'yoman@funk.mail.com',
  phone: '0972 815 967',
  nationality: possibleDefaultNation,
  gender: undefined,
  address: 'XXX-XXX-XXXXXX',
  birthDate: '1984-02-28',
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
