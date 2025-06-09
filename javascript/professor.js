document.addEventListener("DOMContentLoaded", () => {
  // --- 1. BASE DE DADOS ATUALIZADA COM TODOS OS CAMPOS ---
  let dadosAlunos = [
    {
      id: 1,
      nomeCompleto: "Beatriz Lima",
      email: "beatriz.lima@email.com",
      cpf: "111.222.333-44",
      telefone: "(11) 98888-7777",
      dataNascimento: "22/08/1995",
      endereco: {
        rua: "Rua das Flores",
        numero: "123",
        bairro: "Centro",
        cidade: "São Paulo",
      },
      senha: "senhaforte123",
      modalidade: "Muay Thai",
    },
    {
      id: 2,
      nomeCompleto: "Carlos Souza",
      email: "carlos.souza@email.com",
      cpf: "222.333.444-55",
      telefone: "(21) 99999-8888",
      dataNascimento: "15/03/2001",
      endereco: {
        rua: "Avenida Principal",
        numero: "456",
        bairro: "Copacabana",
        cidade: "Rio de Janeiro",
      },
      senha: "outrasenha456",
      modalidade: "Jiu-Jitsu",
    },
    {
      id: 3,
      nomeCompleto: "Ana Pereira",
      email: "ana.pereira@email.com",
      cpf: "333.444.555-66",
      telefone: "(31) 97777-6666",
      dataNascimento: "05/11/1998",
      endereco: {
        rua: "Rua dos Oitis",
        numero: "789",
        bairro: "Savassi",
        cidade: "Belo Horizonte",
      },
      senha: "senhasecreta789",
      modalidade: "Misto",
    },
    {
      id: 4,
      nomeCompleto: "Daniel Costa",
      email: "daniel.costa@email.com",
      cpf: "444.555.666-77",
      telefone: "(41) 96666-5555",
      dataNascimento: "10/06/2000",
      endereco: {
        rua: "Rua das Araucárias",
        numero: "101",
        bairro: "Batel",
        cidade: "Curitiba",
      },
      senha: "melhorsenha000",
      modalidade: "Jiu-Jitsu",
    },
  ];

  // --- Seletores dos Elementos (sem alterações) ---
  const listaAlunosEl = document.getElementById("lista-alunos");
  const filtroNaoPagoEl = document.getElementById("filtro-nao-pago");
  const btnOrdenarEl = document.getElementById("btn-ordenar");
  const notificacaoEl = document.getElementById("notificacao-aniversario");
  const modalExcluirEl = document.getElementById("modal-excluir");
  const formExcluirEl = document.getElementById("form-confirmar-exclusao");
  const btnCancelarExclusaoEl = document.getElementById(
    "btn-cancelar-exclusao"
  );

  let ordemAtual = "status";
  let alunoParaExcluirId = null;

  // --- FUNÇÕES ---

  /**
   * --- 2. PAINEL DE DETALHES ATUALIZADO PARA EXIBIR TODOS OS CAMPOS ---
   * Cada campo editável agora tem um 'data-campo' para o JS saber o que salvar.
   * O endereço tem 'data-campo' e 'data-subcampo' para salvar o objeto corretamente.
   */
  const criarPainelDetalhes = (aluno) => {
    return `
            <div class="info-grid" data-aluno-id-painel="${aluno.id}">
                <div class="info-item"><p>Nome Completo:</p><strong data-campo="nomeCompleto">${aluno.nomeCompleto}</strong></div>
                <div class="info-item"><p>E-mail:</p><strong data-campo="email">${aluno.email}</strong></div>
                <div class="info-item"><p>CPF:</p><strong data-campo="cpf">${aluno.cpf}</strong></div>
                <div class="info-item"><p>Telefone:</p><strong data-campo="telefone">${aluno.telefone}</strong></div>
                <div class="info-item"><p>Data de Nascimento:</p><strong data-campo="dataNascimento">${aluno.dataNascimento}</strong></div>
                <div class="info-item"><p>Modalidade:</p><strong data-campo="modalidade">${aluno.modalidade}</strong></div>
                <div class="info-item"><p>Rua:</p><strong data-campo="endereco" data-subcampo="rua">${aluno.endereco.rua}</strong></div>
                <div class="info-item"><p>Número:</p><strong data-campo="endereco" data-subcampo="numero">${aluno.endereco.numero}</strong></div>
                <div class="info-item"><p>Bairro:</p><strong data-campo="endereco" data-subcampo="bairro">${aluno.endereco.bairro}</strong></div>
                <div class="info-item"><p>Cidade:</p><strong data-campo="endereco" data-subcampo="cidade">${aluno.endereco.cidade}</strong></div>
                <div class="info-item"><p>Senha:</p><strong data-campo="senha">${aluno.senha}</strong></div>
            </div>
            <div class="aluno-acoes">
                <button class="acao-btn editar" title="Editar">✏️</button>
                <button class="acao-btn salvar" title="Salvar" style="display:none;">💾</button>
                <button class="acao-btn excluir" title="Excluir">🗑️</button>
            </div>
        `;
  };

  // Todas as funções abaixo já estão corretas e não precisam de alteração na sua lógica principal.
  // O que muda é a lógica de SALVAR, que está dentro do Event Listener principal.

  const alternarDetalhes = (alunoItemEl) => {
    const detalhesEl = alunoItemEl.querySelector(".aluno-detalhes");
    const isExpandido = detalhesEl.classList.contains("expandido");

    document.querySelectorAll(".aluno-detalhes.expandido").forEach((painel) => {
      if (painel !== detalhesEl) painel.classList.remove("expandido");
    });

    if (isExpandido) {
      detalhesEl.classList.remove("expandido");
    } else {
      const alunoId = parseInt(alunoItemEl.dataset.id, 10);
      const aluno = dadosAlunos.find((a) => a.id === alunoId);
      if (aluno) {
        detalhesEl.innerHTML = criarPainelDetalhes(aluno);
        detalhesEl.classList.add("expandido");
      }
    }
  };

  const ordenarLista = () => {
    const alunosArray = Array.from(listaAlunosEl.children);
    alunosArray.sort((a, b) => {
      if (ordemAtual === "alfabetica") {
        return a.dataset.nome.localeCompare(b.dataset.nome);
      } else {
        return a.dataset.status.localeCompare(b.dataset.status);
      }
    });
    alunosArray.forEach((alunoEl) => listaAlunosEl.appendChild(alunoEl));
  };

  const filtrarLista = () => {
    const mostrarApenasNaoPagos = filtroNaoPagoEl.checked;
    const alunosArray = Array.from(listaAlunosEl.children);
    alunosArray.forEach((alunoEl) => {
      if (mostrarApenasNaoPagos && alunoEl.dataset.status === "pago") {
        alunoEl.style.display = "none";
      } else {
        alunoEl.style.display = "block";
      }
    });
  };

  const verificarAniversarios = () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const anoAtual = hoje.getFullYear();

    let proximoAniversariante = null;
    let menorDiferenca = Infinity;

    document.querySelectorAll(".aluno-item").forEach((alunoEl) => {
      const dataNascimentoStr = alunoEl.dataset.nascimento;
      if (!dataNascimentoStr) return;
      const [ano, mes, dia] = dataNascimentoStr.split("-").map(Number);
      let dataAniversario = new Date(anoAtual, mes - 1, dia);

      if (dataAniversario < hoje) {
        dataAniversario.setFullYear(anoAtual + 1);
      }
      const diferenca = dataAniversario.getTime() - hoje.getTime();
      if (diferenca >= 0 && diferenca < menorDiferenca) {
        menorDiferenca = diferenca;
        proximoAniversariante = {
          nome: alunoEl.dataset.nome,
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

  // --- EVENT LISTENERS ---

  listaAlunosEl.addEventListener("click", (e) => {
    const alunoHeader = e.target.closest(".aluno-header");
    const detalhesPainel = e.target.closest(".aluno-detalhes");

    if (alunoHeader) {
      alternarDetalhes(alunoHeader.closest(".aluno-item"));
      return;
    }

    if (detalhesPainel) {
      const btnEditar = e.target.closest(".editar");
      const btnSalvar = e.target.closest(".salvar");
      const btnExcluir = e.target.closest(".excluir");

      if (btnEditar) {
        detalhesPainel
          .querySelectorAll("strong")
          .forEach((el) => el.setAttribute("contenteditable", "true"));
        btnEditar.style.display = "none";
        detalhesPainel.querySelector(".salvar").style.display = "inline-flex";
        detalhesPainel.querySelector("strong").focus();
      }

      /**
       * --- 3. LÓGICA DE SALVAMENTO ATUALIZADA ---
       * Agora, ela consegue salvar tanto os campos simples quanto os campos
       * aninhados do endereço (rua, número, etc.).
       */
      if (btnSalvar) {
        const idAluno = parseInt(
          detalhesPainel.querySelector(".info-grid").dataset.alunoIdPainel,
          10
        );
        const alunoNoArray = dadosAlunos.find((a) => a.id === idAluno);

        detalhesPainel
          .querySelectorAll('strong[contenteditable="true"]')
          .forEach((el) => {
            const campo = el.dataset.campo;
            const subcampo = el.dataset.subcampo; // Ex: 'rua', 'numero' ou undefined
            const novoValor = el.textContent;

            if (alunoNoArray && campo) {
              if (subcampo) {
                // Se tem subcampo, é um objeto aninhado (ex: endereco.rua)
                alunoNoArray[campo][subcampo] = novoValor;
              } else {
                // Senão, é um campo simples (ex: nomeCompleto)
                alunoNoArray[campo] = novoValor;
              }
            }
            el.setAttribute("contenteditable", "false");
          });

        const alunoItemEl = detalhesPainel.closest(".aluno-item");
        alunoItemEl.querySelector(".aluno-nome").textContent =
          alunoNoArray.nomeCompleto;
        alunoItemEl.dataset.nome = alunoNoArray.nomeCompleto;

        btnSalvar.style.display = "none";
        detalhesPainel.querySelector(".editar").style.display = "inline-flex";
        alert("Dados do aluno atualizados!");
      }

      if (btnExcluir) {
        alunoParaExcluirId = parseInt(
          detalhesPainel.closest(".aluno-item").dataset.id,
          10
        );
        modalExcluirEl.classList.add("visivel");
      }
    }
  });

  filtroNaoPagoEl.addEventListener("change", filtrarLista);
  btnOrdenarEl.addEventListener("click", () => {
    if (ordemAtual === "alfabetica") {
      ordemAtual = "status";
      btnOrdenarEl.textContent = "Ordenar por Nome";
    } else {
      ordemAtual = "alfabetica";
      btnOrdenarEl.textContent = "Ordenar por Status";
    }
    ordenarLista();
  });

  btnCancelarExclusaoEl.addEventListener("click", () => {
    modalExcluirEl.classList.remove("visivel");
  });

  formExcluirEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const senha = e.target.querySelector("#senha-professor").value;

    if (senha === "1234") {
      dadosAlunos = dadosAlunos.filter((a) => a.id !== alunoParaExcluirId);
      const alunoEl = document.querySelector(
        `.aluno-item[data-id="${alunoParaExcluirId}"]`
      );
      if (alunoEl) alunoEl.remove();
      modalExcluirEl.classList.remove("visivel");
      formExcluirEl.reset();
      alert("Aluno excluído com sucesso!");
    } else {
      alert("Senha incorreta!");
    }
  });

  // --- INICIALIZAÇÃO ---
  ordenarLista();
  verificarAniversarios();
});
