import Header from './components/Header'
import { injectGlobalStyles } from './stitches.config'
import { AuthProvider } from './contexts/auth'
import { Content } from './containers/Content'

function App() {
  injectGlobalStyles()

  return (
    <>
      <AuthProvider>
        <Header />
        <Content />
      </AuthProvider>
    </>
  )
}

export default App
