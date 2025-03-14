import { Outlet } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'


function App() {
  ;
  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="w-full">
          <Outlet />
        </main>
        
        <Footer />
      </div>
  )
}

export default App;
