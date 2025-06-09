document.addEventListener("DOMContentLoaded", () => {
  let alunos = [
    {
      id: 1,
      nome: "Carlos Silva",
      email: "carlos@email.com",
      telefone: "11987654321",
      nascimento: "1995-04-12",
      modalidade: "Jiu-Jitsu",
      pagamento: "pago",
      frequencia: [1, 0, 1, 1, 0],
      graduacao: {
        faixa: "Azul",
        graus: 2,
        ultimaGraduacao: "2024-12-15",
        treinosContados: 85,
        treinosParaGraduar: 120,
      },
      fichaMedica: {
        lesoes: "Nenhuma",
        restricoes: "Nenhuma",
        contatoEmergencia: { nome: "Maria Silva", telefone: "11911112222" },
      },
    },
    {
      id: 2,
      nome: "Bruna Costa",
      email: "bruna@email.com",
      telefone: "21987654321",
      nascimento: "1998-06-25",
      modalidade: "Muay Thai",
      pagamento: "pendente",
      frequencia: [1, 1, 0, 1, 0],
      graduacao: {
        nivel: "Branco Ponta Vermelha",
        ultimaGraduacao: "2025-03-20",
        treinosContados: 30,
        treinosParaGraduar: 50,
      },
      fichaMedica: {
        lesoes: "Tornozelo esquerdo",
        restricoes: "Evitar saltos",
        contatoEmergencia: { nome: "João Costa", telefone: "21933334444" },
      },
    },
    {
      id: 3,
      nome: "Pedro Almeida",
      email: "pedro@email.com",
      telefone: "31987654321",
      nascimento: "2000-01-30",
      modalidade: "Misto",
      pagamento: "pago",
      frequencia: [0, 1, 1, 0, 1],
      graduacao: {
        faixa: "Branca",
        graus: 4,
        nivel: "Branco",
        ultimaGraduacao: "2025-01-10",
        treinosContados: 45,
        treinosParaGraduar: 60,
      },
      fichaMedica: {
        lesoes: "Nenhuma",
        restricoes: "Asma",
        contatoEmergencia: { nome: "Ana Almeida", telefone: "31955556666" },
      },
    },
  ];

  const listaAlunosEl = document.getElementById("lista-alunos");
  const buscaAlunoInput = document.getElementById("busca-aluno");
  const filtroModalidadeSelect = document.getElementById("filtro-modalidade");
  const filtroPagamentoSelect = document.getElementById("filtro-pagamento");
  const btnAdicionarAluno = document.getElementById("btn-adicionar-aluno");
  const btnTema = document.getElementById("btn-tema");
  const modalAluno = document.getElementById("modal-aluno");
  const modalExcluir = document.getElementById("modal-excluir");
  const formAluno = document.getElementById("form-aluno");
  const formExcluir = document.getElementById("form-excluir");
  const modalTitulo = document.getElementById("modal-titulo");
  const notificacaoEl = document.getElementById("notificacao-aniversario");

  const renderizarListaAlunos = () => {
    listaAlunosEl.innerHTML = "";
    const alunosFiltrados = filtrarAlunos();

    if (alunosFiltrados.length === 0) {
      listaAlunosEl.innerHTML =
        "<li style='text-align: center; padding: 1rem;'>Nenhum aluno encontrado.</li>";
      return;
    }

    alunosFiltrados.forEach((aluno) => {
      const itemAluno = document.createElement("li");
      itemAluno.className = "aluno-item";
      itemAluno.dataset.id = aluno.id;

      itemAluno.innerHTML = `
                <div class="aluno-header">
                    <span class="aluno-nome">${aluno.nome}</span>
                    <span class="aluno-modalidade">${aluno.modalidade}</span>
                    <div class="status-pagamento ${
                      aluno.pagamento
                    }" title="Status: ${aluno.pagamento}"></div>
                    <button class="btn-toggle-detalhes btn-icone">⌄</button>
                </div>
                <div class="aluno-detalhes">
                    ${gerarHtmlDetalhes(aluno)}
                </div>
            `;
      listaAlunosEl.appendChild(itemAluno);
    });

    renderizarEstatisticas();
  };

  const gerarHtmlDetalhes = (aluno) => {
    const progresso =
      (aluno.graduacao.treinosContados / aluno.graduacao.treinosParaGraduar) *
      100;

    let graduacaoHtml = `
            <p><strong>Nível:</strong> <span contenteditable="false" data-campo="graduacao.nivel">${
              aluno.graduacao.nivel || ""
            }</span></p>
        `;
    if (aluno.modalidade === "Jiu-Jitsu" || aluno.modalidade === "Misto") {
      graduacaoHtml = `
                <p><strong>Faixa:</strong> <span contenteditable="false" data-campo="graduacao.faixa">${aluno.graduacao.faixa}</span></p>
                <p><strong>Graus:</strong> <span contenteditable="false" data-campo="graduacao.graus">${aluno.graduacao.graus}</span></p>
            `;
    }

    return `
            <div class="detalhes-conteudo">
                <section class="detalhes-secao">
                    <h4>Dados Pessoais</h4>
                    <p><strong>Email:</strong> <span contenteditable="false" data-campo="email">${aluno.email}</span></p>
                    <p><strong>Telefone:</strong> <span contenteditable="false" data-campo="telefone">${aluno.telefone}</span></p>
                    <p><strong>Nascimento:</strong> <span contenteditable="false" data-campo="nascimento">${aluno.nascimento}</span></p>
                </section>
                
                <section class="detalhes-secao">
                    <h4>Graduação</h4>
                    ${graduacaoHtml}
                    <p><strong>Treinos para Graduação:</strong> ${aluno.graduacao.treinosContados} / ${aluno.graduacao.treinosParaGraduar}</p>
                    <progress value="${aluno.graduacao.treinosContados}" max="${aluno.graduacao.treinosParaGraduar}"></progress>
                    <p><strong>Última Graduação:</strong> <span contenteditable="false" data-campo="graduacao.ultimaGraduacao">${aluno.graduacao.ultimaGraduacao}</span></p>
                </section>

                <section class="detalhes-secao">
                    <h4>Ficha Médica</h4>
                    <p><strong>Lesões:</strong> <span contenteditable="false" data-campo="fichaMedica.lesoes">${aluno.fichaMedica.lesoes}</span></p>
                    <p><strong>Restrições:</strong> <span contenteditable="false" data-campo="fichaMedica.restricoes">${aluno.fichaMedica.restricoes}</span></p>
                    <p><strong>Contato de Emergência:</strong> <span contenteditable="false" data-campo="fichaMedica.contatoEmergencia.nome">${aluno.fichaMedica.contatoEmergencia.nome}</span> (<span contenteditable="false" data-campo="fichaMedica.contatoEmergencia.telefone">${aluno.fichaMedica.contatoEmergencia.telefone}</span>)</p>
                </section>
                
                <div class="detalhes-acoes">
                     <button class="btn-icone btn-frequencia-hoje" title="Marcar Presença Hoje">➕ Presença</button>
                     <button class="btn-icone btn-editar" title="Editar Ficha">✏️</button>
                     <button class="btn-icone btn-salvar" title="Salvar Alterações" style="display:none;">💾</button>
                     <button class="btn-icone btn-excluir" title="Excluir Aluno">🗑️</button>
                </div>
            </div>
        `;
  };

  const renderizarEstatisticas = () => {
    document.getElementById("stat-total-alunos").textContent = alunos.length;
    document.getElementById("stat-pagos").textContent = alunos.filter(
      (a) => a.pagamento === "pago"
    ).length;
    document.getElementById("stat-pendentes").textContent = alunos.filter(
      (a) => a.pagamento === "pendente"
    ).length;
    const mesAtual = new Date().getMonth();
    document.getElementById("stat-aniversarios").textContent = alunos.filter(
      (a) => new Date(a.nascimento).getMonth() === mesAtual
    ).length;
  };

  const filtrarAlunos = () => {
    const termoBusca = buscaAlunoInput.value.toLowerCase();
    const modalidadeFiltro = filtroModalidadeSelect.value;
    const pagamentoFiltro = filtroPagamentoSelect.value;

    return alunos.filter((aluno) => {
      const buscaOk = aluno.nome.toLowerCase().includes(termoBusca);
      const modalidadeOk =
        modalidadeFiltro === "todos" || aluno.modalidade === modalidadeFiltro;
      const pagamentoOk =
        pagamentoFiltro === "todos" || aluno.pagamento === pagamentoFiltro;
      return buscaOk && modalidadeOk && pagamentoOk;
    });
  };

  const abrirModalAluno = () => {
    formAluno.reset();
    modalTitulo.textContent = "Adicionar Novo Aluno";
    document.getElementById("aluno-id").value = "";
    modalAluno.classList.add("visivel");
  };

  const fecharModais = () => {
    modalAluno.classList.remove("visivel");
    modalExcluir.classList.remove("visivel");
  };

  const verificarAniversarios = () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const anoAtual = hoje.getFullYear();

    let proximoAniversariante = null;
    let menorDiferenca = Infinity;

    alunos.forEach((aluno) => {
      if (!aluno.nascimento) return;
      const [ano, mes, dia] = aluno.nascimento.split("-").map(Number);
      let dataAniversario = new Date(anoAtual, mes - 1, dia);

      if (dataAniversario < hoje) {
        dataAniversario.setFullYear(anoAtual + 1);
      }
      const diferenca = dataAniversario.getTime() - hoje.getTime();
      if (diferenca >= 0 && diferenca < menorDiferenca) {
        menorDiferenca = diferenca;
        proximoAniversariante = {
          nome: aluno.nome,
          data: `${String(dia).padStart(2, "0")}/${String(mes).padStart(
            2,
            "0"
          )}`,
        };
      }
    });
    if (proximoAniversariante && notificacaoEl) {
      notificacaoEl.innerHTML = `🎂 Próximo aniversário: <strong>${proximoAniversariante.nome}</strong> em ${proximoAniversariante.data}`;
      notificacaoEl.classList.add("visivel");
      setTimeout(() => {
        notificacaoEl.classList.remove("visivel");
      }, 5000);
    }
  };

  [buscaAlunoInput, filtroModalidadeSelect, filtroPagamentoSelect].forEach(
    (el) => {
      el.addEventListener("input", renderizarListaAlunos);
    }
  );

  listaAlunosEl.addEventListener("click", (e) => {
    const itemAlunoEl = e.target.closest(".aluno-item");
    if (!itemAlunoEl) return;

    const alunoId = parseInt(itemAlunoEl.dataset.id, 10);
    const aluno = alunos.find((a) => a.id === alunoId);

    if (e.target.closest(".aluno-header")) {
      itemAlunoEl.classList.toggle("aberto");
    }

    if (e.target.closest(".btn-editar")) {
      itemAlunoEl
        .querySelectorAll(".aluno-detalhes span[data-campo]")
        .forEach((el) => el.setAttribute("contenteditable", "true"));
      e.target.closest(".btn-editar").style.display = "none";
      itemAlunoEl.querySelector(".btn-salvar").style.display = "inline-block";
    }

    if (e.target.closest(".btn-salvar")) {
      itemAlunoEl
        .querySelectorAll(".aluno-detalhes span[data-campo]")
        .forEach((el) => {
          el.setAttribute("contenteditable", "false");
          const campoPath = el.dataset.campo.split(".");
          let objNivel = aluno;
          for (let i = 0; i < campoPath.length - 1; i++) {
            objNivel = objNivel[campoPath[i]];
          }
          objNivel[campoPath[campoPath.length - 1]] = el.textContent;
        });
      e.target.closest(".btn-salvar").style.display = "none";
      itemAlunoEl.querySelector(".btn-editar").style.display = "inline-block";
      renderizarListaAlunos();
      alert(`Ficha de ${aluno.nome} atualizada!`);
    }

    if (e.target.closest(".btn-excluir")) {
      document.getElementById("nome-aluno-excluir").textContent = aluno.nome;
      formExcluir.dataset.id = alunoId;
      modalExcluir.classList.add("visivel");
    }

    if (e.target.closest(".btn-frequencia-hoje")) {
      aluno.frequencia.push(1);
      aluno.graduacao.treinosContados++;
      if (aluno.frequencia.length > 5) aluno.frequencia.shift();
      renderizarListaAlunos();
      alert(`Presença de ${aluno.nome} registrada!`);
    }
  });

  formAluno.addEventListener("submit", (e) => {
    e.preventDefault();
    const novoAluno = {
      id: Date.now(),
      nome: document.getElementById("aluno-nome").value,
      email: document.getElementById("aluno-email").value,
      telefone: document.getElementById("aluno-telefone").value,
      nascimento: document.getElementById("aluno-nascimento").value,
      modalidade: document.getElementById("aluno-modalidade").value,
      pagamento: document.getElementById("aluno-pagamento").value,
      frequencia: [0, 0, 0, 0, 0],
      graduacao: {
        faixa: "Branca",
        graus: 0,
        nivel: "Branco",
        ultimaGraduacao: new Date().toISOString().slice(0, 10),
        treinosContados: 0,
        treinosParaGraduar: 120,
      },
      fichaMedica: {
        lesoes: "",
        restricoes: "",
        contatoEmergencia: { nome: "", telefone: "" },
      },
    };
    alunos.push(novoAluno);
    fecharModais();
    renderizarListaAlunos();
  });

  formExcluir.addEventListener("submit", (e) => {
    e.preventDefault();
    if (document.getElementById("senha-professor").value === "1234") {
      const id = parseInt(formExcluir.dataset.id, 10);
      alunos = alunos.filter((a) => a.id !== id);
      fecharModais();
      renderizarListaAlunos();
    } else {
      alert("Senha incorreta!");
    }
  });

  btnAdicionarAluno.addEventListener("click", abrirModalAluno);
  document
    .querySelectorAll(".modal-fechar, .btn-cancelar")
    .forEach((el) => el.addEventListener("click", fecharModais));
  btnTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    btnTema.textContent = document.body.classList.contains("dark-mode")
      ? "☀️"
      : "🌙";
  });

  renderizarListaAlunos();
  verificarAniversarios();
});
