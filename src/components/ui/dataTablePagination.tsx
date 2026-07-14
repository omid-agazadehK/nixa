"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

type Props = {
  page: number;
  totalPages: number;
  baseUrl: string;
};

export function DataTablePagination({ page, totalPages, baseUrl }: Props) {
  console.log(totalPages)
  return (
    <div className="flex items-center justify-end space-x-2 py-4 px-2">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {page > 1 ? (
              <PaginationPrevious href={`${baseUrl}?page=${page - 1}`} />
            ) : (
              <PaginationPrevious
                aria-disabled
                className="pointer-events-none opacity-50"
              />
            )}
          </PaginationItem>
          {totalPages <= 1 ? (
            <PaginationItem>
              <PaginationLink isActive>1</PaginationLink>
            </PaginationItem>
          ) : (
            Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`${baseUrl}?page=${index + 1}`}
                  isActive={page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          )}

          <PaginationItem>
            {page < totalPages ? (
              <PaginationNext href={`${baseUrl}?page=${page + 1}`} />
            ) : (
              <PaginationNext
                aria-disabled
                className="pointer-events-none opacity-50"
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
