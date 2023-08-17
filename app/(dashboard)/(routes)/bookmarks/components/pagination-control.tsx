import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <div className=" flex space-x-4  mt-4">
      <Button
        variant="secondary"
        disabled={currentPage === 1}
        onClick={() => {
          handlePageChange(currentPage - 1);
        }}
      >
        Previous
      </Button>
      
      <div className="text-gray-600  flex-wrap">
        Page {currentPage} of {totalPages}
      </div>
      
      <Button
        variant="secondary"
        disabled={currentPage === totalPages}
        onClick={() => {
          handlePageChange(currentPage + 1);
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
