import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type FilePartialInfo = {
  name: string;
  size: string;
  type: string;
};

export type UploadDocs = {
  idFront: FilePartialInfo | undefined;
  idBack: FilePartialInfo | undefined;
  additionalDocs?: FilePartialInfo[];
};

const initialState: UploadDocs = {
  idFront: undefined,
  idBack: undefined,
  additionalDocs: [],
};
type UploadBlock = keyof UploadDocs;

type UpdateDocsPayload = {
  field: UploadBlock;
  value: FilePartialInfo | FilePartialInfo[] | null;
};

export const uploadDocsSlice = createSlice({
  name: 'uploadDocsSlice',
  initialState,
  reducers: {
    updateUploadDocs: (state, action: PayloadAction<UpdateDocsPayload>) => {
      const { field, value } = action.payload;

      if (field === 'additionalDocs') {
        state.additionalDocs = Array.isArray(value) ? value : [];
      } else {
        state[field] = value as FilePartialInfo | undefined;
      }
    },
    clearUploadDocs: () => {
      return initialState;
    },
  },
});

export const { updateUploadDocs, clearUploadDocs } = uploadDocsSlice.actions;

export default uploadDocsSlice.reducer;
