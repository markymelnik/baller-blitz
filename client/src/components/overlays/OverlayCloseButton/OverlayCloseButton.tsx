import { PiX } from 'react-icons/pi';
import './overlay-close-btn.scss';


type OverlayOkButtonProps = {
  onClose: () => void;
};

export const OverlayCloseButton = ({ onClose }: OverlayOkButtonProps) => {
  return (
    <button className='overlay-close-btn' onClick={onClose}>
      <PiX />
    </button>
  );
};
