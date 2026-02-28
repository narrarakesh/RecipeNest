import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

const RootLayout = () => {
  return (
    <div className='min-h-screen bg-background text-text-primary'>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout