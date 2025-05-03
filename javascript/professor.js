// Função para normalizar modalidades (remove hífens, espaços e converte para minúsculas)
function normalizarModalidade(str) {
  return str.toLowerCase().replace(/[\s-]/g, "");
}

// Função para carregar o perfil do aluno
function carregarPerfilAluno(idAluno) {
  const containerPerfil = document.getElementById("perfil-aluno-container");
  const tituloPerfil = document.getElementById("titulo-perfil-aluno");

  // Dados mockados (substituir por chamada ao banco de dados no futuro)
  let nomeAluno = "Aluno Desconhecido";
  let modalidade = "Desconhecida";
  let presencas = 0;
  let frequencia = "0%";
  let statusPagamento = "Desconhecido";
  if (idAluno === 1) {
    nomeAluno = "Lucas Silva";
    modalidade = "Muay Thai";
    presencas = 22;
    frequencia = "84%";
    statusPagamento = "Pago";
  }
  if (idAluno === 2) {
    nomeAluno = "Ana Costa";
    modalidade = "Jiu-Jitsu";
    presencas = 10;
    frequencia = "38%";
    statusPagamento = "Pendente";
  }
  if (idAluno === 3) {
    nomeAluno = "Marcos Oliveira";
    modalidade = "Misto";
    presencas = 25;
    frequencia = "96%";
    statusPagamento = "Atrasado";
  }
  // FUTURO: Substituir por uma chamada ao banco de dados, ex.:
  // fetch(`/api/alunos/${idAluno}`)
  //   .then(response => response.json())
  //   .then(data => { nomeAluno = data.nome; modalidade = data.modalidade; ... })

  tituloPerfil.textContent = `Perfil do Aluno: ${nomeAluno}`;
  containerPerfil.innerHTML = `
    <p><strong>Nome:</strong> ${nomeAluno}</p>
    <p><strong>Modalidade:</strong> ${modalidade}</p>
    <p><strong>Presenças:</strong> ${presencas}</p>
    <p><strong>Frequência:</strong> ${frequencia}</p>
    <p><strong>Status de Pagamento:</strong> <span class="status-pagamento ${statusPagamento.toLowerCase()}">${statusPagamento}</span></p>
    <button onclick="fecharPerfil()">Fechar Perfil</button>
  `;
  console.log(`Clicou para ver perfil do aluno ID: ${idAluno}`);
}

// Função para fechar o perfil
function fecharPerfil() {
  const containerPerfil = document.getElementById("perfil-aluno-container");
  const tituloPerfil = document.getElementById("titulo-perfil-aluno");
  tituloPerfil.textContent = `Perfil do Aluno`;
  containerPerfil.innerHTML = `<p><i>Selecione um aluno na lista de presença ou no histórico para ver os detalhes aqui.</i></p>`;
}

