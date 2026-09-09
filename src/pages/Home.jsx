import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import {
  IconPaw, IconBowl, IconScissors, IconCross, IconHouse, IconLeash, IconStar, IconClock,
} from '../components/Icons.jsx'
import './home.css'

const SERVICOS = [
  { icon: IconBowl, nome: 'Pet Shop', desc: 'Ração, petiscos, brinquedos e tudo o que o pet pede para viver bem.' },
  { icon: IconScissors, nome: 'Banho & Tosa', desc: 'Agende o horário certo e deixe o resto com quem entende do assunto.' },
  { icon: IconCross, nome: 'Veterinário', desc: 'Consultas, vacinas e acompanhamento marcados em poucos cliques.' },
  { icon: IconHouse, nome: 'Hospedagem', desc: 'Um lugar de confiança para o pet ficar quando você precisar viajar.' },
  { icon: IconLeash, nome: 'Adestramento', desc: 'Profissionais parceiros para ensinar boas manias, do jeito certo.' },
  { icon: IconPaw, nome: 'Passeio', desc: 'Rotina de exercício e sociabilização, sem tirar seu tempo do dia.' },
]

const PASSOS = [
  { numero: '01', titulo: 'Crie sua conta', desc: 'Cadastro rápido com seus dados e os do seu pet.' },
  { numero: '02', titulo: 'Escolha o serviço', desc: 'Veja o que os parceiros da Miauto Ajuda oferecem perto de você.' },
  { numero: '03', titulo: 'Acompanhe no painel', desc: 'Pedidos, horários e histórico, tudo reunido em um só lugar.' },
]

export default function Home() {
  const { usuario } = useAuth()

  return (
    <>
      <section className="hero">
        <div className="container hero-row">
          <div className="hero-copy">
            <p className="eyebrow">Cuidado com pata e coração</p>
            <h1>
              Tudo para o seu pet, organizado num só lugar.
            </h1>
            <p className="hero-sub">
              A Miauto Ajuda reúne pet shop, banho e tosa, veterinário e hospedagem
              em uma plataforma só. Agende, acompanhe e nunca mais perca um horário.
            </p>
            <div className="hero-actions">
              {usuario ? (
                <Link className="btn btn-primary" to="/painel">Ir para o meu painel</Link>
              ) : (
                <>
                  <Link className="btn btn-primary" to="/cadastro">Criar minha conta</Link>
                  <Link className="btn btn-ghost" to="/entrar">Já tenho conta</Link>
                </>
              )}
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-card">
              <IconStar className="hero-art-icon" />
              <p className="hero-art-label">Avaliação média</p>
              <p className="hero-art-value">4.9 de 5</p>
            </div>
            <div className="hero-art-blob" />
            <IconPaw className="hero-art-paw hero-art-paw-1" />
            <IconPaw className="hero-art-paw hero-art-paw-2" />
            <IconPaw className="hero-art-paw hero-art-paw-3" />
          </div>
        </div>
      </section>

      <section id="servicos" className="section">
        <div className="container">
          <div className="section-head">
            <h2>O que você encontra por aqui</h2>
            <p>Serviços pensados para cada etapa da rotina do seu pet.</p>
          </div>

          <div className="services-grid">
            {SERVICOS.map(({ icon: Icon, nome, desc }) => (
              <article className="service-card" key={nome}>
                <Icon className="service-icon" />
                <h3>{nome}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Como funciona</h2>
            <p>Três passos entre você e um pet mais bem cuidado.</p>
          </div>

          <div className="steps-row">
            {PASSOS.map((p) => (
              <div className="step-card" key={p.numero}>
                <span className="step-number">{p.numero}</span>
                <h3>{p.titulo}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-banner">
          <IconClock className="cta-icon" />
          <div>
            <h2>Nunca mais esqueça o horário do banho.</h2>
            <p>Crie sua conta gratuita e organize os cuidados do seu pet hoje mesmo.</p>
          </div>
          {usuario ? (
            <Link className="btn btn-accent" to="/painel">Meu painel</Link>
          ) : (
            <Link className="btn btn-accent" to="/cadastro">Começar agora</Link>
          )}
        </div>
      </section>
    </>
  )
}
