import { useQuery } from "react-query";

import { ApiClient } from "../../api/ApiClient";
import { useAccessToken } from "../stateSelectors";

export const useUserSeach = (query: string, page: number, pageSize: number) => {
	const accessToken = useAccessToken()!;

	return useQuery(['search', query], async () => {
		if (!query) return [];
		const response = await ApiClient.searchAllUsers(accessToken, query, page, pageSize);
		return response.users;
	}, {
		enabled: !!query,
})
}