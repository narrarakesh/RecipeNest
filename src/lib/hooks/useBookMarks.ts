import { useCallback } from 'react'
import { useAppStore, useBookmarks as useBookmarksSelector } from '../store/useAppStore'
import type { RecipeSummary } from '../types/domain'

export function useBookmarks() {
  const bookmarks = useBookmarksSelector()
  const { addBookmark, removeBookmark, isBookMarked } = useAppStore()

  const toggle = useCallback(
    (recipe: RecipeSummary) => {
      if (isBookMarked(recipe.id)) {
        removeBookmark(recipe.id)
      } else {
        addBookmark(recipe)
      }
    },
    [isBookMarked, addBookmark, removeBookmark]
  )

  return {
    bookmarks,
    toggle,
    isBookMarked,
    count: bookmarks.length,
  }
}