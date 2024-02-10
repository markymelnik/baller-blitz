import { DatabaseQuery } from "../../queries/DatabaseQuery";

export async function updatePredictionsInDatabase() {
	try {
		await DatabaseQuery.updatePredictionOutcome();
		console.log(`Updated prediction in database.`)
	} catch (error) {
		console.error(error);
	}
}