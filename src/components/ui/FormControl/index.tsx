import { ReactNode } from 'react';
import Label, { type LabelProps } from '../Label';
import { RequireProps } from '@/types/utilityTypes';
import ErrorMessage from '../../ErrorMessage';

type FormControlProps = {
  children: ReactNode;
  isRequired?: boolean;
  error?: string; //TODO
} & RequireProps<LabelProps, 'title' | 'htmlFor'>;

const FormControl = (props: FormControlProps) => {
  const { isRequired, children, title, error, ...restProps } = props;
  return (
    <div className="flex flex-col">
      <Label {...restProps}>
        <span className="flex items-center justify-center pl-1">
          {title}
          {isRequired && <span className="pt-1 text-sm text-red-500">*</span>}
        </span>
      </Label>

      {children}

      {/* TODO */}
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default FormControl;
