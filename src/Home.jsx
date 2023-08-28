import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';

function Home() {
  const [posts, setPosts] = useState([]);
  


  const markAsCompleted = (postId) => {
    axios.put(`http://localhost:3001/markascompleted/${postId}`, {}, { withCredentials: true })
      .then(response => {
        if (response.data === "Marked as completed") {
          setPosts(prevPosts =>
            prevPosts.filter(post => post._id !== postId)
          );
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    axios.get('http://localhost:3001/getposts',{ withCredentials: true })
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  

  return (
    <div className="post-container">
      {posts.map(post => (
        <div
          key={post._id}
          className={`post-item ${post.isCompleted ? 'completed' : ''}`}
        >
          <h2 className="post-title">{post.title}</h2>
          <p className="post-description">{post.description}</p>
          {!post.isCompleted && (
            <button onClick={() => markAsCompleted(post._id)}>Mark as Completed</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
