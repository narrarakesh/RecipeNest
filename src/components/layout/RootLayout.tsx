import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import NavBar from './NavBar'

const RootLayout = () => {
  const location = useLocation()

  return (
    <div className='min-h-screen bg-background text-text-primary'>
      <NavBar />
      <main>
        <AnimatePresence mode='wait'>
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
    </div>
  )
}

export default RootLayout