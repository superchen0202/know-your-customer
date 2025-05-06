import { useState } from 'react';
import FormContainer from '../shared/components/FormContainer';
import UploadSection from './ui/FileUpload/UploadSection';
import { SINGLE_FILE_MAX_MB, MULTI_FILES_MAX_MB } from '@/constants/filesUnitsAndLimitation';
import { convertMegaBytesToBytes } from '@/utils/unitsConverter';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateUploadDocs } from '@/redux/uploadDocsSlice';
import { parseToPartialInfo } from '@/utils/promptText';
import DataDisplayer from '@/shared/components/DataDisplayer';

const UploadPage = () => {
  const uploadDocsState = useAppSelector((state) => state.uploadDocs);
  const { idFront, idBack, additionalDocs } = uploadDocsState;
  const dispatch = useAppDispatch();

  // Local state to store actual File objects
  const [idFrontFiles, setIdFrontFiles] = useState<File[]>([]);
  const [idBackFiles, setIdBackFiles] = useState<File[]>([]);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);

  // Handle file changes for ID Front
  const handleIdFrontChange = (files: File[]) => {
    setIdFrontFiles(files);
    if (files.length > 0) {
      dispatch(
        updateUploadDocs({
          field: 'idFront',
          value: parseToPartialInfo(files[0]),
        }),
      );
    } else {
      dispatch(
        updateUploadDocs({
          field: 'idFront',
          value: null,
        }),
      );
    }
  };

  // Handle file changes for ID Back
  const handleIdBackChange = (files: File[]) => {
    setIdBackFiles(files);
    if (files.length > 0) {
      dispatch(
        updateUploadDocs({
          field: 'idBack',
          value: parseToPartialInfo(files[0]),
        }),
      );
    } else {
      dispatch(
        updateUploadDocs({
          field: 'idBack',
          value: null,
        }),
      );
    }
  };

  // Handle file changes for Additional Documents
  const handleAdditionalDocsChange = (files: File[]) => {
    setAdditionalFiles(files);
    dispatch(
      updateUploadDocs({
        field: 'additionalDocs',
        value: files.map(parseToPartialInfo),
      }),
    );
  };

  return (
    <FormContainer>
      <DataDisplayer debugData={uploadDocsState}></DataDisplayer>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold">Document Upload</h1>

        <div className="space-y-6">
          <UploadSection
            required
            title="ID Card Front"
            accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
            maxBytes={convertMegaBytesToBytes(SINGLE_FILE_MAX_MB)}
            description={`Upload the front side of your ID card (jpg, png, pdf formats, ${SINGLE_FILE_MAX_MB} MB size limit)`}
            files={idFrontFiles}
            onChange={handleIdFrontChange}
            partialFileInfo={idFront && [idFront]}
          />

          <UploadSection
            required
            title="ID Card Back"
            accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
            maxBytes={convertMegaBytesToBytes(SINGLE_FILE_MAX_MB)}
            description={`Upload the back side of your ID card (jpg, png, pdf formats, ${SINGLE_FILE_MAX_MB} MB size limit)`}
            files={idBackFiles}
            onChange={handleIdBackChange}
            partialFileInfo={idBack && [idBack]}
          />

          <UploadSection
            title="Additional Documents"
            accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
            multiple
            maxBytes={convertMegaBytesToBytes(MULTI_FILES_MAX_MB)}
            description="Upload any additional documents (jpg, png, pdf formats, 10MB size limit per file)"
            files={additionalFiles}
            onChange={handleAdditionalDocsChange}
            partialFileInfo={additionalDocs}
          />
        </div>
      </div>
    </FormContainer>
  );
};

export default UploadPage;
