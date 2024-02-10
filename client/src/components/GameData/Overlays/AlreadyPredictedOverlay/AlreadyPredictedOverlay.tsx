import { useRef } from 'react';
import { createPortal } from 'react-dom';

import { useOutsideClick } from '../../../../hooks/useOutsideClick.ts';
import { useDisableBodyScroll } from '../../../../hooks/useDisableBodyScroll.ts';
import { OverlayOKButton } from '../Buttons/OKButton/OverlayOkButton.tsx';
import { OverlayCloseButton } from '../Buttons/OverlayCloseButton/OverlayCloseButton.tsx';
import './already-predicted-overlay.scss';

type AlreadyPredictedOverlayProps = {
	isOpen: boolean;
	onClose: () => void;
	predictedWinner: string | undefined;
}

export const AlreadyPredictedOverlay = ({ isOpen, onClose, predictedWinner }: AlreadyPredictedOverlayProps) => {
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
				<OverlayCloseButton onClose={handleOverlayClose} />
				<div className="already-predicted-overlay-message">{`You chose ${predictedWinner}!`}</div>
				<OverlayOKButton onClose={handleOverlayClose} />
			</div>
		</div>,
		document.getElementById('portal-root')!
	)
}