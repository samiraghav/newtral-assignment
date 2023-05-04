import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Load post detail
  const loadPostDetail = (id) => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        setSelectedPost(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      {selectedPost ? (
        <div className="post-detail">
          <h1 className="text-3xl font-bold mb-4">Post Details</h1>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg px-4 py-2 focus:outline-none"
            onClick={() => setSelectedPost(null)}
          >
            Back to Posts
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">Posts</h1>
          <div className="posts">
            {currentPosts.map(post => (
              <div className="post bg-white rounded-lg shadow-md px-6 py-4 mb-4" key={post.id}>
                <p><strong>User ID:</strong> {post.userId}</p>
                <p><strong>ID:</strong> {post.id}</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg px-4 py-2 focus:outline-none" onClick={() => loadPostDetail(post.id)}>View Post</button>
              </div>
            ))}

          </div>
          <div className="pagination flex justify-center">
            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
              <a
                key={i}
                href="#hi"
                className={`px-4 py-2 mx-1 rounded-lg focus:outline-none ${currentPage === i + 1 ? 'bg-gray-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
