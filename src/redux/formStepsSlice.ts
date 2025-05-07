import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

const formSteps = ['basicInfo', 'uploadFiles', 'confirm'] as const;
type FormSteps = typeof formSteps;

type FormStepsState = {
  steps: FormSteps;
  currentStepIndex: number;
};

const initialState: FormStepsState = {
  steps: formSteps,
  currentStepIndex: 0,
};

export const formStepsSlice = createSlice({
  name: 'formStepsSlice',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStepIndex >= state.steps.length - 1) return;
      state.currentStepIndex += 1;
    },
    backStep: (state) => {
      if (state.currentStepIndex <= 0) return;
      state.currentStepIndex -= 1;
    },
  },
});

export const { nextStep, backStep } = formStepsSlice.actions;

export default formStepsSlice.reducer;
