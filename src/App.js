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
  const loadPostDetail = (postId) => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
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
          <h2 className="text-lg font-bold mb-2"><strong>User ID:</strong> {selectedPost.userId}</h2>
          <h2 className="text-lg font-bold mb-2"><strong>ID:</strong> {selectedPost.id}</h2>
          <h2 className="text-lg font-bold mb-2"><strong>Title:</strong> {selectedPost.title}</h2>
          <h2 className="text-lg font-bold mb-2"><strong>Body:</strong> {selectedPost.body}</h2>
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
                {/* <h2><strong>User ID:</strong> {post.userId}</h2> */}
                <h2><strong>ID:</strong> {post.id}</h2>
                <h2 className="text-lg font-bold mb-2"><strong>Title:</strong>{post.title}</h2>
                <h2 className="text-lg font-bold mb-2"><strong>Body:</strong>{post.body}</h2>
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
