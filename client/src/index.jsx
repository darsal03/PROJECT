import React from 'react'

import ReactDOM from 'react-dom'

import { QueryClient, QueryClientProvider } from 'react-query'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AuthContainer } from './containers/Login'

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
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="login" element={<AuthContainer />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
