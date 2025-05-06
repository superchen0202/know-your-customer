import { configureStore } from '@reduxjs/toolkit';
import formStepsSlice from './formStepsSlice';
import basicInfoSlice from './basicInfoSlice';
import uploadDocsSlice from './uploadDocsSlice';

export const store = configureStore({
  reducer: {
    formSteps: formStepsSlice,
    basicInfo: basicInfoSlice,
    uploadDocs: uploadDocsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
