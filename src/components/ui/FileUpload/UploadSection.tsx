import { cn } from '@/utils/cn';
import { ReactNode } from 'react';

type UploadSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
};

const UploadSection = (props: UploadSectionProps) => {
  const { title, description, children, required = false, className } = props;

  return (
    <div className={cn('rounded-lg border bg-white p-6', className)}>
      <h3 className="mb-1 text-lg font-medium">
        {title}
        {required && <span className="text-red-500">*</span>}
      </h3>
      <p className="mb-4 text-sm text-gray-500">{description}</p>
      {children}
    </div>
  );
};

export default UploadSection;
