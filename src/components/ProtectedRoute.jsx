import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children }) {
  const { usuario, carregando } = useAuth()

  if (carregando) return null
  if (!usuario) return <Navigate to="/entrar" replace />

  return children
}
