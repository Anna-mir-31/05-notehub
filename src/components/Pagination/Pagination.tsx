import ReactPaginate from 'react-paginate';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  search: string;
}

const Pagination = ({ currentPage, onPageChange, search }: PaginationProps) => {
  const { data } = useQuery({
    queryKey: ['notes', currentPage, search],
    queryFn: () => fetchNotes(currentPage, search),
    placeholderData: (prev) => prev,
  });

  if (!data || !data.totalPages || data.totalPages <= 1) return null;

  return (
    <ReactPaginate
      pageCount={data.totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  );
};

export default Pagination;