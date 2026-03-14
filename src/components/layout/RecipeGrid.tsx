import { useRecipes } from '@/lib/hooks/useRecipes'
import { useSearchParams } from 'react-router-dom'
import RecipeCard from '../customComponents/RecipeCard'
import Pagination from '@/components/customComponents/Pagination'
import { motion, AnimatePresence } from 'framer-motion'
import Loader  from '@/components/customComponents/Skeleton';

const PAGE_SIZE = 12;

const RecipeGrid = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    search: searchParams.get('search') ?? '',
    category: searchParams.get('category') ?? '',
    cuisine: searchParams.get('cuisine') ?? '',
    page: Number(searchParams.get('page') ?? '1'),
  }

  const { data, isLoading, isError } = useRecipes(filters)

  const totalPages = Math.ceil((data?.length ?? 0) / PAGE_SIZE)
  const paginatedData = data?.slice(
    (filters.page - 1) * PAGE_SIZE,
    filters.page * PAGE_SIZE
  )

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(page))
      return prev
    })
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }


  if (isLoading) return <Loader/>

  if (isError) return (
    <div className='flex flex-col items-center justify-center py-20'>
      <div className='text-text-secondary'>Error loading recipes. Please try again.</div>
    </div>
  )

  if (!data?.length) return (
    <div className='flex flex-col gap-2 items-center justify-center py-20'>
      <div className='text-xl text-text-secondary font-serif'>No recipes found</div>
      <div className='text-text-secondary text-sm'>Try searching with different keywords or filters</div>
    </div>
  )

  return (
    <>
      <div className='mx-10 mb-10 mt-12'>
        <h2 className='font-serif text-4xl text-text-primary'>
          {!filters.search && !filters.category && !filters.cuisine
            ? 'Popular '
            : filters.category
              ? <>{filters.category} </>
              : filters.cuisine
                ? <>{filters.cuisine} </>
                : <>Results for </>
          }
          <span className='text-accent'>
            {!filters.search && !filters.category && !filters.cuisine
              ? 'Recipes'
              : filters.category
                ? 'Recipes'
                : filters.cuisine
                  ? 'Cuisine'
                  : `"${filters.search}"`
            }
          </span>
        </h2>
      </div>

      <AnimatePresence mode='wait'>
        <motion.div
          key={filters.page}  // key change triggers animation
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 xl:px-20'>
            {paginatedData?.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}

export default RecipeGrid