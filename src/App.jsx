import './App.css'
import Anime from './pages/Anime'
import Dashboard from './pages/dashboard'
import Navbar from './pages/layout/Navbar'
import Sidebar from './pages/layout/Sidebar'

function App() {

  return (
    <div className='flex w-full'>
      {/* Sidebar */}
      <Sidebar />
      <div className='flex flex-col w-full'>
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <div className='p-4 lg:p-8'>
          {/* <Dashboard /> */}
          <Anime />
        </div>

        {/* Footer */}
      </div>
    </div>
  )
}

export default App
