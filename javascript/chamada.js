document.addEventListener("DOMContentLoaded", () => {
  // ---- DADOS (Simulação de Banco de Dados) ----
  const alunos = [
    { id: 1, nome: "Carlos Silva", modalidade: "Jiu-Jitsu" },
    { id: 2, nome: "Bruna Costa", modalidade: "Muay Thai" },
    { id: 3, nome: "Pedro Almeida", modalidade: "Misto" },
    { id: 4, nome: "Juliana Santos", modalidade: "Jiu-Jitsu" },
    { id: 5, nome: "Fernando Lima", modalidade: "Muay Thai" },
    { id: 6, nome: "Mariana Oliveira", modalidade: "Misto" },
    { id: 7, nome: "Ricardo Gomes", modalidade: "Muay Thai" },
  ];

  const horarios = {
    1: [
      // Segunda
      { modalidade: "Muay Thai", hora: "17:10" },
      { modalidade: "Muay Thai", hora: "18:10" },
      { modalidade: "Muay Thai", hora: "19:10" },
      { modalidade: "Jiu-Jitsu", hora: "20:00" },
    ],
    2: [
      // Terça
      { modalidade: "Muay Thai", hora: "17:10" },
      { modalidade: "Muay Thai", hora: "18:10" },
      { modalidade: "Muay Thai", hora: "19:10" },
      { modalidade: "Jiu-Jitsu", hora: "20:00" },
    ],
    3: [
      // Quarta
      { modalidade: "Muay Thai", hora: "17:10" },
      { modalidade: "Muay Thai", hora: "18:10" },
      { modalidade: "Muay Thai", hora: "19:10" },
      { modalidade: "Jiu-Jitsu", hora: "20:00" },
    ],
    4: [
      // Quinta
      { modalidade: "Muay Thai", hora: "17:10" },
      { modalidade: "Muay Thai", hora: "18:10" },
      { modalidade: "Muay Thai", hora: "19:10" },
      { modalidade: "Jiu-Jitsu", hora: "20:00" },
    ],
    5: [
      // Sexta
      { modalidade: "Muay Thai", hora: "17:10" },
      { modalidade: "Muay Thai", hora: "18:10" },
      { modalidade: "Muay Thai", hora: "19:10" },
    ],
    6: [], // Sábado
    0: [], // Domingo
  };

  // ---- SELETORES DO DOM ----
  const seletorDiaEl = document.querySelector(".seletor-dia");
  const containerChamadaEl = document.getElementById("container-chamada");
  const dataAtualEl = document.getElementById("data-atual");
  const notificacaoBarEl = document.getElementById("notificacao-bar");

  // ---- FUNÇÕES ----

  const mostrarNotificacao = (mensagem) => {
    notificacaoBarEl.textContent = mensagem;
    notificacaoBarEl.classList.add("visivel");
    setTimeout(() => {
      notificacaoBarEl.classList.remove("visivel");
    }, 3000);
  };

  const renderizarTurmas = (dia) => {
    containerChamadaEl.innerHTML = "";
    const turmasDoDia = horarios[dia];

    seletorDiaEl.querySelectorAll("button").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.dia == dia);
    });

    if (!turmasDoDia || turmasDoDia.length === 0) {
      containerChamadaEl.innerHTML =
        "<p style='text-align:center;'>Nenhuma turma agendada para este dia.</p>";
      return;
    }

    turmasDoDia.forEach((turma) => {
      const alunosDaTurma = alunos.filter(
        (aluno) =>
          aluno.modalidade === turma.modalidade || aluno.modalidade === "Misto"
      );

      const cardTurma = document.createElement("div");
      cardTurma.className = "card-turma";

      let listaAlunosHtml = alunosDaTurma
        .map(
          (aluno) => `
                <li class="item-aluno-chamada">
                    <input type="checkbox" id="aluno-${
                      aluno.id
                    }-${turma.hora.replace(":", "")}" data-aluno-id="${
            aluno.id
          }">
                    <label for="aluno-${aluno.id}-${turma.hora.replace(
            ":",
            ""
          )}">${aluno.nome}</label>
                </li>
            `
        )
        .join("");

      // Estrutura atualizada com cabeçalho clicável e corpo recolhido
      cardTurma.innerHTML = `
                <div class="card-turma-header">
                    <span>${turma.modalidade} - ${turma.hora}</span>
                    <span class="total-alunos">(${alunosDaTurma.length} alunos)</span>
                    <button class="btn-toggle-chamada btn-icone">⌄</button>
                </div>
                <div class="chamada-corpo">
                    <form class="form-chamada" data-turma-info="${turma.modalidade} - ${turma.hora}">
                        <ul class="lista-alunos-chamada">${listaAlunosHtml}</ul>
                        <button type="submit" class="btn-salvar-chamada">Salvar Chamada</button>
                    </form>
                </div>
            `;
      containerChamadaEl.appendChild(cardTurma);
    });
  };

  // ---- EVENT LISTENERS ----

  seletorDiaEl.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const diaSelecionado = e.target.dataset.dia;
      renderizarTurmas(diaSelecionado);
    }
  });

  // Listener de eventos no container principal
  containerChamadaEl.addEventListener("click", (e) => {
    // Lógica para expandir/recolher o card da turma
    const header = e.target.closest(".card-turma-header");
    if (header) {
      header.parentElement.classList.toggle("aberto");
    }
  });

  containerChamadaEl.addEventListener("submit", (e) => {
    if (e.target.classList.contains("form-chamada")) {
      e.preventDefault();
      const form = e.target;
      const turmaInfo = form.dataset.turmaInfo;
      const presentes = [];

      form
        .querySelectorAll('input[type="checkbox"]:checked')
        .forEach((checkbox) => {
          presentes.push(checkbox.dataset.alunoId);
        });

      console.log(`Chamada salva para a turma ${turmaInfo}:`, presentes);
      mostrarNotificacao(`Chamada da turma ${turmaInfo} salva com sucesso!`);
    }
  });

  document.getElementById("btn-tema").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.getElementById("btn-tema").textContent =
      document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });

  // ---- INICIALIZAÇÃO ----

  const hoje = new Date();
  dataAtualEl.textContent = hoje.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let diaDaSemana = hoje.getDay();
  if (diaDaSemana === 0) diaDaSemana = 1;

  renderizarTurmas(diaDaSemana);
});
