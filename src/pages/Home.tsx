
import { useEffect, useState } from 'react';
import Hero from '@/components/ui/Hero';
import SearchBar from '@/components/customComponents/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/lib/hooks/useDebounce';

const Home = () => {

  // search realted code
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState(
    searchParams.get('search') ?? ''
  );

  const updateSearch = (value: string) => {
    setSearchParams((prev) => {
      prev.set('search', value)
      prev.set('page', '1')
      return prev
    })
  }

  const debouncedInput = useDebounce(inputValue);

  useEffect(()=>{
    updateSearch(debouncedInput);
  }, [debouncedInput])

  return (
    <div className='relative'>
      <Hero/>
      <div className='absolute -bottom-8 left-0 right-0 px-6 flex justify-center z-20'>
        <SearchBar
          value={inputValue}
          onChange={setInputValue}
          onSearch={()=>updateSearch(inputValue)}
        />
      </div>
    </div>
  )
}

export default Home