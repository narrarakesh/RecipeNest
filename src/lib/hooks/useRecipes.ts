
import { useQuery } from '@tanstack/react-query'
import {
  searchRecipes,
  fetchByCategory,
  fetchByCuisine,
} from '../service/mealApi'
import type { RecipeFilters } from '../types/domain'

export const QUERY_KEYS = {
  recipes: {
    all: ['recipes'] as const,
    search: (q: string) => ['recipes', 'search', q] as const,
    byCategory: (cat: string) => ['recipes', 'category', cat] as const,
    byCuisine: (cuisine: string) => ['recipes', 'cuisine', cuisine] as const,
  },
} as const

export function useRecipes(filters: RecipeFilters) {
  const { search, category, cuisine } = filters

  return useQuery({
    queryKey: category
      ? QUERY_KEYS.recipes.byCategory(category)
      : cuisine
        ? QUERY_KEYS.recipes.byCuisine(cuisine)
        : QUERY_KEYS.recipes.search(search),

    queryFn: () => {
      if (category) return fetchByCategory(category)
      if (cuisine) return fetchByCuisine(cuisine)
      return searchRecipes(search)
    },

    enabled: search.length > 0 || category.length > 0 || cuisine.length > 0,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}