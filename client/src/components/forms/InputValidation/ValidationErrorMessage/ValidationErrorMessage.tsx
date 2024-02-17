import { Icons } from '../../../../lib/Icons';
import './val-error-message.scss';

type ValError = {
  error: string | undefined;
};

export const ValidationErrorMessage = ({ error }: ValError) => {
  return (
    <div className='val-error'>
      {error && (
        <>
          <span>
            <Icons.Warning />
          </span>
          {error}
        </>
      )}
    </div>
  );
};