import { ComponentProps } from 'react';
// import { RequireProps } from '@/types/basicInfo';

type ButtonProps = {
  btnText: 'Back' | 'Next' | 'Submit';
} & ComponentProps<'button'>;

const Button = (props: ButtonProps) => {
  const { btnText, ...restProps } = props;
  return <button {...restProps}>{btnText}</button>;
};

export default Button;
