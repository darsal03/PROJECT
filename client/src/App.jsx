import Header from './components/Header'
import { injectGlobalStyles } from './stitches.config'
import { AuthProvider } from './contexts/auth'
import { Content } from './containers/Content'
import { LocalizationProvider } from '@mui/lab'
import DateAdapter from '@mui/lab/AdapterDateFns'

function App() {
  injectGlobalStyles()

  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <AuthProvider>
          <Header />
          <Content />
        </AuthProvider>
      </LocalizationProvider>
    </>
  )
}

export default App
