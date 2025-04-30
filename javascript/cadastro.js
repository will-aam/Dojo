function cadastrarAluno() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const cpf = document.getElementById("cpf").value;
  const telefone = document.getElementById("telefone").value;
  const senha = document.getElementById("senha").value;
  const errorMessage = document.getElementById("error-message");

  if (nome && email && cpf && telefone && senha) {
    errorMessage.style.display = "none";
    alert("Cadastro realizado com sucesso!");
    // Aqui você pode integrar com um backend para salvar os dados
    // window.location.href = 'index.html';
  } else {
    errorMessage.style.display = "block";
  }
}

// Cadastro com Enter
document.getElementById("senha").addEventListener("keypress", function (event) {
  if (event.key === "Enter") cadastrarAluno();
});
