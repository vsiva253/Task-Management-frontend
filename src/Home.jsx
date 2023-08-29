import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './homestyle.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [editedPost, setEditedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get('https://backend-task-s.onrender.com/getposts', { withCredentials: true })
      .then(response => {
        setPosts(response.data);
      })
      .catch(err => console.log(err));
  };

  const markAsCompleted = (postId) => {
    axios.put(`https://backend-task-s.onrender.com/markascompleted/${postId}`, {}, { withCredentials: true })
      .then(response => {
        if (response.data === "Marked as completed") {
          fetchPosts();
        }
      })
      .catch(err => console.log(err));
  };

  const deletePost = (postId) => {
    axios.delete(`https://backend-task-s.onrender.com/deletepost/${postId}`, { withCredentials: true })
      .then(response => {
        if (response.data === "Post deleted") {
          fetchPosts();
        }
      })
      .catch(err => console.log(err));
  };

  const handleEdit = (postId) => {
    const postToEdit = posts.find(post => post._id === postId);
    if (postToEdit && !postToEdit.isCompleted) {
      setEditedPost(postToEdit);
    }
  };

  const handleUpdate = () => {
    if (editedPost) {
      axios.put(
        `https://backend-task-s.onrender.com/updatepost/${editedPost._id}`,
        editedPost,
        { withCredentials: true }
      )
        .then(response => {
          if (response.data.message === "Post updated successfully") {
            setEditedPost(null);
            fetchPosts();
          }
        })
        .catch(err => console.log(err));
    }
  };

  const completedContainerClass = posts.some(post => post.isCompleted) ? 'completed-container' : '';

  return (
    <div className={`post-container ${completedContainerClass}`}>
      {posts.length === 0 ? (
        <div className="no-posts">
          <p>Create Tasks</p>
        </div>
      ) : (
        posts.map(post => (
          <div key={post._id} className={`post-item ${post.isCompleted ? 'completed' : ''}`}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-description">{post.description}</p>
            {!post.isCompleted ? (
              <button className="completed-btn" onClick={() => markAsCompleted(post._id)}>
                Mark as Completed
              </button>
            ) : (
              <button className="completed-btn" disabled>
                Completed
              </button>
            )}
            <button onClick={() => deletePost(post._id)}>Delete</button>
            {!post.isCompleted && (
              <button onClick={() => handleEdit(post._id)}>Edit</button>
            )}

            {/* Display edit fields directly below the post */}
            {editedPost && editedPost._id === post._id && (
              <div className="edit-fields">
                <input
                  type="text"
                  value={editedPost.title}
                  onChange={e => setEditedPost({ ...editedPost, title: e.target.value })}
                />
                <textarea
                  className="edit-description"
                  value={editedPost.description}
                  onChange={e => setEditedPost({ ...editedPost, description: e.target.value })}
                />
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => setEditedPost(null)}>Cancel</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
