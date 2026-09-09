import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { listarPedidos, criarPedido, removerPedido } from '../api/api.js'
import { IconClock, IconPaw } from '../components/Icons.jsx'
import './painel.css'

const SERVICOS = ['Pet Shop', 'Banho & Tosa', 'Veterinário', 'Hospedagem', 'Adestramento', 'Passeio']

const NOVO_PEDIDO_VAZIO = { servico: SERVICOS[0], pet: '', data: '', horario: '' }

export default function Painel() {
  const { usuario } = useAuth()
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [novoPedido, setNovoPedido] = useState(NOVO_PEDIDO_VAZIO)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    let ativo = true
    listarPedidos(usuario.id).then((lista) => {
      if (ativo) {
        setPedidos(lista)
        setCarregando(false)
      }
    })
    return () => { ativo = false }
  }, [usuario.id])

  function atualizarCampo(campo) {
    return (e) => setNovoPedido((p) => ({ ...p, [campo]: e.target.value }))
  }

  async function handleAgendar(e) {
    e.preventDefault()
    if (!novoPedido.pet || !novoPedido.data || !novoPedido.horario) return
    setSalvando(true)
    const pedido = await criarPedido({ ...novoPedido, usuarioId: usuario.id })
    setPedidos((lista) => [...lista, pedido])
    setNovoPedido(NOVO_PEDIDO_VAZIO)
    setSalvando(false)
  }

  async function handleCancelar(id) {
    setPedidos((lista) => lista.filter((p) => p.id !== id))
    await removerPedido(id)
  }

  const proximos = [...pedidos].sort((a, b) => (a.data + a.horario).localeCompare(b.data + b.horario))

  return (
    <div className="container painel">
      <div className="painel-head">
        <div>
          <p className="eyebrow">Painel</p>
          <h1>Olá, {usuario.nome.split(' ')[0]}.</h1>
          <p className="painel-sub">Acompanhe seus agendamentos e marque novos serviços.</p>
        </div>
        <div className="painel-profile">
          <span className="painel-avatar">{usuario.nome[0].toUpperCase()}</span>
          <div>
            <p className="painel-profile-nome">{usuario.nome}</p>
            <p className="painel-profile-email">{usuario.email}</p>
          </div>
        </div>
      </div>

      <div className="painel-grid">
        <section className="painel-card">
          <h2>Meus pedidos</h2>

          {carregando ? (
            <p className="painel-empty">Carregando…</p>
          ) : proximos.length === 0 ? (
            <p className="painel-empty">Você ainda não tem nenhum agendamento. Marque um serviço ao lado.</p>
          ) : (
            <ul className="pedido-lista">
              {proximos.map((p) => (
                <li className="pedido-item" key={p.id}>
                  <IconPaw className="pedido-icon" />
                  <div className="pedido-info">
                    <p className="pedido-servico">{p.servico} — {p.pet}</p>
                    <p className="pedido-data">
                      <IconClock className="pedido-data-icon" />
                      {formatarData(p.data)} às {p.horario}
                    </p>
                  </div>
                  <span className={`pedido-status status-${p.status}`}>{rotuloStatus(p.status)}</span>
                  <button className="pedido-cancelar" onClick={() => handleCancelar(p.id)}>
                    Cancelar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="painel-card">
          <h2>Agendar serviço</h2>
          <form className="pedido-form" onSubmit={handleAgendar}>
            <div className="field">
              <label htmlFor="servico">Serviço</label>
              <select id="servico" value={novoPedido.servico} onChange={atualizarCampo('servico')}>
                {SERVICOS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="field">
              <label htmlFor="pet">Nome do pet</label>
              <input id="pet" type="text" required value={novoPedido.pet} onChange={atualizarCampo('pet')} />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="data">Data</label>
                <input id="data" type="date" required value={novoPedido.data} onChange={atualizarCampo('data')} />
              </div>
              <div className="field">
                <label htmlFor="horario">Horário</label>
                <input id="horario" type="time" required value={novoPedido.horario} onChange={atualizarCampo('horario')} />
              </div>
            </div>

            <button className="btn btn-accent btn-block auth-submit" type="submit" disabled={salvando}>
              {salvando ? 'Agendando…' : 'Confirmar agendamento'}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

function rotuloStatus(status) {
  return status === 'confirmado' ? 'Confirmado' : 'Pendente'
}

function formatarData(iso) {
  if (!iso) return ''
  const [ano, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${ano}`
}
