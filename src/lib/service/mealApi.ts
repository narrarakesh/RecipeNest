import type { MealDBCategoriesResponse, MealDBMeal, MealDBResponse } from "../types/api"
import type { Ingredient, Recipe, RecipeSummary } from "../types/domain"
import { axiosInstance } from "./api"


function transformMeal(meal: MealDBMeal): Recipe {
  const ingredients: Ingredient[] = []

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}` as keyof MealDBMeal]?.trim()
    const measure = meal[`strMeasure${i}` as keyof MealDBMeal]?.trim()

    if (name && name.length > 0) {
      ingredients.push({ name, measure: measure ?? '' })
    }
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    thumbnail: meal.strMealThumb,
    youtubeUrl: meal.strYoutube || null,
    tags: meal.strTags ? meal.strTags.split(',').map((t) => t.trim()) : [],
    ingredients,
  }
}

// search recipies
export async function searchRecipes(query: string): Promise<RecipeSummary[]> {

  const { data } = await axiosInstance.get<MealDBResponse>('/search.php', {
    params: { s: query },
  })
  return (data.meals ?? []).map(transformMeal)
}

// filter recipes by ID
export async function fetchRecipeById(id:string):Promise<Recipe>{
    const {data} =await axiosInstance.get<MealDBResponse>('/lookup.php', {
    params: { i: id },
  })
  const meal = data.meals?.[0]
  if (!meal) throw new Error(`Recipe with id ${id} not found`)
  return transformMeal(meal)
}

// fetch categories
export async function fetchCategories() {
  const { data } = await axiosInstance.get<MealDBCategoriesResponse>('/categories.php')
  return data.categories
}


// fetch meals by categories
export async function fetchByCategory(category: string): Promise<RecipeSummary[]> {
  const { data } = await axiosInstance.get<MealDBResponse>('/filter.php', {
    params: { c: category },
  })
  return (data.meals ?? []).map((m) => ({
    id: m.idMeal,
    name: m.strMeal,
    thumbnail: m.strMealThumb,
    category,
    area: '',
  }))
}

// fetch by cusine

export async function fetchByCuisine(cuisine: string): Promise<RecipeSummary[]> {
  const { data } = await axiosInstance.get<MealDBResponse>('/filter.php', {
    params: { a: cuisine },
  })
  return (data.meals ?? []).map((m) => ({
    id: m.idMeal,
    name: m.strMeal,
    thumbnail: m.strMealThumb,
    category: '',
    area: cuisine,
  }))
}

export async function fetchAllRecipes(): Promise<RecipeSummary[]> {
  const { data } = await axiosInstance.get<MealDBResponse>('/search.php', {
    params: { s: '' },
  })
  return (data.meals ?? []).map(transformMeal)
}

export async function fetchCuisines(): Promise<{ strArea: string }[]> {
  const { data } = await axiosInstance.get<{ meals: { strArea: string }[] }>('/list.php', {
    params: { a: 'list' },
  })
  return data.meals
}