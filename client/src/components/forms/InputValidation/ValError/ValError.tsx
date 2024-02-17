import { Icons } from '../../../../lib/Icons';
import './val-error.scss';

type ValError = {
  error: string | undefined;
};

export const ValError = ({ error }: ValError) => {
  return (error && (
    <div className='val-error'>
        <span>
          <Icons.Warning />
        </span>
        {error}
    </div>
    )
  );
};