import React, { useState } from 'react';
import "./style.css";
import { Link,useNavigate } from 'react-router-dom';
import  axios  from "axios";


const Login = () => {
  
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const navigate=useNavigate()

  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3001/login',{email,password})
    .then(res=>
      {
        if(res.data==='Success'){
          navigate('/')
        }
      })
    .catch(err=>console.log(err))
  }
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
        <p className="login-text">Don't have an account?</p>
        <button className="login-button"><Link to='/Register' className='linklogin'>Register</Link></button>
      </div>
    </div>
    );
};

export default Login;
