const Loader = () => {
  return (
    <div className='flex flex-col justify-center items-center py-32 gap-4'>
      <div className='relative'>
        <div className='text-6xl'>🍜</div>
        <div className='absolute -top-4 left-1/2 -translate-x-1/2 text-2xl animate-ping opacity-70'>
          💨
        </div>
      </div>
      <p className='text-text-secondary text-sm animate-pulse'>
        Loading...
      </p>
    </div>
  )
}

export default Loader