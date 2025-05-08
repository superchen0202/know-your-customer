import { createContext, useContext, Dispatch } from 'react';
import { type UploadDocs } from '@/forms/UploadDocument/schema';

export const FilesContext = createContext<UploadDocs | undefined>(undefined);

export const useFilesContext = () => {
  const context = useContext(FilesContext);
  if (!context) throw new Error('useFilesContext must be used within a FilesContextProvider');
  return context;
};

export type UploadDocsAction =
  | {
      type: 'update';
      payload: UploadDocs;
    }
  | { type: 'clear' };
export const FilesDispatchContext = createContext<Dispatch<UploadDocsAction> | undefined>(undefined);

export const useFilesDispatch = () => {
  const context = useContext(FilesDispatchContext);
  if (!context) throw new Error('useFilesDispatch must be used within a FilesDispatchProvider');
  return context;
};
