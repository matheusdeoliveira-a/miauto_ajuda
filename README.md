# Miauto Ajuda 🐾

Front-end em React (Vite) de um site fictício de pet shop, feito para a
atividade de integração de sistemas. A ideia é subir esse front no
Vercel e, depois, conectar com um back-end em Node.js rodando numa
instância EC2 da AWS.

## O que já tem

- **Página inicial** com apresentação dos serviços (Pet Shop, Banho &
  Tosa, Veterinário, Hospedagem, Adestramento, Passeio) e como funciona.
- **Cadastro** e **Login** de usuário.
- **Painel logado** com lista de pedidos/agendamentos (serviço, pet,
  data e horário) e formulário para criar novos.
- Rotas protegidas: só quem está logado acessa `/painel`.

Por enquanto tudo funciona **só no front**: os dados ficam salvos no
`localStorage` do navegador (veja `src/api/api.js`), então dá pra
testar o fluxo completo de cadastro → login → agendar → cancelar sem
precisar de servidor nenhum.

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

Conta de teste já cadastrada: `ana@exemplo.com` / `123456`.

## Estrutura

```
src/
  api/api.js          -> "banco de dados" mockado (troca fácil por fetch real)
  context/AuthContext.jsx  -> sessão do usuário logado
  components/         -> Navbar, Footer, ícones, rota protegida
  pages/               -> Home, Login, Cadastro, Painel, 404
```

## Deploy no Vercel

1. Suba esse projeto para um repositório no GitHub.
2. Em vercel.app, clique em **Add New → Project** e importe o repositório.
3. Framework preset: **Vite**. Build command e output directory já vêm
   certos por padrão (`npm run build` / `dist`).
4. Deploy. O `vercel.json` já cuida do roteamento das páginas
   (`/entrar`, `/painel`, etc).

## Conectando com o back-end em Node.js (próximo passo)

Todas as chamadas de dados passam por `src/api/api.js`. Quando a API em
Node estiver rodando na EC2:

1. Copie `.env.example` para `.env` e preencha `VITE_API_URL` com o
   endereço da API.
2. Em `src/api/api.js`, troque o corpo de cada função
   (`registrar`, `login`, `listarPedidos`, `criarPedido`,
   `removerPedido`) por uma chamada `fetch` para o endpoint
   correspondente, usando `API_URL`.
3. As telas (`Login.jsx`, `Cadastro.jsx`, `Painel.jsx`) não devem
   precisar mudar, porque só dependem do formato de retorno dessas
   funções — pense nelas como o contrato do CRUD:
   - `registrar({ nome, email, senha, telefone })` → `{ ok, usuario }` ou `{ ok: false, erro }`
   - `login({ email, senha })` → `{ ok, usuario }` ou `{ ok: false, erro }`
   - `listarPedidos(usuarioId)` → lista de pedidos
   - `criarPedido(pedido)` → pedido criado
   - `removerPedido(id)` → `{ ok: true }`
