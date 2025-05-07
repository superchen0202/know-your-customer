import { ReactNode, useReducer } from 'react';
import { FilesContext, FilesDispatchContext } from './FilesHooks';
import { type UploadFiles, UploadFilesAction } from './FilesHooks';

const initUploadFiles: UploadFiles = {
  idFront: undefined,
  idBack: undefined,
  additionalDocs: [],
};

const uploadFilesReducer = (state: UploadFiles, action: UploadFilesAction) => {
  switch (action.type) {
    case 'update': {
      const { field, value } = action.payload;

      if (field === 'additionalDocs') {
        return {
          ...state,
          additionalDocs: Array.isArray(value) ? value : [],
        };
      }

      return {
        ...state,
        [field]: value as File | null,
      };
    }
    // case 'clear':  return initUploadFiles;

    default:
      return state;
  }
};

export const FilesProvider = ({ children }: { children: ReactNode }) => {
  const [uploadFiles, dispatch] = useReducer(uploadFilesReducer, initUploadFiles);
  return (
    <FilesContext.Provider value={uploadFiles}>
      <FilesDispatchContext value={dispatch}>{children}</FilesDispatchContext>
    </FilesContext.Provider>
  );
};
