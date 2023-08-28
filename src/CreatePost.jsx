import React, { useState } from 'react';
import './style.css'; // Import your CSS file for styling
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
    const [title,setTitle]=useState()
    const [description,setDescription]=useState()
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/create',{title,description},{withCredentials: true})
    .then(res=>
      {
        if(res.data==='Success'){
          navigate('/')
        }
      })
    .catch(err=>console.log(err))
    }

  return (
    <div className="create-post-container">
      <div className="post-form-container">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Title" className="post-input" onChange={e=>setTitle(e.target.value)} />
          <textarea
            name="description"
            cols="30"
            rows="10"
            placeholder="Description"
            className="post-textarea"
            onChange={e=>setDescription(e.target.value)} 
          ></textarea>
          
          <button className="post-button">Post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
