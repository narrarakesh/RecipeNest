import {create} from 'zustand';
import type { RecipeSummary } from '../types/domain';
import { persist, devtools } from 'zustand/middleware'

interface AppState {
    //Bookmarks
    bookmarks:RecipeSummary[]
    addBookmark:(recipe:RecipeSummary) => void
    removeBookmark:(id:string)=> void
    isBookMarked: (id:string) => boolean

    theme: 'light' | 'dark'
    toggleTheme:()=> void
}

export const useAppStore = create<AppState>()(
    devtools(
        persist(
            (set, get)=>({
                bookmarks: [],
                addBookmark: (recipe:RecipeSummary)=> set((state:AppState) => ({
                    bookmarks: [...state.bookmarks, recipe]
                })),

                removeBookmark: (id:string)=> set((state:AppState) => ({
                    bookmarks: state.bookmarks.filter((b) => b.id !== id),
                })),

                isBookMarked:(id:string) => get().bookmarks.some((b)=> b.id=== id),


                theme:'light',

                toggleTheme:()=> set((state)=> ({
                    theme:state.theme === 'light' ? 'dark':'light',
                }))

            }),
            {
                name: 'recipenest-storage',
                partialize: (state) => ({
                bookmarks: state.bookmarks,
                theme: state.theme,
                }),
            }
        )
    )
)

// Selector hooks — components only subscribe to what they need
export const useBookmarks = () => useAppStore((s) => s.bookmarks)
export const useTheme = () => useAppStore((s) => s.theme)
export const useIsBookmarked = (id: string) =>
    useAppStore((s) => s.isBookMarked(id))
export const useToggleTheme = ()=> useAppStore((s)=> s.toggleTheme)