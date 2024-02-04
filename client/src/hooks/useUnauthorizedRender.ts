import { ComponentType } from "react";

import { useAuthorize } from "./useAuthorize.ts"

export const useUnauthorizedRender = <S>(Component: ComponentType<S>, disallowedRoles: string[]): ComponentType<S> | (() => null) => {
	const { isAuthenticated, isAuthorized } = useAuthorize({ allowedRoles: disallowedRoles});
	const shouldNotRender = !isAuthenticated || !isAuthorized;
	return shouldNotRender ? Component : () => null;
}