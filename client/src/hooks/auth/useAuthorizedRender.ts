import { ComponentType } from "react";

import { useAuthorize } from "./useAuthorize.ts";

export const useAuthorizedRender = <S>(Component: ComponentType<S>, allowedRoles: string []): ComponentType<S> | (() => null) => {
	const { isAuthenticated, isAuthorized } = useAuthorize({ allowedRoles });
	const shouldRender = isAuthenticated && isAuthorized;
	return shouldRender ? Component : () => null;
}