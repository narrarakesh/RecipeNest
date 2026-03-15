import { useQuery } from '@tanstack/react-query'
import { fetchCuisines } from '../service/mealApi'

const useCusines = () => {
  return useQuery({
    queryKey: ['Cusines'],
    queryFn: () => fetchCuisines(),
    enabled:true,
    staleTime:Infinity,
    retry:2
  })
}

export default useCusines