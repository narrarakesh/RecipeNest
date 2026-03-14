interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null

  return (
    <div className='flex items-center justify-center gap-2 py-10'>

      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='px-4 py-2 rounded-full border border-border text-text-secondary 
                   hover:border-accent hover:text-accent transition-all duration-200
                   disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
      >
        ← Prev
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-full border transition-all duration-200 cursor-pointer
            ${currentPage === page
              ? 'bg-accent text-white border-accent'
              : 'border-border text-text-secondary hover:border-accent hover:text-accent'
            }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='bg-background px-4 py-2 rounded-full border border-border text-text-secondary 
                   hover:border-accent hover:text-accent transition-all duration-200
                   disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer'
      >
        Next →
      </button>

    </div>
  )
}

export default Pagination