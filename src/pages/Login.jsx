import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { IconPaw } from '../components/Icons.jsx'
import './auth.css'

export default function Login() {
  const { entrar } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', senha: '' })
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  const destino = location.state?.destino || '/painel'

  function atualizar(campo) {
    return (e) => setForm((f) => ({ ...f, [campo]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    const res = await entrar(form)
    setEnviando(false)
    if (res.ok) {
      navigate(destino, { replace: true })
    } else {
      setErro(res.erro)
    }
  }

  return (
    <div className="auth">
      <aside className="auth-side">
        <div>
          <IconPaw className="auth-side-icon" />
          <h2>Bem-vindo de volta.</h2>
          <p>Entre para ver seus pedidos, horários marcados e o histórico do seu pet.</p>
        </div>
        <p className="auth-side-quote">
          Conta de teste: ana@exemplo.com / 123456
        </p>
      </aside>

      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <p className="auth-form-sub">Acesse sua conta Miauto Ajuda.</p>

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={atualizar('email')}
            />
          </div>

          <div className="field">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              autoComplete="current-password"
              required
              value={form.senha}
              onChange={atualizar('senha')}
            />
          </div>

          {erro && <p className="auth-error">{erro}</p>}

          <button className="btn btn-primary btn-block auth-submit" type="submit" disabled={enviando}>
            {enviando ? 'Entrando…' : 'Entrar'}
          </button>

          <p className="auth-switch">
            Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
