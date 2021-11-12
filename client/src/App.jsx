import { AuthContainer } from './containers/Login'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" />
          <Route path="/login" element={<AuthContainer />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
