import { useController } from 'react-hook-form';
import { type UploadDocs } from './schema';
import UploadSection from '@/components/ui/FileUpload/UploadSection';
import { buildAcceptAttribute, convertMegaBytesToBytes } from '@/utils/converter';
import { ACCEPTED_FORMATS, MULTI_FILES_MAX_MB } from '@/constants/validation';
import FileUpload from '@/components/ui/FileUpload';
import ErrorMessage from '@/components/ErrorMessage';

const AdditionalDocs = () => {
  const {
    field,
    fieldState: { error },
  } = useController<UploadDocs>({ name: 'additionalDocs' });

  return (
    <>
      <UploadSection
        title="Additional Documents"
        description="Upload any additional documents (jpg, png, pdf formats, 10MB size limit per file)"
      >
        <FileUpload
          multiple
          name={field.name}
          ref={field.ref}
          files={Array.isArray(field.value) && field.value.length > 0 ? field.value : null}
          onChange={(files) => field.onChange(files ?? [])}
          accept={buildAcceptAttribute(ACCEPTED_FORMATS)}
          maxBytes={convertMegaBytesToBytes(MULTI_FILES_MAX_MB)}
        />
        {error && <ErrorMessage error={error.message} />}
      </UploadSection>
    </>
  );
};

export default AdditionalDocs;
