<<<<<<< HEAD
# 🎓 Cadastro de Estudantes

CRUD de estudantes com **Node.js + Express** no back-end e **HTML, CSS e JavaScript puro** no front-end. Os dados ficam em um arquivo JSON, então não é preciso instalar banco de dados.

## Funcionalidades

- Cadastrar estudantes (nome, e-mail e curso)
- Listar estudantes em tabela, com contador de total
- Excluir estudantes, com confirmação
- Validação no servidor: campos obrigatórios, formato de e-mail e e-mail duplicado
- Respostas com códigos HTTP corretos (`200`, `201`, `400`, `404`, `409`, `500`)
- Interface responsiva e sem risco de XSS (a tabela é montada com `textContent`)

## Tecnologias

Node.js · Express · JavaScript · HTML5 · CSS3 · Fetch API

## Como rodar

```bash
npm install
npm start
```

Acesse `http://localhost:3000`. Para outra porta: `PORT=4000 npm start`.
O arquivo `alunos.json` é criado automaticamente na primeira execução.

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/alunos` | Lista todos os estudantes |
| POST | `/api/alunos` | Cadastra um estudante |
| DELETE | `/api/alunos/:id` | Remove um estudante |

Exemplo de corpo do `POST`:

```json
{ "nome": "Maria Silva", "email": "maria@email.com", "curso": "Desenvolvimento de Sistemas" }
```

## Estrutura

```text
cadastro-estudantes/
├── public/          # front-end (index.html, app.js, style.css)
├── server.js        # API e servidor de arquivos estáticos
└── package.json
```

## Próximos passos

- [ ] Editar estudantes (`PUT /api/alunos/:id`)
- [ ] Busca e filtro por curso
- [ ] Trocar o arquivo JSON por um banco (SQLite ou MySQL)


=======
# cadastro-estudantes
>>>>>>> d55791c62e9d59244a2a4bfb0ef01c84f4747a0a
