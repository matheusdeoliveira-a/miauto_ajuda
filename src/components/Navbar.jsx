import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { IconPaw } from './Icons.jsx'
import './navbar.css'

export default function Navbar() {
  const { usuario, sair } = useAuth()
  const navigate = useNavigate()
  const [aberto, setAberto] = useState(false)

  function handleSair() {
    sair()
    setAberto(false)
    navigate('/')
  }

  return (
    <header className="nav">
      <div className="container nav-row">
        <Link to="/" className="nav-brand" onClick={() => setAberto(false)}>
          <IconPaw className="nav-brand-icon" />
          <span>Miauto Ajuda</span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Abrir menu"
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${aberto ? 'is-open' : ''}`}>
          <NavLink to="/" end onClick={() => setAberto(false)}>Início</NavLink>
          <a href="/#servicos" onClick={() => setAberto(false)}>Serviços</a>
          <a href="/#como-funciona" onClick={() => setAberto(false)}>Como funciona</a>

          {usuario ? (
            <>
              <NavLink to="/painel" onClick={() => setAberto(false)}>Meu painel</NavLink>
              <button className="btn btn-ghost nav-cta" onClick={handleSair}>Sair</button>
            </>
          ) : (
            <>
              <NavLink to="/entrar" onClick={() => setAberto(false)}>Entrar</NavLink>
              <Link className="btn btn-accent nav-cta" to="/cadastro" onClick={() => setAberto(false)}>
                Criar conta
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
