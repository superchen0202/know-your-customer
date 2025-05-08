import { ReactNode, useReducer } from 'react';
import { FilesContext, FilesDispatchContext, UploadDocsAction } from './FilesHooks';
import { type UploadDocs } from '@/forms/UploadDocument/schema';

const defaultValues: UploadDocs = {
  idFront: null,
  idBack: null,
  additionalDocs: [],
};

const uploadFilesReducer = (state: UploadDocs, action: UploadDocsAction) => {
  switch (action.type) {
    case 'update':
      return { ...action.payload };
    case 'clear':
      return defaultValues;
    default:
      return state;
  }
};

export const FilesProvider = ({ children }: { children: ReactNode }) => {
  const [uploadFiles, dispatch] = useReducer(uploadFilesReducer, defaultValues);
  return (
    <FilesContext.Provider value={uploadFiles}>
      <FilesDispatchContext value={dispatch}>{children}</FilesDispatchContext>
    </FilesContext.Provider>
  );
};
