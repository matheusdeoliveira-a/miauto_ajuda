import React from 'react'
import { IconPaw } from './Icons.jsx'
import './footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <div className="footer-brand">
          <IconPaw className="footer-icon" />
          <span>Miauto Ajuda</span>
        </div>
        <p className="footer-note">
          Feito para o trabalho de integração de sistemas — front-end em React, back-end em Node.js a caminho.
        </p>
        <p className="footer-copy">© {new Date().getFullYear()} Miauto Ajuda</p>
      </div>
    </footer>
  )
}
