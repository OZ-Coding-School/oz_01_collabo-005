import React from 'react';
import './App.css'
import Join from './Pages/Join/Index'
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from '../src/Components/Nav/Nav'
import Main from './Pages/Main/Index'
import Meet from './Pages/Meet/Index'
import MyInfo from './Pages/MyInfo/Index'


function App() {


  return (
    <div className='App'>
      <div className='container'>
        <Nav/>

      </div>












  <Routes>
    <Route path="/" element={<Main/>}></Route>
    <Route path="/login" element={<Join/>}></Route>
    <Route path='/Meet' element={<Meet/>}></Route>
    <Route path="/MyInfo" element={<MyInfo/>}></Route>
    <Route></Route>
    <Route path="*" element={<div> 없는 페이지임</div>}></Route>
  </Routes>
      </div>
  )
}

export default App
