import React from "react";
import './styles/App.css';
import {useState} from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {

  const [posts, setPosts] = useState([
    {id: 1, title: 'JS', body: 'Descr'},
    {id: 2, title: 'JS 2', body: 'Descr'},
    {id: 3, title: 'JS 3', body: 'Descr'},
  ]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <PostList remove={removePost} posts={posts} title="list 1"/>

    </div>
  );
}

export default App;
