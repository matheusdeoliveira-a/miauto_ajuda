import React, { createContext, useContext, useEffect, useState } from 'react'
import { login as apiLogin, registrar as apiRegistrar } from '../api/api.js'

const AuthContext = createContext(null)
const SESSION_KEY = 'miauto:sessao'

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem(SESSION_KEY)
    if (raw) setUsuario(JSON.parse(raw))
    setCarregando(false)
  }, [])

  async function entrar(credenciais) {
    const res = await apiLogin(credenciais)
    if (res.ok) {
      setUsuario(res.usuario)
      localStorage.setItem(SESSION_KEY, JSON.stringify(res.usuario))
    }
    return res
  }

  async function cadastrar(dados) {
    const res = await apiRegistrar(dados)
    if (res.ok) {
      setUsuario(res.usuario)
      localStorage.setItem(SESSION_KEY, JSON.stringify(res.usuario))
    }
    return res
  }

  function sair() {
    setUsuario(null)
    localStorage.removeItem(SESSION_KEY)
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, entrar, cadastrar, sair }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth precisa estar dentro de um AuthProvider')
  return ctx
}
