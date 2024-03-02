import { PiArrowBendRightUp, PiBell, PiCaretDown, PiCaretLeft, PiCaretRight, PiCaretUp, PiEye, PiEyeSlash, PiHouseLight, PiMagnifyingGlass, PiMoon, PiSealCheck, PiShieldWarning, PiSignOut, PiStack, PiSun, PiUser, PiUserCirclePlus, PiUsers, PiWarningCircle, PiX } from "react-icons/pi";
import { TbBallBasketball } from "react-icons/tb";
import { MdCheck } from "react-icons/md";
import { BsGear } from "react-icons/bs";
import './icons.scss';

export const Icons = {
	ArrowUp: PiCaretUp,
	ArrowRight: PiCaretRight,
	ArrowDown: PiCaretDown,
	ArrowLeft: PiCaretLeft,
	Check: MdCheck,
	Close: PiX,
	Home: PiHouseLight,
	Profile: PiUser,
	Gear: BsGear,
	Basketball: TbBallBasketball,
	Logout: PiSignOut,
	SheildWarning: PiShieldWarning,
	SealCheck: PiSealCheck,
	Warning: PiWarningCircle,
	EyeOpen: PiEye,
	EyeClose: PiEyeSlash,
	Search: PiMagnifyingGlass,
	User: PiUser,
	Users: PiUsers,
	UserAdd: PiUserCirclePlus,
	Bell: PiBell,
	Sun: PiSun,
	Moon: PiMoon,
	ArrowUpRight: PiArrowBendRightUp,
	Stack: PiStack,
}