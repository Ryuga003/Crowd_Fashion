import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateQuery from './pages/createQuery'
import Desc from './pages/desc'
import Home from './pages/home'
import Login from './pages/login'
import Chat from './pages/chat'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/query/:id" element={<Desc />} />
        <Route path="/create" element={<CreateQuery />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App