import { useCallback, useState } from "react";

interface UsePaginationProps {
  itemsTotal: number;
}
const PAGE_SIZE = 4;

export function usePagination({ itemsTotal }: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(itemsTotal / PAGE_SIZE);
  const [offset, setOffset] = useState<number>(0);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setOffset((page - 1) * PAGE_SIZE);
  };

  const onTotalPagesChange = useCallback((totalItems: number) => {
    setTotalPages(totalItems / PAGE_SIZE);
  }, []);

  return { currentPage, onPageChange, totalPages, offset, onTotalPagesChange };
}
