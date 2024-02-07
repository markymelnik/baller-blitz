import { LogoutButton } from "../../buttons/LogoutButton/LogoutButton.tsx";
import { ListOfGamesToday } from "../../GameData/ListOfGamesToday/ListOfGamesToday.tsx";
import './front-page.scss';

export const FrontPage = () => {
	return (
		<div className="front-page">
			<div className="front-page-header">Front</div>
			<div className="games-header">Games</div>
			<ListOfGamesToday />
			<LogoutButton />
		</div>
	)
}