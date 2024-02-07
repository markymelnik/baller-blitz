import { ReactNode } from 'react';

import { useDelayNavigate } from '../../../hooks/useDelayNavigate.ts';

interface NavigateToButtonCreator {
  toRoute: string;
  buttonText?: string;
  className?: string;
  children?: ReactNode;
}

export const NavigateToButtonCreator = ({
  toRoute,
  buttonText,
  className,
  children,
  ...props
}: NavigateToButtonCreator) => {
  const delayNavigate = useDelayNavigate();
  
  const handleClick = () => {
    delayNavigate(toRoute);
  };

  return (
    <button onClick={handleClick} className={className} {...props}>
      <div className={`nav-btn-text`}>{buttonText}</div>
      {children}
    </button>
  );
};
