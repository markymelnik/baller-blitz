export function formatPercent(percentage: number) {
	return `${Math.round(percentage * 10) / 10}%`;
}