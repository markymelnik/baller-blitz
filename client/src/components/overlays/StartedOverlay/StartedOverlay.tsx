import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { useDisableBodyScroll } from '../../../hooks/page/useDisableBodyScroll.ts';
import { useOutsideClick } from '../../../hooks/page/useOutsideClick.ts';
import { OverlayOKButton } from '../OKButton/OverlayOkButton.tsx';
import { OverlayCloseButton } from '../OverlayCloseButton/OverlayCloseButton.tsx';
import './started-overlay.scss';
import { Content } from '../../../lib/Content.ts';

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
			<OverlayCloseButton onClose={handleOverlayClose} />
				<div className="started-overlay-message">{Content.overlay.startedOverlay.message}</div>
				<OverlayOKButton onClose={handleOverlayClose} />
			</div>
		</div>,
		document.getElementById('portal-root')!
	)
}