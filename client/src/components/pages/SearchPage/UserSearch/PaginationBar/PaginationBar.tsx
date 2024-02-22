import { Icons } from '../../../../../lib/Icons';
import './pagination-bar.scss';

interface PaginationBarProps {
	setPage: (page: number) => void;
	page: number;
	totalPages: number;
}

export const PaginationBar = ({ setPage, page, totalPages }: PaginationBarProps) => {

	const isNone: boolean = page >= totalPages;

	console.log(isNone);

	return (
		<div className="pagination-bar">
			<div className='pagination-controls'>
        <button className={`page-left-arrow ${page === 1 ? `none` : ``}`} onClick={() => setPage(page - 1)} disabled={page === 1}>
          <Icons.ArrowLeft size={20} />
        </button>
        <span>{page} of {totalPages}</span>
        <button className={`page-right-arrow ${isNone ? `none` : ``}`} onClick={() => setPage(page + 1)} disabled={isNone}>
          <Icons.ArrowRight size={20} />
        </button>
      </div>
		</div>
	)
}