import { Outlet } from 'react-router-dom'

import Header from './components/Header'
import { injectGlobalStyles } from './stitches.config'
import { AuthProvider } from './contexts/auth'

function App() {
  injectGlobalStyles()

  return (
    <>
      <AuthProvider>
        <Header />
        <Outlet />
      </AuthProvider>
    </>
  )
}

export default App
