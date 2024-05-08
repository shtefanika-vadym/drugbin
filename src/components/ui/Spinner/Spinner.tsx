import React from 'react';
import { StyledSpinner } from './Spinner.styled';

export interface SpinnerProps {
  className?: string;
  size?: number;
  color?: `#${string}`;
  ringWidth?: number;
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>((props, ref) => {
  return <StyledSpinner ref={ref} {...props} />;
});

Spinner.displayName = 'Spinner';
