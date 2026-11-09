const API_URL = "/api/alunos";

const formulario = document.getElementById("form-aluno");
const listaAlunos = document.getElementById("lista-alunos");
const totalAlunos = document.getElementById("total-alunos");
const mensagem = document.getElementById("mensagem");

function exibirMensagem(texto, tipo = "sucesso") {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
}

async function carregarAlunos() {
  try {
    const resposta = await fetch(API_URL);
    if (!resposta.ok) {
      throw new Error("Não foi possível carregar os estudantes.");
    }
    const alunos = await resposta.json();
    renderizarAlunos(alunos);
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
}

function renderizarAlunos(alunos) {
  listaAlunos.replaceChildren();
  totalAlunos.textContent = `${alunos.length} estudante(s)`;

  if (alunos.length === 0) {
    const linha = document.createElement("tr");
    const celula = document.createElement("td");
    celula.colSpan = 4;
    celula.className = "vazio";
    celula.textContent = "Nenhum estudante cadastrado.";
    linha.appendChild(celula);
    listaAlunos.appendChild(linha);
    return;
  }

  alunos.forEach((aluno) => {
    const linha = document.createElement("tr");

    const celulaNome = document.createElement("td");
    celulaNome.textContent = aluno.nome;

    const celulaEmail = document.createElement("td");
    celulaEmail.textContent = aluno.email;

    const celulaCurso = document.createElement("td");
    celulaCurso.textContent = aluno.curso;

    const celulaAcao = document.createElement("td");
    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "botao-excluir";
    botaoExcluir.type = "button";

    botaoExcluir.addEventListener("click", () => {
      excluirAluno(aluno.id);
    });

    celulaAcao.appendChild(botaoExcluir);

    linha.append(celulaNome, celulaEmail, celulaCurso, celulaAcao);
    listaAlunos.appendChild(linha);
  });
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value.trim(),
    email: document.getElementById("email").value.trim(),
    curso: document.getElementById("curso").value.trim()
  };

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.mensagem || "Falha no cadastro.");
    }

    formulario.reset();
    exibirMensagem("Estudante cadastrado com sucesso!");
    await carregarAlunos();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

async function excluirAluno(id) {
  const confirmou = confirm("Deseja realmente excluir este estudante?");
  if (!confirmou) return;

  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      throw new Error(resultado.mensagem || "Falha ao excluir.");
    }

    exibirMensagem(resultado.mensagem);
    await carregarAlunos();
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
}

carregarAlunos();