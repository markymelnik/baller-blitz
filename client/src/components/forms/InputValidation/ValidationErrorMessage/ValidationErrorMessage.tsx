import './val-error-message.scss';

type ValError = {
	error: string | undefined;
}

export const ValidationErrorMessage = ({ error }: ValError) => {

	return (
		<div className="val-error">{error}</div>
	)
}