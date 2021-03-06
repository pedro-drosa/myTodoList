import { ButtonHTMLAttributes } from 'react';

import { FiPlus } from 'react-icons/fi';

import '../styles/button.scss';

type buttonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: buttonProps): JSX.Element {
  return (
    <button {...props}>
      <FiPlus />
      {children}
    </button>
  );
}
