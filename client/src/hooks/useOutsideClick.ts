import { RefObject, useEffect } from "react"

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  onOutsideClick: (event?: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
				onOutsideClick(event);
      }
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, onOutsideClick]);
};