# 📚 Cronômetro e Estatísticas de Estudo

Este projeto é uma ferramenta desenvolvida com **Next.js** e **TailwindCSS** para ajudar estudantes a monitorar e visualizar o tempo dedicado aos estudos de diferentes disciplinas e temas. A aplicação inclui um cronômetro funcional, persistência de dados, e gráficos interativos para análise visual das estatísticas de estudo.

---

## 📝 Funcionalidades Principais

- **Cronômetro Funcional**:
  - Iniciar, pausar, resetar e salvar o tempo estudado.
  - Modos de contagem crescente e regressiva
  - Persistência do cronômetro ao navegar entre páginas.
  - Modal de confirmação ao salvar o tempo estudado.

- **Seleção de Disciplina e Tema**:
  - Seleção obrigatória antes de iniciar o cronômetro.
  - Disciplinas e temas configuráveis.

- **Estatísticas de Estudo**:
  - Visualização das disciplinas e temas mais estudados.
  - Filtros por data e texto
  - Visualização por períodos (manhã, tarde, noite)
  - Gráficos interativos utilizando [Recharts](https://recharts.org/en-US/):
    - Gráfico de Pizza: Tempo por Disciplina.
    - Gráfico de Barras: Tempo por período do dia

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
-  **Context API**: Para gerenciamento de estado

---

## 📂 Estrutura do Projeto
```sh 
src/
├── components/
│   ├── Timer/
│   │   ├── Timer.tsx
│   │   ├── TimerControls.tsx
│   │   ├── HistorySection.tsx
│   │   └── HistoryEntry.tsx
│   └── Statistics/
│       ├── StatisticsHeader.tsx
│       ├── PeriodBarChart.tsx
│       ├── DisciplinePieChart.tsx
│       ├── TopDisciplines.tsx
│       └── SearchFilters.tsx
├── pages/
│   ├── timer/
│   │   └── page.tsx
│   └── statistics/
│       └── page.tsx
├── context/
│   └── TimerContext.tsx
├── hooks/
│   ├── useTimerLogic.tsx
│   └── useStatisticsLogic.tsx
├── utils/
│   ├── formatTime.ts
│   └── storage.ts
├── public/
│   ├── logo-full.webp
│   └── logo-mini.jpg
├── styles/
│   └── globals.css
├── layout.tsx
└── providers.tsx

```

---

## 🖥️ Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Passos
- **Clone o repositório**: git clone https://github.com/GabrielMaciel1/study-timer.git
- **Instale as dependências:**: npm install ou yarn install
- **Inicie o servidor local:**: npm run dev ou yarn dev
- **Abra no navegador:**: http://localhost:3000
---