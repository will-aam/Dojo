document.addEventListener("DOMContentLoaded", () => {
  // ---- DADOS (Simulação de Banco de Dados) ----
  // Em um projeto real, esses dados viriam do mesmo lugar que o painel.js
  const alunos = [
    { id: 1, nome: "Carlos Silva", nascimento: "1995-04-12" },
    { id: 2, nome: "Bruna Costa", nascimento: "1998-06-25" },
    { id: 3, nome: "Pedro Almeida", nascimento: "2000-01-30" },
    { id: 4, nome: "Juliana Santos", nascimento: "1997-11-05" },
    { id: 5, nome: "Fernando Lima", nascimento: "2001-04-28" },
    { id: 6, nome: "Mariana Oliveira", nascimento: "1999-07-16" },
    { id: 7, nome: "Ricardo Gomes", nascimento: "2002-06-10" },
    { id: 8, nome: "Ana Beatriz", nascimento: "2003-09-01" },
  ];

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  // ---- SELETORES DO DOM ----
  const containerAniversariosEl = document.getElementById(
    "container-aniversarios"
  );
  const btnTema = document.getElementById("btn-tema");

  // ---- FUNÇÕES ----

  const encontrarProximoAniversario = () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    let proximoAniversario = null;
    let menorDiferenca = Infinity;

    alunos.forEach((aluno) => {
      const dataNascimento = new Date(aluno.nascimento + "T00:00:00");
      let proximaData = new Date(
        hoje.getFullYear(),
        dataNascimento.getMonth(),
        dataNascimento.getDate()
      );

      if (proximaData < hoje) {
        proximaData.setFullYear(hoje.getFullYear() + 1);
      }

      const diferenca = proximaData.getTime() - hoje.getTime();
      if (diferenca >= 0 && diferenca < menorDiferenca) {
        menorDiferenca = diferenca;
        proximoAniversario = aluno.id;
      }
    });
    return proximoAniversario;
  };

  const renderizarAniversarios = () => {
    // 1. Agrupar alunos por mês
    const alunosPorMes = Array.from({ length: 12 }, () => []);
    alunos.forEach((aluno) => {
      const mes = new Date(aluno.nascimento + "T00:00:00").getMonth();
      alunosPorMes[mes].push(aluno);
    });

    // 2. Identificar o próximo aniversariante e o mês atual
    const proximoId = encontrarProximoAniversario();
    const mesAtual = new Date().getMonth();

    // 3. Limpar container e renderizar cada mês
    containerAniversariosEl.innerHTML = "";

    meses.forEach((nomeMes, index) => {
      const aniversariantesDoMes = alunosPorMes[index];
      const cardMes = document.createElement("section");
      cardMes.className = "card-mes";
      if (index === mesAtual) {
        cardMes.classList.add("mes-atual");
      }

      let conteudoCard = `<div class="card-mes-header">${nomeMes}</div>`;

      if (aniversariantesDoMes.length > 0) {
        // Ordenar por dia
        aniversariantesDoMes.sort(
          (a, b) =>
            new Date(a.nascimento).getDate() - new Date(b.nascimento).getDate()
        );

        conteudoCard += '<ul class="lista-aniversariantes">';
        aniversariantesDoMes.forEach((aluno) => {
          const dia = new Date(aluno.nascimento + "T00:00:00").getDate();
          const ehProximo = aluno.id === proximoId;

          conteudoCard += `
                        <li class="item-aniversariante ${
                          ehProximo ? "proximo-aniversario" : ""
                        }">
                            <span class="emoji">🎂</span>
                            <span class="nome">${aluno.nome}</span>
                            <span class="data">Dia ${dia}</span>
                        </li>
                    `;
        });
        conteudoCard += "</ul>";
      } else {
        conteudoCard +=
          '<p class="mensagem-vazia">Nenhum aniversariante este mês.</p>';
      }

      cardMes.innerHTML = conteudoCard;
      containerAniversariosEl.appendChild(cardMes);
    });
  };

  // ---- EVENT LISTENERS ----
  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    btnTema.textContent = document.body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";
  });

  // ---- INICIALIZAÇÃO ----
  renderizarAniversarios();
});
