import { Icons } from '../../../lib/Icons';
import './overlay-close-btn.scss';

type OverlayOkButtonProps = {
  onClose: () => void;
};

export const OverlayCloseButton = ({ onClose }: OverlayOkButtonProps) => {
  return (
    <button className='overlay-close-btn' onClick={onClose}>
      <Icons.Close />
    </button>
  );
};
