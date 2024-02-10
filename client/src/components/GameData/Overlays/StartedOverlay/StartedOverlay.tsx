import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { IconX } from '@tabler/icons-react';

import { useDisableBodyScroll } from '../../../../hooks/useDisableBodyScroll.ts';
import { useOutsideClick } from '../../../../hooks/useOutsideClick.ts';
import './started-overlay.scss';
import { OverlayOKButton } from '../OverlayOkButton.tsx';

type StartedOverlayProps = {
	isOpen: boolean;
	onClose: () => void;
}

export const StartedOverlay = ({ isOpen, onClose }: StartedOverlayProps) => {
	const overlayRef = useRef(null);

	const handleOverlayClose = () => {
		onClose();
	}

	useOutsideClick(overlayRef, handleOverlayClose);
  useDisableBodyScroll(isOpen);
	
	if (!isOpen) return null;

	return createPortal(
		<div className="portal-wrapper">
			<div className="started-overlay" ref={overlayRef}>
				<button className='started-overlay-close-btn' onClick={(e) => { e.stopPropagation(); handleOverlayClose(); }}>
          <IconX size={30} stroke={1.25} />
        </button>
				<div className="started-overlay-message">The game has started!</div>
				<OverlayOKButton onClose={handleOverlayClose} />
			</div>
		</div>,
		document.getElementById('portal-root')!
	)
}