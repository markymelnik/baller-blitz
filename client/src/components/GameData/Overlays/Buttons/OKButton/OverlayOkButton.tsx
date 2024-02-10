import './overlay-ok-btn.scss';

type OverlayOkButtonProps = {
  onClose: () => void;
};

export const OverlayOKButton = ({ onClose }: OverlayOkButtonProps) => {
  return (
    <button className='overlay-ok-btn' onClick={onClose}>
      Okay
    </button>
  );
};
