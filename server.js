const express = require("express");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ARQUIVO_ALUNOS = path.join(__dirname, "alunos.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function lerAlunos() {
  if (!fs.existsSync(ARQUIVO_ALUNOS)) {
    fs.writeFileSync(ARQUIVO_ALUNOS, "[]", "utf8");
  }
  const conteudo = fs.readFileSync(ARQUIVO_ALUNOS, "utf8");
  try {
    const dados = JSON.parse(conteudo);
    return Array.isArray(dados) ? dados : [];
  } catch {
    // Arquivo vazio ou corrompido: começa uma lista nova em vez de quebrar a API
    return [];
  }
}

function salvarAlunos(alunos) {
  fs.writeFileSync(
    ARQUIVO_ALUNOS,
    JSON.stringify(alunos, null, 2),
    "utf8"
  );
}

app.get("/api/alunos", (req, res) => {
  try {
    const alunos = lerAlunos();
    res.json(alunos);
  } catch (erro) {
    console.error("Erro ao listar alunos:", erro);
    res.status(500).json({ mensagem: "Erro ao ler os alunos." });
  }
});

app.post("/api/alunos", (req, res) => {
  try {
    const { nome, email, curso } = req.body;

    if (
      typeof nome !== "string" || !nome.trim() ||
      typeof email !== "string" || !email.trim() ||
      typeof curso !== "string" || !curso.trim()
    ) {
      return res.status(400).json({
        mensagem: "Informe nome, e-mail e curso."
      });
    }

    const emailNormalizado = email.trim().toLowerCase();

    if (!REGEX_EMAIL.test(emailNormalizado)) {
      return res.status(400).json({
        mensagem: "Informe um e-mail válido."
      });
    }

    const alunos = lerAlunos();

    if (alunos.some((aluno) => aluno.email.toLowerCase() === emailNormalizado)) {
      return res.status(409).json({
        mensagem: "Já existe um estudante com este e-mail."
      });
    }

    const novoAluno = {
      id: randomUUID(),
      nome: nome.trim(),
      email: emailNormalizado,
      curso: curso.trim()
    };

    alunos.push(novoAluno);
    salvarAlunos(alunos);

    res.status(201).json(novoAluno);
  } catch (erro) {
    console.error("Erro ao cadastrar aluno:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar o aluno." });
  }
});

app.delete("/api/alunos/:id", (req, res) => {
  try {
    const { id } = req.params;
    const alunos = lerAlunos();

    const existe = alunos.some((aluno) => aluno.id === id);
    if (!existe) {
      return res.status(404).json({
        mensagem: "Aluno não encontrado."
      });
    }

    const alunosAtualizados = alunos.filter((aluno) => aluno.id !== id);
    salvarAlunos(alunosAtualizados);

    res.json({ mensagem: "Aluno excluído com sucesso." });
  } catch (erro) {
    console.error("Erro ao excluir aluno:", erro);
    res.status(500).json({ mensagem: "Erro ao excluir o aluno." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor disponível em http://localhost:${PORT}`);
});