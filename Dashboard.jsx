import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = await db
        .collection("posts")
        .where("userId", "==", currentUser.uid)
        .get();
      setPosts(postsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchPosts();
  }, [currentUser]);

  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/post/new">New Post</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <Link to={`/post/edit/${post.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
