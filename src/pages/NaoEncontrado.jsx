import React from 'react'
import { Link } from 'react-router-dom'
import { IconPaw } from '../components/Icons.jsx'

export default function NaoEncontrado() {
  return (
    <div className="container" style={{ padding: '120px 28px', textAlign: 'center' }}>
      <IconPaw style={{ width: 40, height: 40, color: 'var(--marigold-dark)', margin: '0 auto 20px' }} />
      <h1 style={{ fontSize: 32 }}>Essa página fugiu do quintal.</h1>
      <p style={{ marginTop: 12, color: 'var(--ink-soft)' }}>Não encontramos o que você procurava.</p>
      <Link className="btn btn-primary" to="/" style={{ marginTop: 28, display: 'inline-flex' }}>
        Voltar para o início
      </Link>
    </div>
  )
}
