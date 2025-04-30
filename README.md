# Nympla

**Nympla** é um site desenvolvido inicialmente em sala de aula. O projeto tem como objetivo simular a funcionalidade de uma plataforma de eventos, semelhante ao Sympla.

## Design
Telas do projeto
![alt text](<Design sem nome (1).png>)

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Bootstrap](https://getbootstrap.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Como executar o projeto

### 1. Clonar o repositório ou baixar os arquivos

Você pode clonar este repositório com:

```bash
git clone <URL-do-repositório>
```

Ou baixar os arquivos em `.zip` e extrair na sua máquina.

### 2. Criar o arquivo `.env`

Dentro da pasta `Back-end`, crie um arquivo chamado `.env` com o seguinte conteúdo, adaptando para sua configuração local:

```
POSTGRES_URL="postgresql://<user>:<senha>@localhost:5432/nympla"
SECRET_KEY="sua-chave-secreta"
```

### 3. Instalar as dependências

Execute o comando abaixo dentro da pasta `Back-end`:

```bash
npm i
```

### 4. Iniciar o servidor

Ainda na pasta `Back-end`, execute:

```bash
npm run dev
```


### 5. Logar no site

Profile
```
usuário: henrique@gmail.com
senha: 543
```

Admin
```
usuário: admin@gmail.com
senha: 123
```
---
