import { PiAppWindow, PiArrowBendRightUp, PiBellLight, PiCaretDown, PiCaretLeft, PiCaretRight, PiCaretUp, PiEye, PiEyeSlash, PiHouseLight, PiMagnifyingGlassLight, PiMoon, PiSealCheck, PiShieldWarning, PiSignOut, PiStack, PiSun, PiUser, PiUserCirclePlus, PiWarningCircle, PiX } from "react-icons/pi";
import { TbBallBasketball } from "react-icons/tb";
import { MdCheck } from "react-icons/md";
import { RiGroupLine, RiMenu2Line, RiSettings2Line, RiUser4Line } from "react-icons/ri";
import './icons.scss';


export const Icons = {
	ArrowUp: PiCaretUp,
	ArrowRight: PiCaretRight,
	ArrowDown: PiCaretDown,
	ArrowLeft: PiCaretLeft,
	Check: MdCheck,
	Close: PiX,
	Home: PiHouseLight,
	Profile: RiUser4Line,
	Gear: RiSettings2Line,
	Basketball: TbBallBasketball,
	Logout: PiSignOut,
	SheildWarning: PiShieldWarning,
	SealCheck: PiSealCheck,
	Warning: PiWarningCircle,
	EyeOpen: PiEye,
	EyeClose: PiEyeSlash,
	Search: PiMagnifyingGlassLight,
	User: PiUser,
	Users: RiGroupLine,
	UserAdd: PiUserCirclePlus,
	Bell: PiBellLight,
	Sun: PiSun,
	Moon: PiMoon,
	ArrowUpRight: PiArrowBendRightUp,
	Stack: PiStack,
	Menu: RiMenu2Line,
	Dashboard: PiAppWindow,
}