import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import RootLayout from '../../components/layout/RootLayout'

const Home = lazy(() => import('../../pages/Home.tsx'))
const RecipeDetail = lazy(() => import('../../pages/RecipeDetail.tsx'))
const Bookmarks = lazy(() => import('../../pages/Bookmarks.tsx'))
const NotFound = lazy(() => import('../../pages/NotFound.tsx'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'recipe/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <RecipeDetail />
          </Suspense>
        ),
      },
      {
        path: 'bookmarks',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Bookmarks />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
])