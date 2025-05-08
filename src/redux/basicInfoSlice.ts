import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type BasicInfo } from '@/forms/BasicInformation/schema';
import { possibleDefaultNation } from '@/utils/inferPossibleNationAsDefault';

// TODO
const initialState: BasicInfo = {
  name: '叫我第一名',
  email: 'yoman@funk.mail.com',
  phone: '0972-359-845',
  nationality: possibleDefaultNation,
  gender: 'male',
  address: 'XXX-XXX-XXXXXX',
  birthDate: '1997-02-05',
};

//TODO
/*
const initialState: BasicInfo = {
  name: '',
  email: '',
  phone: '',
  nationality: possibleDefaultNation,
  gender: '',
  address: '',
  birthDate: '', //formatDate(today), // formatDate(new Date('1981-15-31'))
};
// */

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
