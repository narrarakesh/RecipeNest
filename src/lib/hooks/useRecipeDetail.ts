import { useQuery } from '@tanstack/react-query'
import { fetchRecipeById } from '../service/mealApi'

export const RECIPE_DETAIL_KEY = (id: string) => ['recipes', 'detail', id] as const

export function useRecipeDetail(id: string) {
  return useQuery({
    queryKey: RECIPE_DETAIL_KEY(id),
    queryFn: () => fetchRecipeById(id),
    enabled: Boolean(id),
    staleTime: 10 * 60 * 1000,
    retry: 2,
  })
}