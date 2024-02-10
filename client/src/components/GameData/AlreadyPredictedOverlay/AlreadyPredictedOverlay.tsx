import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { IconX } from '@tabler/icons-react';

import { useOutsideClick } from '../../../hooks/useOutsideClick.ts';
import { useDisableBodyScroll } from '../../../hooks/useDisableBodyScroll.ts';
import './already-predicted-overlay.scss';

type AlreadyPredictedOverlayProps = {
	isOpen: boolean;
	onClose: () => void;
}

export const AlreadyPredictedOverlay = ({ isOpen, onClose }: AlreadyPredictedOverlayProps) => {
	const overlayRef = useRef(null);

	const handleOverlayClose = () => {
		onClose();
	}

	useOutsideClick(overlayRef, handleOverlayClose);
  useDisableBodyScroll(isOpen);

	if (!isOpen) return null;

	return createPortal(
		<div className="portal-wrapper">
			<div className="already-predicted-overlay" ref={overlayRef}>
				<button className='already-predicted-overlay-close-btn' onClick={(e) => { e.stopPropagation(); handleOverlayClose(); }}>
          <IconX size={30} stroke={1.25} />
        </button>
				<div className="already-predicted-overlay-message">You already predicted this game!</div>
			</div>
		</div>,
		document.getElementById('portal-root')!
	)
}