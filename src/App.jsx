import { useDispatch, useSelector } from 'react-redux'
import Navbar from './pages/layout/Navbar'
import Sidebar from './pages/layout/Sidebar'
import {
  Route,
  Routes,
} from "react-router-dom";
import Film from './pages/Films'
import Episode from './pages/Episodes'
import Home from './pages/Home'
import Login from './pages/Login';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeUser, setUser } from './redux/features/userSlice';

function App() {
  const apiUrl = useSelector(state => state.api.apiUrl)
  const hamburger = useSelector(state => state.sidebar.hamburger)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    var token = sessionStorage.getItem('token')
    if (token) {
      const headers = {
        'x-access-token': token
      };
      const user = await axios.get(apiUrl + '/auth/me', { headers });
      if (user.data.message) {
        navigate('/login');
        dispatch(removeUser())
        sessionStorage.removeItem('auth')
        sessionStorage.removeItem('token')
        return false;
      }

      dispatch(setUser({ user: user.data, token }))
    } else {
      navigate('/login');
      dispatch(removeUser())
      sessionStorage.removeItem('auth')
      sessionStorage.removeItem('token')
    }
  }

  return (
    <div className='flex w-full'>
      {/* Sidebar */}
      <Sidebar />
      <div className={`flex flex-col w-full ${hamburger ? 'md:ml-[70px]' : 'md:ml-[250px]'}`}>
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className='p-4 lg:p-8'>
          <Routes>
            <Route path="/" element={<Home />} /> {/* 👈 Renders at /app/ */}
            <Route path="/film" element={<Film />} /> {/* 👈 Renders at /app/ */}
            <Route path="/episode" element={<Episode />} /> {/* 👈 Renders at /app/ */}
            <Route path="/login" element={<Login />} /> {/* 👈 Renders at /app/ */}
          </Routes>
        </div>

        {/* Footer */}
      </div>
    </div>
  )
}

export default App
