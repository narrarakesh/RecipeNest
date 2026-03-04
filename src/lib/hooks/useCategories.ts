import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../service/mealApi'

const useCategories = () => {
  return useQuery({
    queryKey: ['Categories'],
    queryFn: () => fetchCategories(),
    enabled:true,
    staleTime:Infinity,
    retry:2
  })
}

export default useCategories
