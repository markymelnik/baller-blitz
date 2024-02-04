import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export const useDelayNavigate = (delay: number = 125) => {

	const navigate = useNavigate();

	const delayNavigate = useCallback((toRoute: string) => {
		setTimeout(() => navigate(toRoute), delay);
	},[navigate, delay])

	return delayNavigate;
}