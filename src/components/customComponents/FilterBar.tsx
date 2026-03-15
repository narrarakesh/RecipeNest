import useCategories from '@/lib/hooks/useCategories'
import { Icon } from '@iconify/react'
import Loader  from '@/components/customComponents/Skeleton';


interface FilterBarProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}


const CATEGORY_ICONS: Record<string, string> = {
  Beef: 'noto:cut-of-meat',
  Chicken: 'noto:poultry-leg',
  Dessert: 'noto:shortcake',
  Lamb: 'noto:meat-on-bone',
  Miscellaneous: 'noto:fork-and-knife',
  Pasta: 'noto:spaghetti',
  Pork: 'noto:bacon',
  Seafood: 'noto:shrimp',
  Side: 'noto:green-salad',
  Starter: 'noto:spoon',
  Vegan: 'noto:leafy-green',
  Vegetarian: 'noto:broccoli',
  Breakfast: 'noto:fried-egg',
  Goat: 'noto:goat',
}

const FilterBar = ({ selectedCategory, onCategoryChange }: FilterBarProps) => {
  const { data, isLoading, isError } = useCategories();

  if (isLoading) return <Loader/>
  if (isError) return <div className='text-text-secondary'>Error fetching filters</div>

  return (
    <div className='flex flex-wrap gap-2 justify-center mx-6 mb-4'>
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
          className={`flex items-center gap-2 py-1 px-6 rounded-full cursor-pointer border transition-all duration-200
            ${selectedCategory === chip.strCategory
              ? 'bg-accent text-white border-accent'
              : 'text-text-secondary bg-surface border-border hover:border-accent hover:text-accent'
            }`}
        >
          <Icon 
            icon={CATEGORY_ICONS[chip.strCategory] ?? 'noto:fork-and-knife'} 
            className='w-4 h-4' 
          />{chip.strCategory}
        </button>
      ))}


    </div>
  )
}

export default FilterBar