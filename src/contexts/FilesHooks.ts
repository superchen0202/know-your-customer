import { createContext, useContext, Dispatch } from 'react';

export type UploadFiles = {
  idFront: File | undefined;
  idBack: File | undefined;
  additionalDocs?: File[];
};

export const FilesContext = createContext<UploadFiles | undefined>(undefined);

export const useFilesContext = () => {
  const context = useContext(FilesContext);
  if (!context) throw new Error('useFilesContext must be used within a FilesContextProvider');
  return context;
};

export type UploadFilesAction =
  | {
      type: 'update';
      payload: {
        field: keyof UploadFiles;
        value: File | File[] | undefined;
      };
    }
  | { type: 'clear' };
export const FilesDispatchContext = createContext<Dispatch<UploadFilesAction> | undefined>(undefined);

export const useFilesDispatch = () => {
  const context = useContext(FilesDispatchContext);
  if (!context) throw new Error('useFilesDispatch must be used within a FilesDispatchProvider');
  return context;
};

type UploadFilesError = Partial<Record<keyof UploadFiles, string>>;
export const FilesErrorContext = createContext<UploadFilesError>({});
export const FilesErrorDispatchContext = createContext<Dispatch<UploadFilesError>>(() => {});
