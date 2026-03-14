import { useNavigate } from "react-router-dom"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-32">
      
      <div className="text-8xl opacity-30">🍽️</div>
      
      <h1 className="font-serif text-8xl text-accent font-semibold">404</h1>
      
      <h2 className='font-serif text-3xl text-text-primary'>
        Page Not Found
      </h2>
      
      <p className='text-text-secondary text-center max-w-sm'>
        Looks like this page went missing. Let's get you back to the recipes.
      </p>
      
      <button
        onClick={() => navigate('/')}
        className='mt-4 px-6 py-3 bg-accent text-white rounded-full 
                   font-medium hover:bg-accent/90 transition-all duration-200 
                   cursor-pointer'
      >
        Back to Home →
      </button>

    </div>
  )
}

export default NotFound