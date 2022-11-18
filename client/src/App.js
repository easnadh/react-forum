import React from "react";
import './styles/App.css';
import {
  Route,
  Routes
} from 'react-router-dom';
import Posts from "./pages/Posts";
import LoginForm from "./pages/Login";
import Registration from "./pages/Registration";

function App() {

  return <>
    <Routes>
      <Route path='/login' element={<LoginForm />} />
      <Route path='/reg' element={<Registration />} />
      <Route path='/' element={<Posts />} />
    </Routes>
  </>

}

export default App;
