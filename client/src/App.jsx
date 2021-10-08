import { useEffect, useState } from 'react'
import { Logo } from './components/svgs/logo'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const load = async () => {
      const data = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/users`).then((res) =>
        res.json()
      )
      setUsers(data)
    }
    load()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Logo width="100" height="100" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <section>
        <h2>Users</h2>
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        ) : (
          <p>No users...</p>
        )}
      </section>
    </div>
  )
}

export default App
