import { type ChangeEvent, type ReactNode, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import Button from '../Button';
import FileInfo from '../../../shared/components/FileInfo';
import { cn } from '@/utils/cn';
import { formatFileSize } from '@/utils/promptText';
import { parseToPartialInfo } from '@/utils/promptText';
import { FilePartialInfo } from '@/redux/uploadDocsSlice';

export type FileUploadProps = {
  accept?: string;
  multiple?: boolean;
  maxBytes?: number; // in bytes
  partialFileInfo?: FilePartialInfo[];
  files: File[];
  onChange: (files: File[]) => void;
  onError: (error: string) => void;
  children?: ReactNode | ((props: { triggerUpload: () => void }) => ReactNode);
  className?: string;
};

const FileUpload = (props: FileUploadProps) => {
  const { accept, multiple = false, maxBytes, files, onChange, onError, children, className, partialFileInfo } = props;

  const [filePartialInfo, setFilePartialInfo] = useState(partialFileInfo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    // Validate file types
    if (accept) {
      const acceptedTypes = accept.split(',');
      const invalidFiles = selectedFiles.filter((file) => {
        const fileExtension = `.${file.name.split('.').pop()}`;
        const fileType = file.type;
        return !acceptedTypes.some((type) =>
          type.startsWith('.') ? fileExtension.toLowerCase() === type.toLowerCase() : fileType === type,
        );
      });

      if (invalidFiles.length > 0) {
        onError?.(`File${invalidFiles.length > 1 ? 's' : ''} must be one of the accepted formats: ${accept}`);
        return;
      }
    }

    if (maxBytes) {
      const oversizedFiles = selectedFiles.filter((file) => file.size > maxBytes);
      if (oversizedFiles.length > 0) {
        const errorMessage = `File${oversizedFiles.length > 1 ? 's' : ''} exceed${oversizedFiles.length === 1 ? 's' : ''} the maximum size of ${formatFileSize(maxBytes)}`;
        onError?.(errorMessage);
        return;
      }
    }
    const newFiles = multiple ? [...files, ...selectedFiles] : selectedFiles;
    onChange(newFiles);

    const x = newFiles.map((newFiles) => parseToPartialInfo(newFiles));
    setFilePartialInfo(x);
  };

  const handleDeleteFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onChange(newFiles);

    const x = newFiles.map((newFiles) => parseToPartialInfo(newFiles));
    setFilePartialInfo(x);

    // reset the file input value to allow re-uploading the same file
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
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
      </div>

      {filePartialInfo && (
        <div className="mt-4 space-y-2">
          {filePartialInfo.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-2 rounded-md border bg-gray-50 p-3"
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
  );
};

export default FileUpload;
