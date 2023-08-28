import React, { useState } from 'react';
import "./style.css";
import { Link ,useNavigate} from 'react-router-dom';
import  axios  from "axios";

function Register() {
  const [username,setUsername]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const navigate=useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('https://backend-task-s.onrender.com/register',{username,email,password})
    .then(res=>navigate('/login'))
    .catch(err=>console.log(err))
  }
  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor='name'>Username:</label>
            <input type='text'
            onChange={e=>setUsername(e.target.value)} />
          </div>
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
          <button className="signup-button">Sign up</button>
        </form>
        <p className="login-text">Already have an account?</p>
        <button className="login-button"><Link to='/login' className='linklogin'>Login</Link></button>
      </div>
    </div>
  )
}

export default Register;
