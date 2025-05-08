import { useController } from 'react-hook-form';
import { type UploadDocs } from './schema';
import UploadSection from '@/components/ui/FileUpload/UploadSection';
import { convertMegaBytesToBytes, buildAcceptAttribute } from '@/utils/converter';
import { MAX_ID_FILE_MB } from '@/constants/validation';
import FileUpload from '@/components/ui/FileUpload';
import ErrorMessage from '@/components/ErrorMessage';
import { ACCEPTED_FORMATS } from '@/constants/validation';

const IDFront = () => {
  const {
    field,
    fieldState: { error },
  } = useController<UploadDocs>({ name: 'idFront' });

  return (
    <>
      <UploadSection
        required
        title="ID Card Front"
        description={`Upload the front side of your ID card (jpg, png, pdf formats, ${MAX_ID_FILE_MB} MB size limit)`}
      >
        <FileUpload
          type="file"
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

export default IDFront;
