import { useAppDispatch } from '@/redux/hooks';
import Button from '@/components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { backStep, nextStep } from '@/redux/formStepsSlice';
import { useFilesContext, useFilesDispatch } from '@/contexts/FilesHooks';
import { useState } from 'react';
import ErrorMessage from '@/components/ErrorMessage';
import UploadSection from '@/components/ui/FileUpload/UploadSection';
import FileUpload from '@/components/ui/FileUpload';
import { MULTI_FILES_MAX_MB, SINGLE_FILE_MAX_MB } from '@/constants/validation';
import { convertMegaBytesToBytes } from '@/utils/converter';
import { UploadFilesError, validateUploadFiles } from './validationForUpload';

const UploadPage = () => {
  const dispatchX = useAppDispatch();

  const formData = useFilesContext();
  const { idFront, idBack, additionalDocs } = formData;
  const dispatch = useFilesDispatch();
  const [formError, setFormError] = useState<UploadFilesError>();

  const GoToNextPage = () => {
    const errors = validateUploadFiles(formData);
    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      return;
    }

    setFormError(formError);
    dispatchX(nextStep());
  };

  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 py-4">
        <h1 className="mb-3 text-2xl font-bold">Document Upload</h1>

        <div className="space-y-3">
          <UploadSection
            required
            title="ID Card Front"
            description={`Upload the front side of your ID card (jpg, png, pdf formats, ${SINGLE_FILE_MAX_MB} MB size limit)`}
          >
            <FileUpload
              accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
              maxBytes={convertMegaBytesToBytes(SINGLE_FILE_MAX_MB)}
              files={idFront ? [idFront] : []}
              onChange={(files: File[]) => {
                setFormError((pre) => ({ ...pre, idFront: undefined }));
                dispatch({
                  type: 'update',
                  payload: {
                    field: 'idFront',
                    value: files.length > 0 ? files[0] : undefined,
                  },
                });
              }}
            />
            {formError?.idFront && <ErrorMessage error={formError.idFront} />}
          </UploadSection>

          <UploadSection
            required
            title="ID Card Back"
            description={`Upload the back side of your ID card (jpg, png, pdf formats, ${SINGLE_FILE_MAX_MB} MB size limit)`}
          >
            <FileUpload
              accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
              maxBytes={convertMegaBytesToBytes(SINGLE_FILE_MAX_MB)}
              files={idBack ? [idBack] : []}
              onChange={(files: File[]) => {
                setFormError((pre) => ({ ...pre, idBack: undefined }));
                dispatch({
                  type: 'update',
                  payload: {
                    field: 'idBack',
                    value: files.length > 0 ? files[0] : undefined,
                  },
                });
              }}
            ></FileUpload>
            {formError?.idBack && <ErrorMessage error={formError.idBack} />}
          </UploadSection>

          <UploadSection
            title="Additional Documents"
            description="Upload any additional documents (jpg, png, pdf formats, 10MB size limit per file)"
          >
            <FileUpload
              multiple
              accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
              maxBytes={convertMegaBytesToBytes(MULTI_FILES_MAX_MB)}
              files={additionalDocs ?? []}
              onChange={(files: File[]) => {
                setFormError((pre) => ({ ...pre, additionalDocs: undefined }));
                dispatch({
                  type: 'update',
                  payload: {
                    field: 'additionalDocs',
                    value: files,
                  },
                });
              }}
            />
          </UploadSection>
          {formError?.additionalDocs && <ErrorMessage error={formError.additionalDocs} />}
        </div>
      </div>

      <div className="flex justify-between px-4 py-2">
        <Button startIcon={<ArrowLeft />} variant="secondary" onClick={() => dispatchX(backStep())}>
          Back
        </Button>
        <Button endIcon={<ArrowRight />} onClick={GoToNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default UploadPage;
