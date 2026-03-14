import { useQuery } from "@tanstack/react-query";
import { fetchByCategory } from "../service/mealApi";
import type { RecipeSummary } from "../types/domain";


export function useSimilarRecipes(category: string, currentId: string) {
  return useQuery({
    queryKey: ['recipes', 'similar', category],
    queryFn: () => fetchByCategory(category),
    enabled: Boolean(category),
    staleTime: 5 * 60 * 1000,
    select: (data: RecipeSummary[]) => data
      .filter(recipe => recipe.id !== currentId)
      .slice(0, 4),
  })
}