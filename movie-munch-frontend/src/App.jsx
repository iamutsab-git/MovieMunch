import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Routes , Route} from 'react-router-dom'
import Login from './Pages/LoginPages/Login'
import SignUp from './Pages/LoginPages/SignUp'
import Home from './components/Home/Home'
import SinglePage from './components/SinglePage/SinglePage'
import { useFavorites } from './components/Context/FavoriteContext'
import MyList from './components/MyList/MyList'
import Profile from './components/Profile/Profile'
import Update from './components/Update/Update'
import { ToastContainer } from 'react-toastify';

const App=()=> {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  return (
    <>
     <Navbar/>
      <Routes>
        <Route path="/" element={<Home isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}/>
        <Route path='/login' element= {<Login/>}/>
        <Route path='/signup' element= {<SignUp/>}/>
        <Route path="/movie/:id" element={<SinglePage isDarkMode={isDarkMode} />}/>
        <Route path="/my-list" element={<MyList/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/edit" element={<Update/>}/>
      
      </Routes>
      <ToastContainer
  position="top-center"
  hideProgressBar
  autoClose={1000}
  theme="dark"
  toastClassName="bg-zinc-900 text-white border-l-4 border-green-400 rounded shadow-md p-4"
  bodyClassName="text-sm font-medium"
  progressClassName="bg-orange-400"
/>
    </>
   
  )
}

export default App
