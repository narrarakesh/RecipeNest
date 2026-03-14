import RecipeCard from "@/components/customComponents/RecipeCard";
import { useBookmarks } from "@/lib/hooks/useBookMarks"
import { useNavigate } from "react-router-dom";


const Bookmarks = () => {
  const navigate = useNavigate()
  const { bookmarks } = useBookmarks()

  return (
    <div>
      {/* Heading — always visible */}
      <div className='mx-10 mb-10 mt-12'>
        <h2 className='font-serif text-4xl text-text-primary'>
          Your
          <span className='text-accent'>{' '}Saved Recipes</span>
        </h2>
      </div>

      {/* Empty state */}
      {!bookmarks.length ? (
        <div className='flex justify-center items-center gap-4 flex-col py-32'>
          <div className='text-6xl opacity-40'>🔖</div>
          <h2 className='font-serif text-3xl text-text-secondary'>
            Nothing saved yet
          </h2>
          <p className='text-text-secondary text-center max-w-sm'>
            Tap the bookmark icon on any recipe to save it here
          </p>
          <button
            onClick={() => navigate('/')}
            className='mt-4 px-6 py-3 bg-accent text-white rounded-full 
                       font-medium hover:bg-accent/90 transition-all duration-200 
                       cursor-pointer'
          >
            Browse Recipes →
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 xl:px-20'>
          {bookmarks.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookmarks