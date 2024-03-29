import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login.tsx';
import Main from './pages/main/Main.tsx';
import MyInfo from './pages/myinfo/MyInfo.tsx';
import Nav from './pages/nav/Nav.tsx';
import Notice from './pages/notice/Notice.tsx';


function App() {
  return (
    <div className="App">
      <div className='container'>
        <Nav/>
      
      </div>






  <Routes>
    <Route path="/" element={<Main/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path='notice' element={<Notice/>}></Route>
    <Route path="/myInfo" element={<MyInfo/>}></Route>
    <Route></Route>
    <Route path="*" element={<div> 없는 페이지임</div>}></Route>
  </Routes>


    </div>
  );
}




export default App;
