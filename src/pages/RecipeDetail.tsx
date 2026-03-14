import { useParams, useNavigate } from 'react-router-dom'
import { useRecipeDetail } from '@/lib/hooks/useRecipeDetail'
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react'
import { useBookmarks } from '@/lib/hooks/useBookMarks'
import { useSimilarRecipes } from './../lib/hooks/useSimilarCategories';
import RecipeCard from '@/components/customComponents/RecipeCard';
import { getSteps, getYoutubeEmbedUrl } from '@/lib/utils';
import Loader  from '@/components/customComponents/Skeleton';
import PageTransition from '@/components/customComponents/PageTransition';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: recipe, isLoading, isError } = useRecipeDetail(id ?? '')
  const { isBookMarked, toggle } = useBookmarks()

  const {data:similarRecipes} = useSimilarRecipes(recipe?.category || '',recipe?.id || '');

  if (isLoading) return <Loader/>
  if (isError) return <div>Error loading recipe</div>
  if (!recipe) return null

  const steps = getSteps(recipe.instructions);


  return (
    <PageTransition>
      <div>
        
        {/* Hero Image */}
        <div className='relative h-[50vh] md:h-[60vh] overflow-hidden'>
          <img
            src={recipe.thumbnail}
            alt={recipe.name}
            className='w-full h-full object-cover'
          />

          {/* Dark overlay */}
          <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent' />


          {/* Recipe Info Overlay */}
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className='absolute top-4 left-4 z-10 flex items-center gap-2 
                      text-text-secondary bg-surface backdrop-blur-sm px-4 py-2 
                      rounded-full hover:bg-white/30 transition-all duration-200 cursor-pointer'
          >
            <ArrowLeft className='w-4 h-4' />
            Back
          </button>

          <div className='absolute bottom-0 left-0 right-0 p-8'>
            <div className='flex gap-2 mb-3'>
              <span className='bg-accent text-white text-xs font-semibold 
                              px-3 py-1 rounded-full'>
                {recipe.category}
              </span>
              <span className='bg-white/20 backdrop-blur-sm text-white 
                              text-xs font-semibold px-3 py-1 rounded-full'>
                🌍 {recipe.area}
              </span>
            </div>
            <h1 className='font-serif text-3xl md:text-5xl text-white'>
              {recipe.name}
            </h1>
            {/* Bookmark Button */}
            <button
              onClick={() => toggle(recipe)}
              className={`mt-4 px-5 py-3 rounded-full backdrop-blur-sm 
                          flex flex-row gap-2 items-center
                          transition-all duration-200 cursor-pointer
                          ${isBookMarked(recipe.id)
                            ? 'bg-accent text-white'
                            : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
            >
              {isBookMarked(recipe.id)
                ? <><BookmarkCheck className='w-5 h-5' /><p>Saved</p></>
                : <><Bookmark className='w-5 h-5' /><p>Save Recipe</p></>
              }
            </button>

            
          </div>
          
          
        </div>

        {/* Main Content */}
        <div className='max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10'>
          
          <div className='lg:col-span-1 flex flex-col gap-10'>
            
            {/* Ingredients */}
            <h2 className='font-serif text-2xl text-text-primary mb-2 mt-2'>
              Ingredients
            </h2>
            <div className='grid grid-cols-2 gap-3'>
              {recipe.ingredients.map((item, index) => (
                <div
                  key={`${index}-${item.name}`}
                  className='flex flex-row items-center justify-between
                            bg-surface2 border border-border border-l-4 border-l-accent
                            rounded-xl px-4 py-3'
                >
                  <span className='text-sm font-medium text-text-primary capitalize'>
                    {item.name}
                  </span>
                  <span className='text-sm text-text-secondary'>
                    {item.measure}
                  </span>
                </div>
              ))}
            </div>

            {/* Instructions */}
            

            <h2 className='font-serif text-2xl text-text-primary mb-2 mt-2'>
              Instructions
            </h2>
            <div className='flex flex-col gap-6'>
              {steps.map((step, index) => (
                <div key={index} className='flex flex-row gap-4'>
                  
                  {/* Step Number */}
                  <div className='shrink-0 w-8 h-8 rounded-full bg-accent 
                                  flex items-center justify-center'>
                    <span className='text-white text-sm font-semibold'>{index + 1}</span>
                  </div>

                  {/* Step Text */}
                  <p className='text-text-secondary leading-relaxed pt-1'>
                    {step}
                  </p>

                </div>
              ))}
            </div>

          </div>

          <div className='lg:col-span-1'>

            {/* YouTube Video */}
            {recipe.youtubeUrl && (
              <div className='flex flex-col gap-10'>
                <h2 className=' mt-2 mb-2 font-serif text-2xl text-text-primary'>Watch & Cook</h2>
                <div className='rounded-2xl overflow-hidden aspect-video'>
                  <iframe
                    src={getYoutubeEmbedUrl(recipe.youtubeUrl)}
                    title={recipe.name}
                    allowFullScreen
                    className='w-full h-full'
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Tags */}
        {/* Similar Recipes */}
        {similarRecipes && similarRecipes.length > 0 && (
          <div className='px-10 py-10 border-t border-border'>
            <h2 className='font-serif text-3xl text-text-primary mb-6'>
              Similar <span className='text-accent'>Recipes</span>
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-6'>
              {similarRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}


      </div>
    </PageTransition>
  )
}

export default RecipeDetail

