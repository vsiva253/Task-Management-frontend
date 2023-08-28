import React, { useState } from 'react';
import "./style.css";
import { Link,useNavigate } from 'react-router-dom';
import  axios  from "axios";
import Navbar from './Navbar'; // Make sure to provide the correct path to your Navbar component
import { useAuth } from "./AuthContext"; // Import the useAuth hook



const Login = () => {
  const { setAuthenticated } = useAuth();
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const navigate=useNavigate()

  const [loading, setLoading] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true); // Set loading state

  axios.post('https://backend-task-s.onrender.com/login', { email, password })
    .then((res) => {
      if (res.data === 'Success') {
        navigate('/');
        window.location.reload();
        localStorage.setItem("token", true);
      } else {
        // Handle login error here
      }
    })
    .catch((err) => {
      // Handle Axios error
      console.log(err);
    })
    .finally(() => {
      setLoading(false); // Reset loading state
    });
};

    return (
        <div className="register-container">
      <div className="register-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor='email'>Email:</label>
            <input type='email'
            onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor='password'>Password:</label>
            <input type='password' 
            onChange={e=>setPassword(e.target.value)}/>
          </div>
          <button className="signup-button">Login</button>
        </form>
        {loading && <p>Loading...</p>}
        <p className="login-text">Don't have an account?</p>
        <button className="login-button"><Link to='/Register' className='linklogin'>Register</Link></button>
      </div>
    </div>
    );
};

export default Login;
