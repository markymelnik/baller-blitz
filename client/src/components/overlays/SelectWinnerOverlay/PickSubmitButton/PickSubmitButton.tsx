import { forwardRef, MouseEventHandler, ReactNode, RefObject } from 'react';

import { SelectOverlayState } from '../SelectOverlayState.ts';
import './pick-submit-btn.scss';

interface PickSubmitButtonProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  state: SelectOverlayState;
  ref?: RefObject<HTMLElement>;
}

export const PickSubmitButton = forwardRef<
  HTMLButtonElement,
  PickSubmitButtonProps
>(({ onClick, children, state, ...props }, ref) => {
  const getButtonClassName = (state: SelectOverlayState) => {
    switch (state) {
      case SelectOverlayState.CONFIRM:
        return 'pick-submit-btn confirm';
      case SelectOverlayState.SUBMIT:
        return 'pick-submit-btn submit';
      default:
        return 'pick-submit-btn select-winner';
    }
  };

  return (
    <button
      {...props}
      ref={ref}
      className={getButtonClassName(state)}
      onClick={onClick}
    >
      {children}
    </button>
  );
});
