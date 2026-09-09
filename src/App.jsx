import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Painel from './pages/Painel.jsx'
import NaoEncontrado from './pages/NaoEncontrado.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/painel"
            element={
              <ProtectedRoute>
                <Painel />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NaoEncontrado />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
