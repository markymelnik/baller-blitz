import { IconX } from '@tabler/icons-react';
import './overlay-close-btn.scss';

type OverlayOkButtonProps = {
  onClose: () => void;
};

export const OverlayCloseButton = ({ onClose }: OverlayOkButtonProps) => {
  return (
    <button className='overlay-close-btn' onClick={onClose}>
      <IconX size={30} stroke={1.25} />
    </button>
  );
};
