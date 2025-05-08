import { type ChangeEvent, ComponentProps, type ReactNode, useRef, useState } from 'react';
import { Upload, X, Trash2 } from 'lucide-react';
import Button from '../Button';
import FileInfo from '../../FileInfo';
import { cn } from '@/utils/cn';
import { formatFileSizeAsMB } from '@/utils/converter';
import { checkInvalidFormatFileNumbers, checkOverSizedFileNumbers, pickDuplicatedFiles } from '@/utils/validation';
import ErrorMessage from '@/components/ErrorMessage';

export type FileUploadProps = {
  accept?: string;
  multiple?: boolean;
  maxBytes?: number; // in bytes
  files: File[] | null;
  onChange: (files: File[] | null) => void;
  children?: ReactNode | ((props: { triggerUpload: () => void }) => ReactNode);
  className?: string;
} & Omit<ComponentProps<'input'>, 'onChange'>;

const FileUpload = (props: FileUploadProps) => {
  const { accept, multiple = false, maxBytes, files, onChange, children, className, ref, ...restProps } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleResetFiles = () => {
    onChange(null);
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length === 0) return;
    // onChange(null);
    // if (fileInputRef.current) fileInputRef.current.value = '';

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

    const existingFiles = files ?? [];
    const duplicated = pickDuplicatedFiles(selectedFiles, existingFiles);
    if (duplicated.length > 0) {
      setError(`Duplicate file(s): ${duplicated.map((f) => f.name).join(', ')}`);
      return;
    }

    if (!multiple) {
      onChange(selectedFiles);
    } else {
      const newFiles = [...existingFiles, ...selectedFiles];
      onChange(newFiles);
    }

    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDeleteFile = (index: number) => {
    setError('');

    if (!files || files.length === 0) return;

    const newFiles = [...files];
    newFiles.splice(index, 1);

    onChange(newFiles.length === 0 ? null : newFiles);

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <div className={cn('flex flex-col gap-4', className)}>
        <div className="flex items-center gap-4">
          <input
            type="file"
            className="hidden"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            {...restProps}
            ref={(node) => {
              fileInputRef.current = node;
              if (!ref) return;
              if (typeof ref === 'function') {
                ref(node);
              } else {
                ref.current = node;
              }
            }}
          />
          {/* open children to customize the upload style */}
          {typeof children === 'function'
            ? children({ triggerUpload: handleUploadClick })
            : children || (
                <Button type="button" onClick={handleUploadClick} startIcon={<Upload />}>
                  Select File{multiple ? 's' : ''}
                </Button>
              )}
          {files !== null && files.length > 0 && (
            <Button
              type="button"
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

        {files !== null && files.length > 0 && (
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
                  type="button"
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
