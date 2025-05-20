document.addEventListener("DOMContentLoaded", () => {
  // Simulação de estado de login e dados do Firebase (substituir por integração real)
  const alunoLogado = true; // Verificar autenticação no Firebase Auth
  const alunoId = "aluno123"; // ID do aluno logado
  const dadosAluno = {
    nome: "João Silva",
    faixa: "Azul",
    statusPagamento: "Pendente", // Pago, Pendente, Atrasado
    aniversario: "15/03/1995",
    endereco: "Rua das Flores, 123, Salvador, BA",
    presencas: [
      { data: "25/04/2025", presente: true },
      { data: "22/04/2025", presente: true },
      { data: "18/04/2025", presente: true },
      { data: "16/04/2025", presente: false },
    ],
    aulasParaProximaFaixa: { atual: 12, total: 30 },
    vencimentoMensalidade: "10/05/2025",
  };
  const anuncios = [
    "Exame de graduação dia 10/05",
    "Traga kimono limpo nas segundas-feiras",
    "Treino extra sábado!",
  ];

  // 1. Verificar se o aluno está logado
  if (!alunoLogado) {
    alert("Por favor, faça login para acessar a área do aluno.");
    window.location.href = "login.html"; // Redirecionar para página de login
    return;
  }

  // 2. Exibir dados do aluno
  const perfilContainer = document.querySelector(".perfil-aluno");
  perfilContainer.innerHTML = `
    <img src="perfil.jpg" alt="Foto do Aluno" />
    <div>
      <p><strong>${dadosAluno.nome} 🥋</strong></p>
      <p>Faixa ${dadosAluno.faixa}</p>
      <p><strong>Aniversário:</strong> ${dadosAluno.aniversario}</p>
      <p><strong>Endereço:</strong> ${dadosAluno.endereco}</p>
    </div>
  `;

  // 3. Exibir status de pagamento e vencimento
  const pagamentoContainer = document.querySelector("#pagamento");
  pagamentoContainer.innerHTML = `
    <h2 id="titulo-pagamento">Mensalidade</h2>
    <p><strong>Status:</strong> <span class="status-pagamento ${dadosAluno.statusPagamento.toLowerCase()}">${
    dadosAluno.statusPagamento
  }</span></p>
    <p><strong>Vencimento:</strong> ${dadosAluno.vencimentoMensalidade}</p>
    <div class="botoes-acoes">
      <a href="https://www.mercadopago.com.br/cobrar" class="btn-pagar" target="_blank">Pagar via Pix</a>
      <a href="https://api.whatsapp.com/send?phone=5579999227222&text=Oi%20Mestre,%20tenho%20uma%20d%C3%BAvida%20sobre%20o%20treino!" class="btn-whatsapp" target="_blank">Falar com o Mestre</a>
      <a href="https://api.whatsapp.com/sendhwkejvfaker6" class="btn-grupo" id="link-grupo" target="_blank" style="display: none;">Entrar no Grupo do WhatsApp</a>
      <a href="atualizar-cadastro.html" class="btn-atualizar">Atualizar Cadastro</a>
    </div>
  `;

  // 4. Mostrar/esconder link do grupo
  const linkGrupo = document.getElementById("link-grupo");
  if (alunoLogado && dadosAluno.statusPagamento === "Pago") {
    linkGrupo.style.display = "inline-block";
  }

  // 5. Exibir histórico de presenças
  const historicoContainer = document.querySelector(".historico-presencas ul");
  historicoContainer.innerHTML = dadosAluno.presencas
    .map(
      (presenca) =>
        `<li>${presenca.data} ${presenca.presente ? "✅" : "❌ (faltou)"}</li>`
    )
    .join("");

  // 6. Exibir progresso para próxima faixa
  const progressoContainer = document.querySelector("#progresso-faixa");
  progressoContainer.innerHTML = `
    <h2 id="titulo-progresso">Progresso para Próxima Faixa</h2>
    <p><strong>Faixa Atual:</strong> ${dadosAluno.faixa}</p>
    <p><strong>Aulas até próxima graduação:</strong> ${dadosAluno.aulasParaProximaFaixa.atual}/${dadosAluno.aulasParaProximaFaixa.total}</p>
    <progress value="${dadosAluno.aulasParaProximaFaixa.atual}" max="${dadosAluno.aulasParaProximaFaixa.total}"></progress>
  `;

  // 7. Exibir anúncios
  const anunciosContainer = document.querySelector(".anuncios ul");
  anunciosContainer.innerHTML = anuncios
    .map((anuncio) => `<li>${anuncio}</li>`)
    .join("");
});
