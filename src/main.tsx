import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import {router} from './lib/router/index.tsx'
import { ReactQueryDevtools } from './../node_modules/@tanstack/react-query-devtools/src/index';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 5*60*1000,
      retry:2,
      refetchOnWindowFocus:false,
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router = {router}/>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  </StrictMode>,
)

