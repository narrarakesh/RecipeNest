
import { useCallback, useEffect, useState } from 'react';
import Hero from '@/components/ui/Hero';
import SearchBar from '@/components/customComponents/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/lib/hooks/useDebounce';
import FilterBar from '@/components/customComponents/FilterBar';
import RecipeGrid from '@/components/layout/RecipeGrid';
import PageTransition from '@/components/customComponents/PageTransition';

const Home = () => {

  // search realted code
  const [searchParams, setSearchParams] = useSearchParams()
  const [inputValue, setInputValue] = useState(
    searchParams.get('search') ?? ''
  );

  const updateSearch = useCallback((value: string) => {
    setSearchParams((prev) => {
      prev.set('search', value)
      prev.set('page', '1')
      return prev
    })
  }, [setSearchParams])

  const debouncedInput = useDebounce(inputValue, 500);

  useEffect(()=>{
    const currentSearch = searchParams.get('search') ?? ''
    if (debouncedInput === currentSearch) return
    updateSearch(debouncedInput);
  }, [debouncedInput, updateSearch, searchParams])

  return (
    <PageTransition>
    <div className='pb-20'>
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
      <div className='mt-16'>    
        <FilterBar 
          selectedCategory={searchParams.get('category') ?? ''}
          onCategoryChange={(cat)=> setSearchParams((prev)=>{
            prev.set('category', cat)
            prev.set('page','1')
            return prev
          })}
        />
      </div>
      <div className='mx-10'>
        <RecipeGrid/>
      </div>
    </div>
    </PageTransition>
  )
}

export default Home