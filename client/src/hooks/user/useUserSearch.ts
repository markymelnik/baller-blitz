import { useQuery } from "react-query";

import { ApiClient } from "../../api/ApiClient";
import { useAccessToken } from "../stateSelectors";
import { UserProfileInfo } from "../../types/userTypes";

interface UserSearchResult {
  users: UserProfileInfo[],
  totalCount: number,
}

export const useUserSeach = (query: string, page: number, pageSize: number) => {
	const accessToken = useAccessToken()!;

	return useQuery<UserSearchResult>(['search', query, page], async () => {
		if (!query) {
			return { users: [], totalCount: 0 };
	}
		const response = await ApiClient.searchAllUsers(accessToken, query, page, pageSize);
		return { users: response.users, totalCount: response.total };
	}, {
		enabled: !!query,
})
}