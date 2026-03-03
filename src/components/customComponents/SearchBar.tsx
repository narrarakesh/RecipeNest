import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
}

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className='relative flex items-center w-full max-w-2xl mx-auto'>
      
      {/* Search Icon — left side
      <Search className='absolute left-4 w-5 h-5 text-text-secondary pointer-events-none' /> */}

      {/* Input */}
      <Input
        type='text'
        placeholder='Search recipes... e.g. pasta, chicken curry'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className='pl-12 pr-28 py-7 rounded-full bg-white text-text-primary 
                   border-2 border-amber-800/90 shadow-lg text-base focus-visible:ring-2 
                   focus-visible:ring-accent'
      />

      {/* Search Button — right side */}
        <button
            onClick={onSearch}
            className='absolute right-2 bg-accent hover:bg-accent/90 
                    text-white p-3 rounded-full transition-all duration-200 cursor-pointer'
        >
            <Search className='w-5 h-5' />
        </button>

    </div>
  )
}

export default SearchBar