import { useEffect } from "react";

export const useDisableBodyScroll = (isOpen: boolean) => {
	useEffect(() => {
		const originalStyle = window.getComputedStyle(document.body).overflow; 
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);
}