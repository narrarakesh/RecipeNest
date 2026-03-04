import useCategories from '@/lib/hooks/useCategories'

interface FilterBarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const FilterBar = ({ selectedCategory, onCategoryChange }: FilterBarProps) => {
  const { data, isLoading, isError } = useCategories()

  if (isLoading) return <div className='text-text-secondary'>Loading filters...</div>
  if (isError) return <div className='text-text-secondary'>Error fetching filters</div>

  return (
    <div className='flex flex-wrap gap-2 justify-center'>
      <button
        onClick={() => onCategoryChange('')}
        className={`py-1 px-6 rounded-full cursor-pointer border transition-all duration-200
          ${selectedCategory === ''
            ? 'bg-accent text-white border-accent'
            : 'text-text-secondary bg-surface border-border hover:border-accent hover:text-accent'
          }`}
      >
        All
      </button>

      {data?.map((chip) => (
        <button
          key={chip.idCategory}
          onClick={() => onCategoryChange(chip.strCategory)}
          className={`py-1 px-6 rounded-full cursor-pointer border transition-all duration-200
            ${selectedCategory === chip.strCategory
              ? 'bg-accent text-white border-accent'
              : 'text-text-secondary bg-surface border-border hover:border-accent hover:text-accent'
            }`}
        >
          {chip.strCategory}
        </button>
      ))}
    </div>
  )
}

export default FilterBar