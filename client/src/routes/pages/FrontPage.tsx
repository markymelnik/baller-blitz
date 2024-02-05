import { LogoutButton } from "../../components/buttons/LogoutButton/LogoutButton.tsx";
import { NavigateToProfileButton } from "../../components/buttons/nav/NavigateToProfileButton.tsx";
import '../../components/Front/front.scss';
import { ListOfGamesToday } from "../../GameData/ListOfGamesToday.tsx";

export const FrontPage = () => {

	return (
		<div className="front-page">
			<div className="front-page-header">Front</div>
			<ListOfGamesToday />
			<NavigateToProfileButton />
			<LogoutButton />
		</div>
	)
}