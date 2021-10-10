import { useUsers } from './hooks/use-users'
import { Logo } from './components/svgs/logo'

function App() {
  const { data: users, error, isFetching } = useUsers()

  return (
    <div className="App">
      <header className="App-header">
        <Logo width="100" height="100" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
      <section>
        <h2>Users</h2>
        {isFetching ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.key}>{user.name}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default App
