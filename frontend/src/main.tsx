import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css' // contains shadCN ui
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner'
// import { Toaster } from 'sonner'

const queryClient = new QueryClient({   // access to cache of react-query
  defaultOptions:{
    queries: 
{    refetchOnWindowFocus: false
  },
},
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
        <QueryClientProvider client={queryClient}>

    <Router>

      <AppRoutes/>
      <Toaster visibleToasts={1} position = "top-right" richColors/>

    </Router>
    </QueryClientProvider>

  </React.StrictMode>
)
