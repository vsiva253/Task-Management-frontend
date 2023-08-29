import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './homestyle.css';
import { useAuth } from "./AuthContext";

function Home() {
  const { authenticated } = useAuth();
  const [posts, setPosts] = useState([]);

  const refreshPage = () => {
    window.location.reload(false);
  }

  const markAsCompleted = (postId) => {
    axios.put(`https://backend-task-s.onrender.com/markascompleted/${postId}`, {}, { withCredentials: true })
      .then(response => {
        if (response.data === "Marked as completed") {
          setPosts(prevPosts =>
            prevPosts.filter(post => post._id !== postId)
          );
          refreshPage();
        }
      })
      .catch(err => console.log(err));
  };

  const deletePost = (postId) => {
    axios.delete(`https://backend-task-s.onrender.com/deletepost/${postId}`, { withCredentials: true })
      .then(response => {
        if (response.data === "Post deleted") {
          setPosts(prevPosts =>
            prevPosts.filter(post => post._id !== postId)
          );
          refreshPage();
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    axios.get('https://backend-task-s.onrender.com/getposts', { withCredentials: true })
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => console.log(err));
  }, []);
  const completedContainerClass = posts.some(post => post.isCompleted) ? 'completed-container' : '';

  return (
    <div className={`post-container ${completedContainerClass}`}>
      {posts.map(post => (
        <div
          key={post._id}
          className={`post-item ${post.isCompleted ? 'completed' : ''}`}
        >
          <h2 className="post-title">{post.title}</h2>
          <p className="post-description">{post.description}</p>
          <div className="multi-button">
          {!post.isCompleted && (
            <button onClick={() => markAsCompleted(post._id)}>Mark as Completed</button>
          )}
          <button onClick={() => deletePost(post._id)}>Delete</button>
            </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
