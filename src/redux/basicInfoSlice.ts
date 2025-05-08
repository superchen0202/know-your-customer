import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type BasicInfo } from '@/forms/BasicInformation/schema';
import { possibleDefaultNation } from '@/utils/inferDefaultNation';

// TODO
const initialState: BasicInfo = {
  name: '王小明(測試用假資料)',
  email: 'yoman@funk.mail.com',
  phone: '0800-092-000',
  nationality: possibleDefaultNation,
  gender: 'prefer_not_to_say',
  address: 'XXX-XXX-XXXXXX',
  birthDate: '2009-02-29',
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