// Função para filtrar alunos
function filtrarAlunos() {
  console.log("Função filtrarAlunos chamada");
  const busca = document.getElementById("busca").value.toLowerCase().trim();
  const filtroModalidade = normalizarModalidade(
    document.getElementById("filtro-modalidade").value
  );
  const alunos = document.querySelectorAll("#lista-presenca ul li");
  const mensagemNenhumAluno =
    document.getElementById("nenhum-aluno-mensagem") ||
    criarMensagemNenhumAluno();

  console.log(
    `Busca: "${busca}", Filtro de modalidade normalizado: "${filtroModalidade}"`
  );
  console.log(`Número de alunos encontrados: ${alunos.length}`);

  if (alunos.length === 0) {
    console.error("Nenhum aluno encontrado na lista de presença");
    mensagemNenhumAluno.style.display = "block";
    return;
  }

  let alunosVisiveis = 0;
  alunos.forEach((aluno, index) => {
    const nomeElement = aluno.querySelector("label a");
    const modalidadeElement = aluno.querySelector(".modalidade");

    if (!nomeElement || !modalidadeElement) {
      console.error(`Aluno ${index + 1}: Nome ou modalidade não encontrados`);
      return;
    }

    const nome = nomeElement.textContent.toLowerCase();
    const modalidade = normalizarModalidade(modalidadeElement.textContent);

    const matchesNome = busca === "" || nome.includes(busca);
    let matchesModalidade = true;
    if (filtroModalidade !== "") {
      matchesModalidade =
        modalidade === filtroModalidade || modalidade === "misto";
    }

    console.log(
      `Aluno ${
        index + 1
      }: Nome="${nome}", Modalidade normalizada="${modalidade}", ` +
        `MatchesNome=${matchesNome}, MatchesModalidade=${matchesModalidade}`
    );

    if (matchesNome && matchesModalidade) {
      aluno.style.display = "flex";
      alunosVisiveis++;
    } else {
      aluno.style.display = "none";
    }
  });

  mensagemNenhumAluno.style.display = alunosVisiveis === 0 ? "block" : "none";

  // FUTURO: Com banco de dados, carregar alunos dinamicamente e filtrar no cliente ou servidor
  // Exemplo de filtragem no cliente:
  // fetch('/api/alunos')
  //   .then(response => response.json())
  //   .then(alunos => {
  //     const lista = document.querySelector("#lista-presenca ul");
  //     lista.innerHTML = "";
  //     alunos.forEach(aluno => {
  //       const modalidadeNormalizada = normalizarModalidade(aluno.modalidade);
  //       if ((busca === "" || aluno.nome.toLowerCase().includes(busca)) &&
  //           (filtroModalidade === "" ||
  //            modalidadeNormalizada === filtroModalidade ||
  //            modalidadeNormalizada === "misto")) {
  //         const li = document.createElement("li");
  //         li.className = "aluno-item";
  //         li.innerHTML = `
  //           <input type="checkbox" id="aluno${aluno.id}" name="presenca[]" value="${aluno.id}">
  //           <label for="aluno${aluno.id}"><a href="#perfil-aluno" onclick="carregarPerfilAluno(${aluno.id})">${aluno.nome}</a></label>
  //           <span class="modalidade">${aluno.modalidade}</span>
  //           <span class="status-pagamento ${aluno.status_pagamento.toLowerCase()}">${aluno.status_pagamento}</span>
  //         `;
  //         lista.appendChild(li);
  //       }
  //     });
  //   });
}

// Função para criar mensagem de "nenhum aluno encontrado"
function criarMensagemNenhumAluno() {
  const mensagem = document.createElement("p");
  mensagem.id = "nenhum-aluno-mensagem";
  mensagem.textContent = "Nenhum aluno encontrado com os critérios de busca.";
  mensagem.style.color = "#555";
  mensagem.style.fontStyle = "italic";
  mensagem.style.marginTop = "1rem";
  mensagem.style.display = "none";
  mensagem.setAttribute("role", "alert");
  document.getElementById("lista-presenca").appendChild(mensagem);
  return mensagem;
}

// Inicialização da data e eventos de filtro
document.addEventListener("DOMContentLoaded", () => {
  // Função para formatar a data atual
  function formatarDataAtual() {
    const diasDaSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];
    const meses = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const hoje = new Date();
    const diaSemana = diasDaSemana[hoje.getDay()];
    const dia = hoje.getDate();
    const mes = meses[hoje.getMonth()];
    const ano = hoje.getFullYear();

    return `📅 ${diaSemana}, ${dia} de ${mes} de ${ano}`;
  }

  // Atualizar o elemento com a data formatada
  const dataAula = document.getElementById("data-aula");
  if (dataAula) {
    dataAula.textContent = formatarDataAtual();
  } else {
    console.error("Elemento #data-aula não encontrado");
  }

  // Configurar o evento de filtro
  const formBusca = document.querySelector("#busca-alunos form");
  if (formBusca) {
    console.log("Formulário de busca encontrado, registrando eventos");
    formBusca.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("Evento submit disparado");
      filtrarAlunos();
    });

    // Filtrar em tempo real enquanto o usuário digita
    const inputBusca = document.getElementById("busca");
    const selectModalidade = document.getElementById("filtro-modalidade");
    if (inputBusca) {
      inputBusca.addEventListener("input", () => {
        console.log("Evento input disparado");
        filtrarAlunos();
      });
    } else {
      console.error("Campo de busca #busca não encontrado");
    }
    if (selectModalidade) {
      selectModalidade.addEventListener("change", () => {
        console.log("Evento change disparado no filtro de modalidade");
        filtrarAlunos();
      });
    } else {
      console.error("Seleção de modalidade #filtro-modalidade não encontrada");
    }
  } else {
    console.error("Formulário de busca não encontrado");
  }
});
