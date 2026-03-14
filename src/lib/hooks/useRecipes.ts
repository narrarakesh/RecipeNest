
import { useQuery } from '@tanstack/react-query'
import {
  searchRecipes,
  fetchByCategory,
  fetchByCuisine,
} from '../service/mealApi'
import type { RecipeFilters } from '../types/domain'
import { fetchAllRecipes } from '../service/mealApi'

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

  const noFilters = !search && !category && !cuisine

  return useQuery({
    queryKey: noFilters
      ? ['recipes', 'all']
      : category
        ? QUERY_KEYS.recipes.byCategory(category)
        : cuisine
          ? QUERY_KEYS.recipes.byCuisine(cuisine)
          : QUERY_KEYS.recipes.search(search),

    queryFn: () => {
      if (noFilters) return fetchAllRecipes()
      if (category) return fetchByCategory(category)
      if (cuisine) return fetchByCuisine(cuisine)
      return searchRecipes(search)
    },

    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}