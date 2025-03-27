# 📚 Cronômetro e Estatísticas de Estudo

Este projeto é uma ferramenta desenvolvida com **Next.js** e **TailwindCSS** para ajudar estudantes a monitorar e visualizar o tempo dedicado aos estudos de diferentes disciplinas e temas. A aplicação inclui um cronômetro funcional, persistência de dados, e gráficos interativos para análise visual das estatísticas de estudo.

---

## 📝 Funcionalidades Principais

- **Cronômetro Funcional**:
  - Iniciar, pausar, resetar e salvar o tempo estudado.
  - Persistência do cronômetro ao navegar entre páginas.
  - Modal de confirmação ao salvar o tempo estudado.

- **Seleção de Disciplina e Tema**:
  - Seleção obrigatória antes de iniciar o cronômetro.
  - Disciplinas e temas configuráveis.

- **Estatísticas de Estudo**:
  - Visualização das disciplinas e temas mais estudados.
  - Gráficos interativos utilizando [Recharts](https://recharts.org/en-US/):
    - Gráfico de Pizza: Proporção do tempo estudado por tema.
    - Gráfico de Barras: Tempo total por disciplina.
    - Gráfico de Linhas: Evolução do tempo estudado ao longo das sessões.
    - Gráfico de Barras Horizontal: Tempo estudado por tema.

- **Persistência de Dados**:
  - Os dados são armazenados no `localStorage` para garantir que as estatísticas sejam mantidas mesmo após recarregar a página.

- **Responsividade**:
  - Layout adaptável para diferentes tamanhos de tela, garantindo uma boa experiência em dispositivos móveis, tablets e desktops.

---

## 🛠️ Tecnologias Utilizadas

- **Next.js**: Framework React para construção da interface do usuário com suporte a SSR (Server-Side Rendering).
- **React**: Biblioteca JavaScript para construção da interface do usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao projeto.
- **TailwindCSS**: Framework CSS para estilização rápida e responsiva.
- **Recharts**: Biblioteca para criação de gráficos interativos.
- **LocalStorage**: Para persistência dos dados localmente no navegador.

---

## 📂 Estrutura do Projeto
```sh src/
├── components/
│   ├── Timer.tsx         # Componente principal do cronômetro
│   ├── Statistics.tsx    # Componente das estatísticas com gráficos
│   ├── Modal.tsx         # Componente para exibição do modal de confirmação
│   └── Selectors.tsx     # Componente para seleção de disciplina e tema
├── pages/
│   ├── index.tsx         # Página inicial com o cronômetro
│   └── statistics.tsx    # Página dedicada às estatísticas
├── styles/
│   └── globals.css       # Estilos globais utilizando TailwindCSS
└── utils/
    └── timeUtils.ts      # Funções auxiliares para manipulação de tempo

```

---

## 🖥️ Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passos

Clone o repositório:
git clone https://github.com/seu-usuario/seu-repositorio.git

Navegue até o diretório do projeto:
cd seu-repositorio

Instale as dependências:
npm install

ou
yarn install

Inicie o servidor local:
npm run dev

ou
yarn dev

Abra no navegador:
http://localhost:3000

---

## 🎨 Componentes Principais

### 1. Timer (`Timer.tsx`)
Gerencia o cronômetro com as funções básicas (iniciar, pausar, resetar).
Persistência garantida utilizando localStorage.

### 2. Statistics (`Statistics.tsx`)
Renderiza os gráficos interativos utilizando os dados salvos no localStorage.
Inclui gráficos como pizza, barras, linhas e barras horizontais.

### 3. Modal (`Modal.tsx`)
Exibe uma confirmação antes de salvar os dados do cronômetro.

### 4. Selectors (`Selectors.tsx`)
Permite ao usuário selecionar a disciplina e o tema antes de iniciar o cronômetro.


---

## 📊 Formato dos Dados

Os dados são armazenados no `localStorage` no seguinte formato JSON:
```sh 
[
  {
    "disciplina": "Matemática",
    "tema": "Álgebra",
    "tempoEstudado": 3600 // Tempo em segundos
  },
  {
    "disciplina": "História",
    "tema": "Idade Média",
    "tempoEstudado": 1800 // Tempo em segundos
  }
]
```


Cada objeto contém:
- `disciplina`: Nome da disciplina (string).
- `tema`: Nome do tema (string).
- `tempoEstudado`: Tempo estudado em segundos (número).

---

## 📈 Gráficos Disponíveis

1. **Gráfico de Pizza**: Proporção do tempo estudado por tema.
2. **Gráfico de Barras**: Tempo total por disciplina.
3. **Gráfico de Linhas**: Evolução do tempo estudado ao longo das sessões.
4. **Gráfico de Barras Horizontal**: Detalha o tempo total estudado por tema.

---

## 🌟 Extras Implementados

Além dos requisitos básicos, foram implementados os seguintes extras:

1. **Gráficos Interativos:** Utilizando Recharts para visualização intuitiva dos dados.
2. **Tratamento Elegante para Estados Vazios:** Mensagens amigáveis são exibidas quando não há dados disponíveis.
3. **Animações Suaves:** Transições suaves nos componentes ao salvar dados ou navegar entre páginas.