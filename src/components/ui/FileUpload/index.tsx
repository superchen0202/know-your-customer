import { type ChangeEvent, type ReactNode, useRef, useState } from 'react';
import { Upload, X, Trash2 } from 'lucide-react';
import Button from '../Button';
import FileInfo from '../../FileInfo';
import { cn } from '@/utils/cn';
import { formatFileSizeAsMB } from '@/utils/promptText';
import { checkInvalidFormatFileNumbers, checkOverSizedFileNumbers, pickDuplicatedFiles } from '@/utils/validation';
import ErrorMessage from '@/components/ErrorMessage';

export type FileUploadProps = {
  accept?: string;
  multiple?: boolean;
  maxBytes?: number; // in bytes
  files: File[];
  onChange: (files: File[]) => void;
  children?: ReactNode | ((props: { triggerUpload: () => void }) => ReactNode);
  className?: string;
};

const FileUpload = (props: FileUploadProps) => {
  const { accept, multiple = false, maxBytes, files, onChange, children, className } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleResetFiles = () => {
    onChange([]);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    const invalidFormatFiles = checkInvalidFormatFileNumbers(selectedFiles, accept);
    if (invalidFormatFiles > 0) {
      setError(`File${invalidFormatFiles > 1 ? 's' : ''} must be one of the accepted formats: ${accept}`);
      return;
    }

    const overSizedFiles = checkOverSizedFileNumbers(selectedFiles, maxBytes);
    if (overSizedFiles > 0) {
      setError(
        `File${overSizedFiles > 1 ? 's' : ''} exceed${overSizedFiles === 1 ? 's' : ''} the maximum size of ${formatFileSizeAsMB(maxBytes!)}`,
      );
      return;
    }
    const duplicated = pickDuplicatedFiles(selectedFiles, files);
    if (duplicated.length > 0) {
      setError(`Duplicate file(s): ${duplicated.map((f) => f.name).join(', ')}`);
      return;
    }

    const newFiles = multiple ? [...files, ...selectedFiles] : selectedFiles;
    onChange(newFiles);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteFile = (index: number) => {
    setError('');
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onChange(newFiles);

    // reset the file input value to allow re-uploading the same file
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <div className={cn('flex flex-col gap-4', className)}>
        <div className="flex items-center gap-4">
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
          />
          {/* open children to customize the upload style */}
          {typeof children === 'function'
            ? children({ triggerUpload: handleUploadClick })
            : children || (
                <Button onClick={handleUploadClick} startIcon={<Upload />}>
                  Select File{multiple ? 's' : ''}
                </Button>
              )}
          {files.length > 0 && (
            <Button
              size="sm"
              variant="danger"
              appearance="outlined"
              onClick={handleResetFiles}
              startIcon={<Trash2 size={18} />}
            >
              Reset
            </Button>
          )}
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-2 rounded-md border border-gray-300 bg-gray-50 p-2"
              >
                <div className="min-w-0 flex-1">
                  <FileInfo file={file} />
                </div>
                <Button
                  data-ignore-upload
                  variant="danger"
                  appearance="outlined"
                  size="sm"
                  onClick={() => handleDeleteFile(index)}
                  startIcon={<X size={16} />}
                  className="flex-shrink-0"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default FileUpload;
