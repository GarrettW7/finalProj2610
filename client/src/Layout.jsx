import { Outlet } from 'react-router'
import { useNavigate } from 'react-router';


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
  const navigate = useNavigate();
  
  const goToNataliePage = () => {
    navigate('/natalie'); // Navigate to Natalie page
  };

  return (
    <>
      <nav className="navbar">
        <h1 className = 'headerLayout'>AI helper tools!</h1>
        <button className='home' onClick={() => (window.location = "/")}>Home</button>
        <button className='natalie' onClick={goToNataliePage}>Natalie</button>
        <button className = 'logout' onClick={logout}>Logout</button>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App;
