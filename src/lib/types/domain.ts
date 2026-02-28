export interface Ingredient {
  name: string
  measure: string
}

export interface Recipe {
  id: string
  name: string
  category: string
  area: string
  instructions: string
  thumbnail: string
  youtubeUrl: string | null
  tags: string[]
  ingredients: Ingredient[]
}

export interface RecipeSummary {
  id: string
  name: string
  category: string
  area: string
  thumbnail: string
}

export interface NutritionInfo {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
}

export interface RecipeFilters {
  search: string
  category: string
  cuisine: string
  page: number
}