// Camada de acesso à API.
//
// Por enquanto o front funciona sozinho, salvando tudo no localStorage,
// para dar pra navegar pelo fluxo completo (cadastro, login, pedidos)
// sem depender de um backend.
//
// Quando o backend em Node.js estiver rodando na instância EC2, basta:
//   1. Preencher VITE_API_URL no .env (ex: https://api.miauto-ajuda.com)
//   2. Trocar o corpo de cada função abaixo por uma chamada fetch(`${API_URL}/...`)
// As assinaturas das funções (o que elas recebem e devolvem) já foram
// pensadas pra bater com um CRUD REST comum, então as telas não devem
// precisar mudar quando a troca acontecer.

export const API_URL = import.meta.env.VITE_API_URL || ''

const DB_KEY = 'miauto:db'

function readDB() {
  const raw = localStorage.getItem(DB_KEY)
  if (raw) return JSON.parse(raw)
  const seed = {
    usuarios: [
      { id: 'u1', nome: 'Ana Souza', email: 'ana@exemplo.com', senha: '123456', telefone: '(11) 99999-0000' },
    ],
    pedidos: [
      { id: 'p1', usuarioId: 'u1', servico: 'Banho & Tosa', pet: 'Toby', data: '2026-09-12', horario: '10:00', status: 'confirmado' },
      { id: 'p2', usuarioId: 'u1', servico: 'Veterinário', pet: 'Mimi', data: '2026-09-20', horario: '15:30', status: 'pendente' },
    ],
  }
  localStorage.setItem(DB_KEY, JSON.stringify(seed))
  return seed
}

function writeDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
}

function uid(prefix) {
  return `${prefix}${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`
}

function delay(value, ms = 350) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

// ---- Usuários / autenticação -------------------------------------------

export async function registrar({ nome, email, senha, telefone }) {
  const db = readDB()
  if (db.usuarios.some((u) => u.email === email)) {
    return delay({ ok: false, erro: 'Já existe uma conta com esse e-mail.' })
  }
  const usuario = { id: uid('u'), nome, email, senha, telefone }
  db.usuarios.push(usuario)
  writeDB(db)
  return delay({ ok: true, usuario })
}

export async function login({ email, senha }) {
  const db = readDB()
  const usuario = db.usuarios.find((u) => u.email === email && u.senha === senha)
  if (!usuario) {
    return delay({ ok: false, erro: 'E-mail ou senha incorretos.' })
  }
  return delay({ ok: true, usuario })
}

// ---- Pedidos / agendamentos ---------------------------------------------

export async function listarPedidos(usuarioId) {
  const db = readDB()
  return delay(db.pedidos.filter((p) => p.usuarioId === usuarioId))
}

export async function criarPedido(pedido) {
  const db = readDB()
  const novo = { id: uid('p'), status: 'pendente', ...pedido }
  db.pedidos.push(novo)
  writeDB(db)
  return delay(novo)
}

export async function removerPedido(id) {
  const db = readDB()
  db.pedidos = db.pedidos.filter((p) => p.id !== id)
  writeDB(db)
  return delay({ ok: true })
}
