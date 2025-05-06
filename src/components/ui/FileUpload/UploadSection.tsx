import { useState } from 'react';
import ErrorMessage from '@/shared/components/ErrorMessage';
import FileUpload from '@/components/ui/FileUpload';
import { cn } from '@/utils/cn';
import type { FileUploadProps } from '@/components/ui/FileUpload';

type UploadSectionProps = {
  title: string;
  description: string;
  required?: boolean;
  className?: string;
} & Pick<FileUploadProps, 'accept' | 'multiple' | 'maxBytes' | 'files' | 'onChange' | 'partialFileInfo'>;

const UploadSection = (props: UploadSectionProps) => {
  const {
    title,
    description,
    required = false,
    accept,
    multiple = false,
    maxBytes,
    className,
    files,
    onChange,
    partialFileInfo,
  } = props;
  const [error, setError] = useState<string>();

  const handleChange = (files: File[]) => {
    onChange(files);
    setError(undefined);
  };

  return (
    <div className={cn('rounded-lg border bg-white p-6', className)}>
      <h3 className="mb-1 text-lg font-medium">
        {title} {required && <span className="text-red-500">*</span>}
      </h3>
      <p className="mb-4 text-sm text-gray-500">{description}</p>

      <FileUpload
        accept={accept}
        multiple={multiple}
        maxBytes={maxBytes}
        files={files}
        onChange={handleChange}
        partialFileInfo={partialFileInfo}
        onError={(error) => setError(error)}
      />
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default UploadSection;
