import { PiAppWindow, PiArrowBendRightUp, PiBell, PiCaretDown, PiCaretLeft, PiCaretRight, PiCaretUp, PiEye, PiEyeSlash, PiHouseLight, PiMagnifyingGlassLight, PiMoon, PiSealCheck, PiShieldWarning, PiSignOut, PiStack, PiSun, PiUser, PiUserCirclePlus, PiUsers, PiWarningCircle, PiX } from "react-icons/pi";
import { TbBallBasketball } from "react-icons/tb";
import { MdCheck } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { RiMenu2Line } from "react-icons/ri";
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
	Gear: CiSettings,
	Basketball: TbBallBasketball,
	Logout: PiSignOut,
	SheildWarning: PiShieldWarning,
	SealCheck: PiSealCheck,
	Warning: PiWarningCircle,
	EyeOpen: PiEye,
	EyeClose: PiEyeSlash,
	Search: PiMagnifyingGlassLight,
	User: PiUser,
	Users: PiUsers,
	UserAdd: PiUserCirclePlus,
	Bell: PiBell,
	Sun: PiSun,
	Moon: PiMoon,
	ArrowUpRight: PiArrowBendRightUp,
	Stack: PiStack,
	Menu: RiMenu2Line,
	Dashboard: PiAppWindow,
}