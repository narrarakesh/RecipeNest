import { Bookmark, BookmarkCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'

import type { RecipeSummary } from '@/lib/types/domain'
import { useBookmarks } from '@/lib/hooks/useBookMarks'
import { motion } from 'framer-motion'
import React from 'react'

interface RecipeCardProps {
  recipe: RecipeSummary
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate()
  const { isBookMarked, toggle } = useBookmarks()

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggle(recipe)
  }

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    >
        <Card
        onClick={() => navigate(`/recipe/${recipe.id}`)}
        className='cursor-pointer overflow-hidden border-border bg-surface 
                    hover:-translate-y-3 hover:shadow-lg transition-all duration-300 group p-0 h-full flex flex-col
                    will-change-transform'
        >
        {/* Image */}
        <div className='relative overflow-hidden aspect-16/10'>
            <img
            src={recipe.thumbnail}
            alt={recipe.name}
            loading='lazy'
            className='w-full h-full object-cover transition-transform 
                        duration-500 group-hover:scale-105'
            />

            {/* Bookmark Button */}
            <button
            onClick={handleBookmark}
            className='absolute top-3 right-3 p-2 rounded-full 
                        bg-white/90 backdrop-blur-sm hover:bg-white 
                        transition-all duration-200 shadow-md cursor-pointer'
            >
            {isBookMarked(recipe.id)
                ? <BookmarkCheck className='w-4 h-4 text-accent' />
                : <Bookmark className='w-4 h-4 text-text-secondary' />
            }
            </button>

            {/* Category Badge */}
            {recipe.category && (
            <div className='absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm 
                            px-3 py-1 rounded-full text-xs font-semibold text-accent'>
                {recipe.category}
            </div>
            )}
        </div>

        {/* Content */}
        <CardContent className='p-4'>
            <h3 className='font-semibold text-text-primary line-clamp-2 mb-2 
                        group-hover:text-accent transition-colors duration-200'>
            {recipe.name}
            </h3>

            <div className='flex items-center justify-between'>
            {recipe.area && (
                <span className='text-xs text-text-secondary flex items-center gap-1'>
                🌍 {recipe.area}
                </span>
            )}
            </div>
        </CardContent>
        </Card>
    </motion.div>
  )
}

export default React.memo(RecipeCard)