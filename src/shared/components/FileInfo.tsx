import { FileText, ImageIcon, File } from 'lucide-react';
import { cn } from '@/utils/cn';
import { getFileTypeLabel } from '@/utils/promptText';
import { type FilePartialInfo } from '@/redux/uploadDocsSlice';

type FileInfoProps = {
  file: FilePartialInfo; // File;
  className?: string;
};

const FileIcon = ({ fileType }: { fileType: string }) => {
  if (fileType.startsWith('image/')) return <ImageIcon className="h-5 w-5 text-blue-500" />;
  if (fileType === 'application/pdf') return <FileText className="h-5 w-5 text-red-500" />;
  return <File className="h-5 w-5 text-gray-500" />;
};

const FileInfo = (props: FileInfoProps) => {
  const { file, className } = props;
  const { name, size, type } = file;
  const label = getFileTypeLabel(type);

  return (
    <div className={cn('flex items-center justify-between gap-3', className)}>
      <div className="flex-shrink-0">
        <FileIcon fileType={type} />
      </div>
      <div className="min-w-0 flex-1">
        <p title={file.name} className="truncate text-sm font-medium text-gray-900">
          {name}
        </p>
        <p className="text-xs text-gray-500">
          {label} • {size}
        </p>
      </div>
    </div>
  );
};

export default FileInfo;
