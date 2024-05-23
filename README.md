# Gestão de Projetos e Tarefas

Este projeto é uma aplicação web para gerenciar projetos e tarefas, utilizando Vue.js no frontend e Node.js com Express e MongoDB no backend.

## Funcionalidades

- Criação, visualização, edição e remoção de projetos.
- Criação, visualização, edição e remoção de tarefas associadas aos projetos.
- Adicionar membros aos projetos.
- Atualização do status das tarefas (Pendente, Em Progresso, Concluído).

## Tecnologias Utilizadas

### Frontend
- **Vue.js**: Framework JavaScript progressivo para construir interfaces de usuário.
- **Vue Router**: Biblioteca de roteamento para Vue.js.
- **Vuetify**: Biblioteca de componentes de UI para Vue.js.

### Backend
- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para aplicativo da web do Node.js.
- **MongoDB**: Banco de dados NoSQL orientado a documentos.
- **Mongoose**: Ferramenta de modelagem de objetos MongoDB projetada para trabalhar em um ambiente assíncrono.
- **CORS**: Pacote para habilitar CORS com várias opções.

## Configuração

### Estrutura do Projeto

A estrutura do projeto está dividida em duas partes principais: `frontend` e `backend`.

#### Frontend

O frontend utiliza Vue.js e é configurado através do arquivo `vue.config.js`. Algumas configurações importantes incluem:

- **Alias para diretórios**: Facilita a importação de arquivos e componentes.
- **Proxy de desenvolvimento**: Configurado para redirecionar requisições para o backend que está sendo executado localmente.

O roteamento é gerenciado pelo Vue Router, e os componentes principais incluem páginas de visualização de projetos e detalhes de projetos individuais.

#### Backend

O backend é construído com Node.js e Express, conectando-se a um banco de dados MongoDB. As operações do banco de dados são gerenciadas pelo Mongoose. Há rotas definidas para gerenciamento de projetos e tarefas, incluindo adição de membros e atualização de status de tarefas.

## Instalação

### 1 Clone o repositório:
```bash
   git clone URL_DO_REPOSITORIO
```

### 2 Navegue até a pasta do backend e instale as dependências

```bash
cd caminho_para_backend
npm install
```

### 3. Faça o mesmo para o frontend

```bash
cd caminho_para_frontend
npm install

```

### 4. Inicie o servidor backend


```bash
npm start
```
### 5. Em um novo terminal, inicie o servidor frontend

```bash
npm run serve
```