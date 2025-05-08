import { useController } from 'react-hook-form';
import { type UploadDocs } from './schema';
import UploadSection from '@/components/ui/FileUpload/UploadSection';
import { buildAcceptAttribute, convertMegaBytesToBytes } from '@/utils/converter';
import { ACCEPTED_FORMATS, MAX_ID_FILE_MB } from '@/constants/validation';
import FileUpload from '@/components/ui/FileUpload';
import ErrorMessage from '@/components/ErrorMessage';

const IDBack = () => {
  const {
    field,
    fieldState: { error },
  } = useController<UploadDocs>({ name: 'idBack' });

  return (
    <>
      <UploadSection
        required
        title="ID Card Back"
        description={`Upload the back side of your ID card (jpg, png, pdf formats, ${MAX_ID_FILE_MB} MB size limit)`}
      >
        <FileUpload
          name={field.name}
          ref={field.ref}
          files={field.value ? (Array.isArray(field.value) ? field.value : [field.value]) : null}
          onChange={(files) => field.onChange(files?.[0] || null)}
          accept={buildAcceptAttribute(ACCEPTED_FORMATS)}
          maxBytes={convertMegaBytesToBytes(MAX_ID_FILE_MB)}
        />
        {error && <ErrorMessage error={error.message} />}
      </UploadSection>
    </>
  );
};

export default IDBack;
