import React from 'react'

import ReactDOM from 'react-dom'

import { QueryClient, QueryClientProvider } from 'react-query'

import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
