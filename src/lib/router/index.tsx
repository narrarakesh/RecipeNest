import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import RootLayout from '../../components/layout/RootLayout'
import Loader from '@/components/customComponents/Skeleton.tsx'

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
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'recipe/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <RecipeDetail />
          </Suspense>
        ),
      },
      {
        path: 'bookmarks',
        element: (
          <Suspense fallback={<Loader />}>
            <Bookmarks />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<Loader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
])