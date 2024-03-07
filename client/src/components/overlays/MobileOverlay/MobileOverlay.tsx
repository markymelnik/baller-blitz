import { createPortal } from "react-dom";
import { useRef } from "react";

import { Icons } from "../../../lib/Icons";
import { useOutsideClick } from "../../../hooks/page/useOutsideClick";
import { LogoutButton } from "../../buttons/LogoutButton/LogoutButton";
import { NavToHomeBtn } from "../../buttons/nav/NavToHomeBtn";
import { NavToGamesBtn } from "../../buttons/nav/NavToGamesBtn";
import { NavToFriendsBtn } from "../../buttons/nav/NavToFriendsBtn";
import './mobile-overlay.scss';
import { ColorBtn } from "../../buttons/ColorBtn/ColorBtn";

type MobileOverlayProps = {
	isOpen: boolean;
	onClose: () => void;
}

export const MobileOverlay = ({ isOpen, onClose }: MobileOverlayProps) => {

	const overlayRef = useRef(null);
	useOutsideClick(overlayRef, onClose);

	return createPortal(
		<div className={`mobile-overlay ${isOpen ? `slide-in` : ``}`} ref={overlayRef}>
			<button className="mo-close-btn" onClick={onClose}><Icons.Close /></button>
			<nav className="mo-nav">
				<NavToHomeBtn />
				<NavToGamesBtn />
				<NavToFriendsBtn />
			</nav>
			<div className="mo-space"></div>
			<ColorBtn />
			<LogoutButton />
		</div>,
		document.getElementById('portal-root')!
	)
}