import { Outlet } from 'react-router-dom'

import Header from './components/Header'
import { injectGlobalStyles } from './stitches.config'

function App() {
  injectGlobalStyles()

  return (
    <div className="wrapper">
      <Header />
      <Outlet />
    </div>
  )
}

export default App
