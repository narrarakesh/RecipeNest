import { useThemeManager } from '@/lib/hooks/useThemeManager';
import { useBookmarks} from '@/lib/store/useAppStore'
import { Bookmark, Moon, Sun } from 'lucide-react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {

    const {theme, toggleTheme} = useThemeManager();
    const bookmarks = useBookmarks();

    const navigate = useNavigate();

    useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleSavedItems = () => {
    navigate('/bookmarks');
  }

  return (
    <nav className='py-2 px-10 flex flex-row justify-between items-center border-b border-border bg-surface shadow-sm sticky top-0 z-50'>

        <div className='flex flex-row gap-3 items-center cursor-pointer' onClick={()=> navigate('/')}>
            <div className='w-8 h-8 bg-accent flex items-center justify-center rounded-tr-2xl rounded-tl-2xl rounded-br-2xl'>
            🪺
            </div>
            <h2 className='text-accent font-serif text-2xl'>RecipeNest</h2>
        </div>

        <div className='flex flex-row gap-4 items-center'>
            <button className='btn bg-accent-light'
                onClick={handleSavedItems}
            >
                <Bookmark className='w-5 h-5 text-accent' />
            <p className='text-text-secondary text-sm'>{bookmarks.length} Saved</p>
            </button>
            <button className='btn bg-surface2 border border-border p-3'
                onClick={toggleTheme}
            >
                { theme === 'light' ? 
                <Moon className='w-5 h-5 text-accent' />
                : <Sun className='w-5 h-5 text-accent' />
                }
            </button>
        </div>

    </nav>
  )
}

export default NavBar