import './App.css'
import Login from './Login';
import Navbar from './Navbar'
import Register from "./Register";
import { BrowserRouter,Routes, Route} from "react-router-dom";
import Home from "./Home"
import CreatePost from './CreatePost';
import { AuthProvider } from './AuthContext';



function App() {
  

  return (
    
    <BrowserRouter>
    <AuthProvider>
    <Navbar/>
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<CreatePost/>}></Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter> 
    
  )
}

export default App
