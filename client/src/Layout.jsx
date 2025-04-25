import { Outlet } from 'react-router'

function App() {

  async function logout() {
    const res = await fetch("/registration/logout/", {
      credentials: "same-origin", // include cookies!
    });

    if (res.ok) {
      // navigate away from the single page app!
      window.location = "/registration/sign_in/";
    } else {
      // handle logout failed!
    }
  }

  return (
    <>
      <nav className="navbar">
        <h1>Todos</h1>
        <button onClick={logout}>Logout</button>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App;
