import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { IconPaw } from '../components/Icons.jsx'
import './auth.css'

export default function Cadastro() {
  const { cadastrar } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', senha: '' })
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  function atualizar(campo) {
    return (e) => setForm((f) => ({ ...f, [campo]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setEnviando(true)
    const res = await cadastrar(form)
    setEnviando(false)
    if (res.ok) {
      navigate('/painel', { replace: true })
    } else {
      setErro(res.erro)
    }
  }

  return (
    <div className="auth">
      <aside className="auth-side">
        <div>
          <IconPaw className="auth-side-icon" />
          <h2>Crie sua conta em menos de um minuto.</h2>
          <p>Cadastre-se para agendar serviços e acompanhar tudo no seu painel.</p>
        </div>
        <p className="auth-side-quote">
          Seus dados ficam guardados só neste navegador por enquanto.
        </p>
      </aside>

      <div className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h1>Criar conta</h1>
          <p className="auth-form-sub">Leva menos de um minuto.</p>

          <div className="field">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              autoComplete="name"
              required
              value={form.nome}
              onChange={atualizar('nome')}
            />
          </div>

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
            <label htmlFor="telefone">Telefone</label>
            <input
              id="telefone"
              type="tel"
              autoComplete="tel"
              placeholder="(11) 99999-0000"
              value={form.telefone}
              onChange={atualizar('telefone')}
            />
          </div>

          <div className="field">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              value={form.senha}
              onChange={atualizar('senha')}
            />
          </div>

          {erro && <p className="auth-error">{erro}</p>}

          <button className="btn btn-primary btn-block auth-submit" type="submit" disabled={enviando}>
            {enviando ? 'Criando conta…' : 'Criar conta'}
          </button>

          <p className="auth-switch">
            Já tem conta? <Link to="/entrar">Entrar</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
