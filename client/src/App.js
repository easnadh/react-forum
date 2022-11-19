import React from "react";
import './styles/App.css';
import {
  Route,
  Routes
} from 'react-router-dom';
import Posts from "./pages/Posts";
import LoginForm from "./pages/Login";
import Registration from "./pages/Registration";
import PostPage from "./components/PostPage";

function App() {

  return <>
    <Routes>
      <Route path='/login' element={<LoginForm />} />
      <Route path='/reg' element={<Registration />} />
      <Route path='/' element={<Posts />} />
      <Route path='/:id' element={<PostPage />} />
    </Routes>
  </>

}

export default App;
